import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

// Database type definitions
export interface Database {
  public: {
    Tables: {
      tenants: {
        Row: {
          id: string;
          name: string;
          subdomain: string;
          subscription_plan: string;
          status: 'active' | 'suspended' | 'cancelled';
          students_count: number;
          max_students: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['tenants']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['tenants']['Insert']>;
      };
      users: {
        Row: {
          id: string;
          tenant_id: string;
          email: string;
          role: 'student' | 'parent' | 'teacher' | 'principal' | 'admin' | 'superadmin';
          first_name: string;
          last_name: string;
          avatar_url?: string;
          status: 'active' | 'inactive';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      students: {
        Row: {
          id: string;
          tenant_id: string;
          user_id: string;
          student_id: string;
          class_id: string;
          admission_date: string;
          status: 'active' | 'graduated' | 'transferred' | 'dropped';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['students']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['students']['Insert']>;
      };
    };
    Enums: {
      user_role: 'student' | 'parent' | 'teacher' | 'principal' | 'admin' | 'superadmin';
      subscription_plan: 'starter' | 'professional' | 'enterprise' | 'custom';
    };
  };
}