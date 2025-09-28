import React, { useState, useEffect } from 'react';
import { CreditCard, Users, TrendingUp, CircleAlert as AlertCircle, CircleCheck as CheckCircle, Settings, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';

const subscriptionPlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 5,
    maxStudents: 100,
    features: ['Basic Analytics', 'Student Management', 'Grade Tracking', 'Email Support']
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 10,
    maxStudents: 500,
    features: ['Advanced Analytics', 'AI Insights', 'Parent Portal', 'SMS Notifications', 'Priority Support']
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 20,
    maxStudents: 2000,
    features: ['Custom Analytics', 'AI Tutor', 'White Label', 'API Access', 'Dedicated Support']
  }
];

interface SubscriptionData {
  tenantId: string;
  currentPlan: string;
  studentsCount: number;
  nextBillingDate: string;
  totalCost: number;
  status: 'active' | 'past_due' | 'cancelled';
}

export function SubscriptionManager() {
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({
    tenantId: 'demo-tenant',
    currentPlan: 'professional',
    studentsCount: 342,
    nextBillingDate: '2024-02-15',
    totalCost: 3420,
    status: 'active'
  });

  const currentPlan = subscriptionPlans.find(plan => plan.id === subscriptionData.currentPlan);
  const utilizationPercentage = currentPlan 
    ? Math.round((subscriptionData.studentsCount / currentPlan.maxStudents) * 100)
    : 0;

  const handlePlanChange = async (newPlanId: string) => {
    // In a real app, this would make an API call to update the subscription
    const newPlan = subscriptionPlans.find(plan => plan.id === newPlanId);
    if (newPlan) {
      setSubscriptionData(prev => ({
        ...prev,
        currentPlan: newPlanId,
        totalCost: newPlan.price * prev.studentsCount
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Subscription Overview */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Current Subscription</h2>
            <p className="text-green-100 mt-1">{currentPlan?.name} Plan - {subscriptionData.studentsCount} students</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">${subscriptionData.totalCost}</div>
            <p className="text-green-100">per month</p>
          </div>
        </div>
      </div>

      {/* Subscription Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card variant="gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Cost</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">${subscriptionData.totalCost}</p>
              </div>
              <CreditCard className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card variant="gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Students</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{subscriptionData.studentsCount}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card variant="gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Plan Usage</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{utilizationPercentage}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card variant="gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</p>
                <p className="text-lg font-bold text-green-600">Active</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Analytics */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Usage Analytics</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Students ({subscriptionData.studentsCount}/{currentPlan?.maxStudents})</span>
                  <span className="text-gray-900 dark:text-white">{utilizationPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      utilizationPercentage > 90 ? 'bg-red-600' :
                      utilizationPercentage > 70 ? 'bg-yellow-600' : 'bg-green-600'
                    }`}
                    style={{ width: `${utilizationPercentage}%` }}
                  />
                </div>
              </div>

              {utilizationPercentage > 80 && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Usage Warning</h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                        You're approaching your plan limit. Consider upgrading to avoid service interruption.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Billing Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Cost per student</span>
                    <span className="text-gray-900 dark:text-white">${currentPlan?.price}/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Next billing date</span>
                    <span className="text-gray-900 dark:text-white">{subscriptionData.nextBillingDate}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-900 dark:text-white">Total monthly cost</span>
                    <span className="text-gray-900 dark:text-white">${subscriptionData.totalCost}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan Comparison */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Available Plans</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subscriptionPlans.map((plan) => (
                <div 
                  key={plan.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    plan.id === subscriptionData.currentPlan 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{plan.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Up to {plan.maxStudents} students</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">${plan.price}</div>
                      <div className="text-xs text-gray-500">per student/month</div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-2">Features included:</p>
                    <div className="flex flex-wrap gap-1">
                      {plan.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                      {plan.features.length > 3 && (
                        <span className="text-xs text-gray-500">+{plan.features.length - 3} more</span>
                      )}
                    </div>
                  </div>

                  {plan.id === subscriptionData.currentPlan ? (
                    <Button variant="outline" size="sm" className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button 
                      variant={plan.price > (currentPlan?.price || 0) ? "primary" : "secondary"} 
                      size="sm" 
                      className="w-full"
                      onClick={() => handlePlanChange(plan.id)}
                    >
                      {plan.price > (currentPlan?.price || 0) ? "Upgrade" : "Downgrade"}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}