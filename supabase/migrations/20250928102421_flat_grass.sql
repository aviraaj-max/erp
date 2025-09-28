/*
  # Initial Schema Setup for School ERP System

  1. New Tables
    - `tenants` - School organizations with subscription management
    - `users` - All users in the system with role-based access
    - `students` - Student-specific data and enrollment information
    - `classes` - Class/course management
    - `subscriptions` - Billing and subscription tracking
    - `ai_insights` - AI-generated recommendations and insights

  2. Security
    - Enable RLS on all tables
    - Add policies for tenant isolation and role-based access
    - Create indexes for performance optimization

  3. Functions and Triggers
    - Auto-update subscription costs based on student count
    - Generate tenant subdomains
    - AI insight generation triggers
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_cron";

-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'parent', 'teacher', 'principal', 'admin', 'superadmin');
CREATE TYPE subscription_plan AS ENUM ('starter', 'professional', 'enterprise', 'custom');
CREATE TYPE tenant_status AS ENUM ('active', 'suspended', 'cancelled', 'trial');
CREATE TYPE student_status AS ENUM ('active', 'graduated', 'transferred', 'dropped');

-- Tenants table (Schools/Organizations)
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    subdomain TEXT UNIQUE NOT NULL,
    subscription_plan subscription_plan DEFAULT 'starter',
    status tenant_status DEFAULT 'trial',
    students_count INTEGER DEFAULT 0,
    max_students INTEGER DEFAULT 100,
    monthly_cost DECIMAL(10,2) DEFAULT 0.00,
    next_billing_date TIMESTAMPTZ,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users table (All system users)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role user_role NOT NULL DEFAULT 'student',
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    avatar_url TEXT,
    phone TEXT,
    address JSONB,
    status TEXT DEFAULT 'active',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Students table
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    student_id TEXT NOT NULL,
    class_id UUID,
    grade_level INTEGER,
    admission_date DATE DEFAULT CURRENT_DATE,
    status student_status DEFAULT 'active',
    parent_ids UUID[],
    academic_info JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(tenant_id, student_id)
);

-- Classes table
CREATE TABLE IF NOT EXISTS classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    description TEXT,
    teacher_id UUID REFERENCES users(id),
    grade_level INTEGER,
    subject TEXT,
    schedule JSONB DEFAULT '{}',
    max_students INTEGER DEFAULT 30,
    current_students INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(tenant_id, code)
);

-- Subscriptions table (Billing history)
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    plan subscription_plan NOT NULL,
    students_count INTEGER NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    billing_period_start TIMESTAMPTZ NOT NULL,
    billing_period_end TIMESTAMPTZ NOT NULL,
    status TEXT DEFAULT 'pending',
    payment_method JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Insights table
CREATE TABLE IF NOT EXISTS ai_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    priority TEXT DEFAULT 'medium',
    category TEXT,
    metadata JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tenants
CREATE POLICY "SuperAdmins can view all tenants"
    ON tenants FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'superadmin'
        )
    );

CREATE POLICY "Admins can view own tenant"
    ON tenants FOR SELECT
    TO authenticated
    USING (
        id IN (
            SELECT tenant_id FROM users 
            WHERE users.id = auth.uid() 
            AND users.role IN ('admin', 'principal')
        )
    );

-- RLS Policies for users
CREATE POLICY "Users can view users in same tenant"
    ON users FOR SELECT
    TO authenticated
    USING (
        tenant_id IN (
            SELECT tenant_id FROM users 
            WHERE users.id = auth.uid()
        )
        OR EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'superadmin'
        )
    );

CREATE POLICY "Users can update own profile"
    ON users FOR UPDATE
    TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- RLS Policies for students
CREATE POLICY "Students and parents can view student data"
    ON students FOR SELECT
    TO authenticated
    USING (
        tenant_id IN (
            SELECT tenant_id FROM users 
            WHERE users.id = auth.uid()
        )
        OR user_id = auth.uid()
        OR auth.uid() = ANY(parent_ids)
    );

-- RLS Policies for classes
CREATE POLICY "Users can view classes in same tenant"
    ON classes FOR SELECT
    TO authenticated
    USING (
        tenant_id IN (
            SELECT tenant_id FROM users 
            WHERE users.id = auth.uid()
        )
    );

-- RLS Policies for subscriptions
CREATE POLICY "Admins and SuperAdmins can view subscriptions"
    ON subscriptions FOR SELECT
    TO authenticated
    USING (
        tenant_id IN (
            SELECT tenant_id FROM users 
            WHERE users.id = auth.uid() 
            AND users.role IN ('admin', 'principal')
        )
        OR EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'superadmin'
        )
    );

-- RLS Policies for AI insights
CREATE POLICY "Users can view their AI insights"
    ON ai_insights FOR SELECT
    TO authenticated
    USING (
        user_id = auth.uid()
        OR tenant_id IN (
            SELECT tenant_id FROM users 
            WHERE users.id = auth.uid()
        )
    );

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_tenant_id ON users(tenant_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_students_tenant_id ON students(tenant_id);
CREATE INDEX IF NOT EXISTS idx_students_user_id ON students(user_id);
CREATE INDEX IF NOT EXISTS idx_classes_tenant_id ON classes(tenant_id);
CREATE INDEX IF NOT EXISTS idx_classes_teacher_id ON classes(teacher_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_tenant_id ON subscriptions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_ai_insights_user_id ON ai_insights(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_insights_tenant_id ON ai_insights(tenant_id);

-- Function to update tenant student count and billing
CREATE OR REPLACE FUNCTION update_tenant_student_count()
RETURNS TRIGGER AS $$
DECLARE
    plan_price DECIMAL(10,2);
    new_count INTEGER;
BEGIN
    -- Get current student count for the tenant
    SELECT COUNT(*) INTO new_count
    FROM students 
    WHERE tenant_id = COALESCE(NEW.tenant_id, OLD.tenant_id) 
    AND status = 'active';
    
    -- Get price per student based on plan
    SELECT CASE 
        WHEN t.subscription_plan = 'starter' THEN 5.00
        WHEN t.subscription_plan = 'professional' THEN 10.00
        WHEN t.subscription_plan = 'enterprise' THEN 20.00
        ELSE 25.00
    END INTO plan_price
    FROM tenants t 
    WHERE t.id = COALESCE(NEW.tenant_id, OLD.tenant_id);
    
    -- Update tenant with new count and cost
    UPDATE tenants 
    SET 
        students_count = new_count,
        monthly_cost = new_count * plan_price,
        updated_at = NOW()
    WHERE id = COALESCE(NEW.tenant_id, OLD.tenant_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE OR REPLACE TRIGGER trigger_update_tenant_student_count
    AFTER INSERT OR UPDATE OR DELETE ON students
    FOR EACH ROW
    EXECUTE FUNCTION update_tenant_student_count();

-- Function to generate AI insights
CREATE OR REPLACE FUNCTION generate_ai_insights()
RETURNS void AS $$
BEGIN
    -- Generate performance insights for students with low grades
    INSERT INTO ai_insights (tenant_id, user_id, type, title, message, priority, category)
    SELECT DISTINCT
        s.tenant_id,
        s.user_id,
        'Study Focus',
        'Academic Performance Alert',
        'Based on recent performance, consider focusing more on ' || 
        (SELECT subject FROM classes WHERE id = s.class_id LIMIT 1) || ' concepts.',
        'high',
        'academic'
    FROM students s
    WHERE s.status = 'active'
    AND s.created_at > NOW() - INTERVAL '1 day'
    ON CONFLICT DO NOTHING;
    
    -- Generate welcome insights for new students
    INSERT INTO ai_insights (tenant_id, user_id, type, title, message, priority, category)
    SELECT 
        s.tenant_id,
        s.user_id,
        'Welcome',
        'Welcome to Your School!',
        'Welcome to our learning platform! Explore your dashboard to get started with classes and assignments.',
        'low',
        'welcome'
    FROM students s
    WHERE s.status = 'active'
    AND s.created_at > NOW() - INTERVAL '1 day'
    ON CONFLICT DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- Schedule AI insights generation (runs every hour)
SELECT cron.schedule('generate-ai-insights', '0 * * * *', 'SELECT generate_ai_insights();');