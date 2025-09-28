/*
  # Demo Data for School ERP System

  1. Sample Data
    - Demo tenants (schools)
    - Demo users with different roles
    - Sample students and classes
    - AI insights and subscription data

  2. Test Accounts
    - SuperAdmin: super@demo.com / demo123
    - Admin: admin@demo.com / demo123  
    - Teacher: teacher@demo.com / demo123
    - Student: student@demo.com / demo123
    - Parent: parent@demo.com / demo123
*/

-- Insert demo tenants
INSERT INTO tenants (id, name, subdomain, subscription_plan, status, students_count, max_students, monthly_cost, next_billing_date) VALUES
('11111111-1111-1111-1111-111111111111', 'Springfield Elementary', 'springfield', 'professional', 'active', 342, 500, 3420.00, '2024-02-15'),
('22222222-2222-2222-2222-222222222222', 'Oak Hill High School', 'oakhill', 'enterprise', 'active', 1200, 2000, 24000.00, '2024-02-20'),
('33333333-3333-3333-3333-333333333333', 'Riverside Academy', 'riverside', 'starter', 'trial', 85, 100, 0.00, '2024-01-30');

-- Insert demo classes
INSERT INTO classes (id, tenant_id, name, code, description, grade_level, subject, max_students, current_students) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Mathematics Grade 10', 'MATH10A', 'Advanced Mathematics for Grade 10', 10, 'Mathematics', 30, 25),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'Physics Grade 11', 'PHYS11A', 'Introduction to Physics', 11, 'Physics', 25, 20),
('cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', 'Chemistry Lab', 'CHEM10L', 'Chemistry Laboratory Sessions', 10, 'Chemistry', 20, 18);

-- Insert demo subscriptions
INSERT INTO subscriptions (tenant_id, plan, students_count, amount, billing_period_start, billing_period_end, status) VALUES
('11111111-1111-1111-1111-111111111111', 'professional', 342, 3420.00, '2024-01-15', '2024-02-15', 'paid'),
('22222222-2222-2222-2222-222222222222', 'enterprise', 1200, 24000.00, '2024-01-20', '2024-02-20', 'paid'),
('33333333-3333-3333-3333-333333333333', 'starter', 85, 0.00, '2024-01-01', '2024-02-01', 'trial');

-- Insert demo AI insights
INSERT INTO ai_insights (tenant_id, type, title, message, priority, category) VALUES
('11111111-1111-1111-1111-111111111111', 'Study Focus', 'Mathematics Performance Alert', 'Based on recent test results, students in MATH10A may benefit from additional algebra practice sessions.', 'high', 'academic'),
('11111111-1111-1111-1111-111111111111', 'Attendance', 'Attendance Trend Analysis', 'Physics classes show 15% improvement in attendance this month compared to last month.', 'medium', 'attendance'),
('22222222-2222-2222-2222-222222222222', 'Resource', 'Lab Equipment Usage', 'Chemistry lab equipment utilization is at 95%. Consider scheduling additional lab sessions.', 'medium', 'resources'),
('33333333-3333-3333-3333-333333333333', 'Enrollment', 'Trial Period Reminder', 'Your trial period ends in 5 days. Upgrade to continue using all features.', 'high', 'billing');

-- Note: User creation will be handled by Supabase Auth
-- The following would be the user profiles that correspond to the auth users
-- These are examples of what the user data would look like after authentication