import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Hop as Home, Users, BookOpen, Calendar, DollarSign, Settings, Bell, ChevronDown, Search, Menu } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { clsx } from 'clsx';

const navigationItems = {
  student: [
    { name: 'Dashboard', href: '/student', icon: Home },
    { name: 'Classes', href: '/student/classes', icon: BookOpen },
    { name: 'Schedule', href: '/student/schedule', icon: Calendar },
    { name: 'Grades', href: '/student/grades', icon: BookOpen },
  ],
  parent: [
    { name: 'Dashboard', href: '/parent', icon: Home },
    { name: 'Children', href: '/parent/children', icon: Users },
    { name: 'Fees', href: '/parent/fees', icon: DollarSign },
    { name: 'Communication', href: '/parent/messages', icon: Bell },
  ],
  teacher: [
    { name: 'Dashboard', href: '/teacher', icon: Home },
    { name: 'Classes', href: '/teacher/classes', icon: BookOpen },
    { name: 'Students', href: '/teacher/students', icon: Users },
    { name: 'Schedule', href: '/teacher/schedule', icon: Calendar },
  ],
  principal: [
    { name: 'Dashboard', href: '/principal', icon: Home },
    { name: 'Staff', href: '/principal/staff', icon: Users },
    { name: 'Analytics', href: '/principal/analytics', icon: BookOpen },
    { name: 'Settings', href: '/principal/settings', icon: Settings },
  ],
  admin: [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Schools', href: '/admin/schools', icon: BookOpen },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Billing', href: '/admin/billing', icon: DollarSign },
  ],
  superadmin: [
    { name: 'Dashboard', href: '/superadmin', icon: Home },
    { name: 'Tenants', href: '/superadmin/tenants', icon: BookOpen },
    { name: 'Analytics', href: '/superadmin/analytics', icon: BookOpen },
    { name: 'System', href: '/superadmin/system', icon: Settings },
  ]
};

export function Navigation() {
  const { user, signOut } = useAuthContext();
  const location = useLocation();
  const userRole = user?.profile?.role || 'student';
  const navItems = navigationItems[userRole] || navigationItems.student;

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EduCloud
              </h1>
            </div>

            {/* Main Navigation */}
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={clsx(
                      'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'border-blue-500 text-gray-900 dark:text-white'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm">
              <Bell className="w-5 h-5" />
            </Button>

            {/* User Menu */}
            <div className="relative">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user?.profile?.first_name?.charAt(0) || 'U'}
                </div>
                <span className="hidden md:block text-sm">
                  {user?.profile?.first_name} {user?.profile?.last_name}
                </span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}