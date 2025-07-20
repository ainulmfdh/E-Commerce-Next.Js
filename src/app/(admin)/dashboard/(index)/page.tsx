"use client"
import React, { useState } from 'react';
import {
  Home,
  ShoppingCart,
  BarChart3,
  User,
  LogIn,
  Shield,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Grip
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: React.ReactNode;
  color?: string;
}

interface TableRowProps {
  name: string;
  progress: number;
  quantity: number;
  date: string;
  status?: 'approved' | 'disabled' | 'error';
}

interface TaskItemProps {
  name: string;
  completed: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon, color = "bg-slate-800" }) => (
  <div className={`${color} rounded-xl p-6 text-white`}>
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-gray-300">{title}</span>
      {icon}
    </div>
    <div className="text-2xl font-bold">{value}</div>
    {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
  </div>
);

const TableRow: React.FC<TableRowProps> = ({ name, progress, quantity, date, status }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'disabled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <tr className="border-b border-slate-700">
      <td className="py-3">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="text-white text-sm">{name}</span>
        </div>
      </td>
      <td className="py-3 text-white text-sm">{progress}%</td>
      <td className="py-3 text-white text-sm">{quantity}</td>
      <td className="py-3 text-gray-400 text-sm">{date}</td>
    </tr>
  );
};

const TaskItem: React.FC<TaskItemProps> = ({ name, completed }) => (
  <div className="flex items-center gap-3 py-2">
    <label htmlFor="email">Email</label>
    <input
      type="checkbox"
      checked={completed}
      className="w-4 h-4 text-blue-500 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
      readOnly
    />
    <span className={`text-sm ${completed ? 'text-gray-400 line-through' : 'text-white'}`}>
      {name}
    </span>
    <Grip className="w-4 h-4 text-gray-500 ml-auto" />
  </div>
);

