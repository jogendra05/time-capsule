import React from 'react';
import { Link, useLocation } from "wouter";
import { Timer as TimeCapsule, Share2, Plus, Settings } from 'lucide-react';

const Sidebar = () => {
  const [location] = useLocation();

  const navItems = [
    { icon: TimeCapsule, label: 'My Capsules', path: '/' },
    { icon: Share2, label: 'Shared Capsules', path: '/shared' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="bg-white border-r border-gray-200 w-64 h-screen fixed left-0 top-0 p-4">
      <div className="flex items-center gap-2 mb-8">
        <TimeCapsule className="w-8 h-8 text-indigo-600" />
        <h1 className="text-xl font-bold text-white">Time Capsule</h1>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={() =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                location === item.path
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <button className="mt-6 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors">
        <Plus className="w-5 h-5" />
        Create Capsule
      </button>
    </aside>
  );
};

export default Sidebar;