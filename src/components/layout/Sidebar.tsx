import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Bot, TrendingUp, Users, BookOpen, Calendar, DollarSign, Settings, Bell, Hop as Home } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';
import { clsx } from 'clsx';

const sidebarItems = {
  student: [
    { name: 'Overview', href: '/student', icon: Home, color: 'text-blue-600' },
    { name: 'My Classes', href: '/student/classes', icon: BookOpen, color: 'text-green-600' },
    { name: 'Schedule', href: '/student/schedule', icon: Calendar, color: 'text-purple-600' },
    { name: 'Assignments', href: '/student/assignments', icon: BookOpen, color: 'text-orange-600' },
    { name: 'Grades', href: '/student/grades', icon: TrendingUp, color: 'text-red-600' },
    { name: 'AI Tutor', href: '/student/ai-tutor', icon: Bot, color: 'text-indigo-600' },
  ],
  teacher: [
    { name: 'Dashboard', href: '/teacher', icon: Home, color: 'text-blue-600' },
    { name: 'My Classes', href: '/teacher/classes', icon: BookOpen, color: 'text-green-600' },
    { name: 'Students', href: '/teacher/students', icon: Users, color: 'text-purple-600' },
    { name: 'Schedule', href: '/teacher/schedule', icon: Calendar, color: 'text-orange-600' },
    { name: 'AI Assistant', href: '/teacher/ai-assistant', icon: Bot, color: 'text-indigo-600' },
  ],
  principal: [
    { name: 'Dashboard', href: '/principal', icon: Home, color: 'text-blue-600' },
    { name: 'Analytics', href: '/principal/analytics', icon: TrendingUp, color: 'text-green-600' },
    { name: 'Staff Management', href: '/principal/staff', icon: Users, color: 'text-purple-600' },
    { name: 'School Settings', href: '/principal/settings', icon: Settings, color: 'text-orange-600' },
    { name: 'AI Insights', href: '/principal/ai-insights', icon: Bot, color: 'text-indigo-600' },
  ],
  admin: [
    { name: 'Dashboard', href: '/admin', icon: Home, color: 'text-blue-600' },
    { name: 'Schools', href: '/admin/schools', icon: BookOpen, color: 'text-green-600' },
    { name: 'Subscriptions', href: '/admin/subscriptions', icon: DollarSign, color: 'text-purple-600' },
    { name: 'Analytics', href: '/admin/analytics', icon: TrendingUp, color: 'text-orange-600' },
  ],
  superadmin: [
    { name: 'System Overview', href: '/superadmin', icon: Home, color: 'text-blue-600' },
    { name: 'Tenant Management', href: '/superadmin/tenants', icon: BookOpen, color: 'text-green-600' },
    { name: 'Revenue Analytics', href: '/superadmin/revenue', icon: DollarSign, color: 'text-purple-600' },
    { name: 'System Health', href: '/superadmin/health', icon: TrendingUp, color: 'text-orange-600' },
  ]
};

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuthContext();
  const location = useLocation();
  
  const userRole = user?.profile?.role || 'student';
  const items = sidebarItems[userRole] || sidebarItems.student;

  return (
    <div
      className={clsx(
        'bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {!collapsed && (
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Navigation
            </h2>
          )}
          
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.name}
                to={item.href}
                className={clsx(
                  'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  'hover:bg-gray-100 dark:hover:bg-gray-800',
                  isActive
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300'
                )}
                title={collapsed ? item.name : undefined}
              >
                <Icon className={clsx('w-5 h-5 flex-shrink-0', item.color)} />
                {!collapsed && (
                  <span className="ml-3">{item.name}</span>
                )}
                {isActive && !collapsed && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-blue-600" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* AI Assistant Preview */}
        {!collapsed && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <span className="font-medium">AI Assistant</span>
              </div>
              <p className="text-xs mt-1 text-blue-100">
                Get instant help and insights
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}