const Dashboard: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(6); // July = 6
  const [currentYear, setCurrentYear] = useState(2025);

  const sidebarItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Main Dashboard', active: true },
    { icon: <ShoppingCart className="w-5 h-5" />, label: 'NFT Marketplace' },
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Data Tables' },
    { icon: <User className="w-5 h-5" />, label: 'Profile' },
    { icon: <LogIn className="w-5 h-5" />, label: 'Sign In' },
    { icon: <Shield className="w-5 h-5" />, label: 'RTL Admin' },
  ];

  const tableData = [
    { name: 'Horizon UI PRO', progress: 17.5, quantity: 2458, date: '12 Jan 2021', status: 'approved' as const },
    { name: 'Horizon UI Free', progress: 10.8, quantity: 1485, date: '21 Feb 2021', status: 'disabled' as const },
    { name: 'Weekly Update', progress: 21.3, quantity: 1024, date: '13 Mar 2021', status: 'approved' as const },
    { name: 'Venus 3D Asset', progress: 31.5, quantity: 858, date: '24 Jan 2021', status: 'approved' as const },
    { name: 'Marketplace', progress: 12.2, quantity: 258, date: '24 Oct 2022', status: 'error' as const },
  ];

  const complexTableData = [
    { name: 'Horizon UI PRO', status: 'approved' as const, date: '18 Apr 2022', progress: 75 },
    { name: 'Horizon UI Free', status: 'disabled' as const, date: '18 Apr 2022', progress: 35 },
    { name: 'Marketplace', status: 'error' as const, date: '20 May 2021', progress: 90 },
    { name: 'Weekly Updates', status: 'approved' as const, date: '12 Jul 2021', progress: 40 },
  ];

  const tasks = [
    { name: 'Landing Page Design', completed: false },
    { name: 'Dashboard Builder', completed: true },
    { name: 'Mobile App Design', completed: false },
    { name: 'Illustrations', completed: false },
    { name: 'Promotional LP', completed: true },
  ];

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Previous month days
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`prev-${i}`} className="text-gray-600 text-sm p-2"></div>);
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === 19 && currentMonth === 6 && currentYear === 2025;
      days.push(
        <div
          key={day}
          className={`text-sm p-2 cursor-pointer hover:bg-slate-600 rounded ${isToday ? 'bg-blue-500 text-white' : 'text-white'
            }`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="">

      {/* Main Content */}
      <div className="flex-1 overflow-auto">

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Top Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard title="Earnings" value="IDR 500.000" />
            <StatCard title="Spend this month" value="IDR 1.000.000" />
            <StatCard title="Sales" value="IDR 750.000" subtitle="since last month" />
            <StatCard
              title="Your balance"
              value="IDR 1.200.000"
            />
            <StatCard title="Total User" value="154" />
            <StatCard title="Total Products" value="35" />
          </div>


          {/* Tables and Additional Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Check Table */}
            <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold">Check Table</h3>
                <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left text-gray-400 text-xs uppercase tracking-wider py-3">Name</th>
                      <th className="text-left text-gray-400 text-xs uppercase tracking-wider py-3">Progress</th>
                      <th className="text-left text-gray-400 text-xs uppercase tracking-wider py-3">Quantity</th>
                      <th className="text-left text-gray-400 text-xs uppercase tracking-wider py-3">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, index) => (
                      <TableRow key={index} {...row} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Traffic and Pie Chart */}
            <div className="space-y-6">
              {/* Daily Traffic */}
              <div className="bg-slate-800 rounded-xl p-6">
                <div className="mb-4">
                  <h3 className="text-white font-semibold mb-1">Daily Traffic</h3>
                  <p className="text-2xl font-bold text-white">2.579 <span className="text-sm font-normal text-gray-400">Visitors</span></p>
                  <p className="text-green-500 text-sm">+2.45%</p>
                </div>

                {/* Traffic Chart */}
                <div className="flex items-end gap-1 h-16 mb-4">
                  {[20, 40, 30, 60, 45, 80, 35, 70, 25, 55].map((height, i) => (
                    <div
                      key={i}
                      className="bg-blue-600 rounded-t flex-1"
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>

                <div className="flex justify-between text-xs text-gray-400">
                  <span>00</span>
                  <span>04</span>
                  <span>08</span>
                  <span>12</span>
                  <span>14</span>
                  <span>16</span>
                  <span>18</span>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="bg-slate-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Your Pie Chart</h3>
                  <select className="bg-slate-700 text-white text-sm rounded px-2 py-1 border-0">
                    <option>Monthly</option>
                  </select>
                </div>

                {/* Pie Chart Visualization */}
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-24 h-24">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="20"
                        strokeDasharray="157"
                        strokeDashoffset="39"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="20"
                        strokeDasharray="157"
                        strokeDashoffset="118"
                      />
                    </svg>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-white text-sm">Your Files</span>
                    </div>
                    <span className="text-white font-semibold">63%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-white text-sm">System</span>
                    </div>
                    <span className="text-white font-semibold">25%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Complex Table */}
            <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold">Complex Table</h3>
                <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left text-gray-400 text-xs uppercase tracking-wider py-3">Name</th>
                      <th className="text-left text-gray-400 text-xs uppercase tracking-wider py-3">Status</th>
                      <th className="text-left text-gray-400 text-xs uppercase tracking-wider py-3">Date</th>
                      <th className="text-left text-gray-400 text-xs uppercase tracking-wider py-3">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complexTableData.map((row, index) => (
                      <tr key={index} className="border-b border-slate-700">
                        <td className="py-3 text-white text-sm">{row.name}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            {row.status === 'approved' && <CheckCircle className="w-4 h-4 text-green-500" />}
                            {row.status === 'disabled' && <XCircle className="w-4 h-4 text-red-500" />}
                            {row.status === 'error' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                            <span className="text-white text-sm capitalize">{row.status}</span>
                          </div>
                        </td>
                        <td className="py-3 text-gray-400 text-sm">{row.date}</td>
                        <td className="py-3">
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full"
                              style={{ width: `${row.progress}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tasks and Calendar */}
            <div className="space-y-6">
              {/* Tasks */}
              <div className="bg-slate-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Tasks</h3>
                  <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
                </div>

                <div className="space-y-1">
                  {tasks.map((task, index) => (
                    <TaskItem key={index} {...task} />
                  ))}
                </div>
              </div>

              {/* Calendar */}
              <div className="bg-slate-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">{monthNames[currentMonth]} {currentYear}</h3>
                  <div className="flex items-center gap-2">
                    <ChevronLeft
                      className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white"
                      onClick={() => {
                        if (currentMonth === 0) {
                          setCurrentMonth(11);
                          setCurrentYear(currentYear - 1);
                        } else {
                          setCurrentMonth(currentMonth - 1);
                        }
                      }}
                    />
                    <ChevronRight
                      className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white"
                      onClick={() => {
                        if (currentMonth === 11) {
                          setCurrentMonth(0);
                          setCurrentYear(currentYear + 1);
                        } else {
                          setCurrentMonth(currentMonth + 1);
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map((day) => (
                    <div key={day} className="text-center text-xs text-gray-400 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {generateCalendar()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;