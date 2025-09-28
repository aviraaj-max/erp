import React from 'react';
import { Building2, Users, DollarSign, TrendingUp, Server, Activity, CircleAlert as AlertCircle, CircleCheck as CheckCircle, Globe, Database } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';

const systemMetrics = [
  { label: 'Total Revenue', value: '$2.4M', change: '+12.5%', trend: 'up' },
  { label: 'Active Tenants', value: '1,247', change: '+8.2%', trend: 'up' },
  { label: 'Total Students', value: '456K', change: '+15.3%', trend: 'up' },
  { label: 'System Uptime', value: '99.9%', change: '0.0%', trend: 'stable' }
];

const recentTenants = [
  { name: 'Springfield Elementary', students: 450, plan: 'Professional', status: 'active', revenue: '$2,250' },
  { name: 'Oak Hill High School', students: 1200, plan: 'Enterprise', status: 'active', revenue: '$12,000' },
  { name: 'Riverside Academy', students: 800, plan: 'Professional', status: 'trial', revenue: '$0' },
];

const systemAlerts = [
  { type: 'warning', message: 'Database storage at 85% capacity', time: '2 hours ago' },
  { type: 'info', message: 'New tenant onboarded: Valley Middle School', time: '4 hours ago' },
  { type: 'success', message: 'System backup completed successfully', time: '6 hours ago' },
];

export function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">System Control Center</h1>
            <p className="text-purple-100 mt-1">Monitor and manage your entire SaaS ecosystem</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <Server className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {systemMetrics.map((metric, index) => (
          <Card key={index} variant="gradient">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                  <p className={`text-sm ${
                    metric.trend === 'up' ? 'text-green-600' : 
                    metric.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {metric.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${
                  index === 0 ? 'bg-green-100 dark:bg-green-900/30' :
                  index === 1 ? 'bg-blue-100 dark:bg-blue-900/30' :
                  index === 2 ? 'bg-purple-100 dark:bg-purple-900/30' :
                  'bg-orange-100 dark:bg-orange-900/30'
                }`}>
                  {index === 0 && <DollarSign className="w-6 h-6 text-green-600" />}
                  {index === 1 && <Building2 className="w-6 h-6 text-blue-600" />}
                  {index === 2 && <Users className="w-6 h-6 text-purple-600" />}
                  {index === 3 && <Activity className="w-6 h-6 text-orange-600" />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tenants */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Tenants</h3>
              <Building2 className="w-5 h-5 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTenants.map((tenant, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {tenant.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{tenant.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {tenant.students} students • {tenant.plan}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                      tenant.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {tenant.status}
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{tenant.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Tenants
            </Button>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">System Alerts</h3>
              <AlertCircle className="w-5 h-5 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemAlerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <div className={`p-1 rounded-full ${
                    alert.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                    alert.type === 'info' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    'bg-green-100 dark:bg-green-900/30'
                  }`}>
                    {alert.type === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-600" />}
                    {alert.type === 'info' && <Activity className="w-4 h-4 text-blue-600" />}
                    {alert.type === 'success' && <CheckCircle className="w-4 h-4 text-green-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">{alert.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View System Logs
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card variant="glass">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Globe className="w-8 h-8 text-blue-600" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Global Reach</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active in 45 countries</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Database className="w-8 h-8 text-green-600" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Data Processing</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">2.3TB processed today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Growth Rate</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">22% month over month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}