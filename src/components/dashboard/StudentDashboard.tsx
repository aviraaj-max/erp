import React from 'react';
import { 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Clock, 
  Award,
  Bell,
  Brain,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';

const upcomingClasses = [
  { subject: 'Mathematics', time: '09:00 AM', room: 'Room 101', teacher: 'Mr. Johnson' },
  { subject: 'Physics', time: '11:00 AM', room: 'Lab 201', teacher: 'Dr. Smith' },
  { subject: 'Chemistry', time: '02:00 PM', room: 'Lab 102', teacher: 'Ms. Davis' },
];

const recentGrades = [
  { subject: 'Mathematics', grade: 'A', assignment: 'Quiz 3', date: '2 days ago' },
  { subject: 'Physics', grade: 'B+', assignment: 'Lab Report', date: '1 week ago' },
  { subject: 'English', grade: 'A-', assignment: 'Essay', date: '1 week ago' },
];

const aiRecommendations = [
  {
    type: 'Study Focus',
    message: 'Based on your recent performance, focus more on Algebra concepts',
    priority: 'high'
  },
  {
    type: 'Time Management',
    message: 'You have 3 assignments due this week. Plan accordingly.',
    priority: 'medium'
  },
  {
    type: 'Achievement',
    message: 'Great improvement in Physics! Keep up the excellent work.',
    priority: 'low'
  }
];

export function StudentDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Sarah!</h1>
            <p className="text-blue-100 mt-1">Ready to continue your learning journey?</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <Brain className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card variant="gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overall GPA</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3.8</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card variant="gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Attendance</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">96%</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card variant="gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Assignments</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">7 Pending</p>
              </div>
              <BookOpen className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card variant="gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Achievements</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Classes</h3>
              <Clock className="w-5 h-5 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((cls, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{cls.subject}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{cls.teacher} • {cls.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">{cls.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Full Schedule
            </Button>
          </CardContent>
        </Card>

        {/* Recent Grades */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Grades</h3>
              <TrendingUp className="w-5 h-5 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentGrades.map((grade, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{grade.subject}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{grade.assignment}</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex px-2 py-1 rounded text-sm font-medium ${
                      grade.grade.startsWith('A') 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : grade.grade.startsWith('B')
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {grade.grade}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{grade.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Grades
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card variant="glass">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Learning Assistant</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiRecommendations.map((rec, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  rec.priority === 'high' 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : rec.priority === 'medium'
                    ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                    : 'border-green-500 bg-green-50 dark:bg-green-900/20'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Target className={`w-5 h-5 mt-0.5 ${
                    rec.priority === 'high' ? 'text-red-600' 
                    : rec.priority === 'medium' ? 'text-yellow-600' 
                    : 'text-green-600'
                  }`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{rec.type}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{rec.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full mt-4">
            <Brain className="w-4 h-4 mr-2" />
            Chat with AI Tutor
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}