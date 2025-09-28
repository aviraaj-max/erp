import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthContext } from '../contexts/AuthContext';

export interface SubscriptionData {
  tenantId: string;
  currentPlan: 'starter' | 'professional' | 'enterprise';
  studentsCount: number;
  maxStudents: number;
  monthlyCost: number;
  nextBillingDate: string;
  status: 'active' | 'trial' | 'past_due' | 'cancelled';
}

export function useSubscription() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user?.profile?.tenant_id) {
      loadSubscriptionData();
    }
  }, [user]);

  const loadSubscriptionData = async () => {
    try {
      const { data: tenant, error } = await supabase
        .from('tenants')
        .select('*')
        .eq('id', user?.profile?.tenant_id)
        .single();

      if (error) throw error;

      setSubscription({
        tenantId: tenant.id,
        currentPlan: tenant.subscription_plan,
        studentsCount: tenant.students_count,
        maxStudents: tenant.max_students,
        monthlyCost: parseFloat(tenant.monthly_cost),
        nextBillingDate: tenant.next_billing_date,
        status: tenant.status
      });
    } catch (error) {
      console.error('Error loading subscription data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSubscriptionPlan = async (newPlan: 'starter' | 'professional' | 'enterprise') => {
    if (!user?.profile?.tenant_id) return;

    try {
      const planPrices = {
        starter: 5,
        professional: 10,
        enterprise: 20
      };

      const newMaxStudents = {
        starter: 100,
        professional: 500,
        enterprise: 2000
      };

      const newCost = (subscription?.studentsCount || 0) * planPrices[newPlan];

      const { error } = await supabase
        .from('tenants')
        .update({
          subscription_plan: newPlan,
          max_students: newMaxStudents[newPlan],
          monthly_cost: newCost,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.profile.tenant_id);

      if (error) throw error;

      // Reload subscription data
      await loadSubscriptionData();
    } catch (error) {
      console.error('Error updating subscription:', error);
      throw error;
    }
  };

  return {
    subscription,
    loading,
    updateSubscriptionPlan,
    reload: loadSubscriptionData
  };
}