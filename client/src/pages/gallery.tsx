import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import CapsuleCard from '../components/CapsuleCard';
import { Capsule } from '../lib/types';
import Sidebar from '@/components/Sidebar';
import { Menu } from "lucide-react";

const MOCK_CAPSULES: Capsule[] = [
  {
    id: '1',
    title: 'Graduation Memories',
    description: 'A collection of our best moments from graduation day.',
    unlockDate: new Date('2024-12-25'),
    isLocked: true,
    mediaUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80',
    isShared: false,
    createdAt: new Date('2024-03-01'),
    createdBy: 'user1'
  },
  {
    id: '2',
    title: 'Summer Vacation 2023',
    description: 'Beach memories and adventures from our amazing summer trip.',
    unlockDate: new Date('2024-06-01'),
    isLocked: true,
    mediaUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80',
    isShared: true,
    createdAt: new Date('2023-09-15'),
    createdBy: 'user1'
  }
];

const Gallery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [capsules] = useState<Capsule[]>(MOCK_CAPSULES);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to toggle sidebar

  const filteredCapsules = capsules.filter(capsule =>
    capsule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    capsule.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-0 md:w-64"} overflow-hidden`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 overflow-auto">
        {/* Toggle Sidebar Button (Visible on Small Screens) */}
        <button 
          className="md:hidden mb-4 p-2 bg-indigo-600 text-white rounded-lg"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Time Capsules</h1>
          <p className="text-gray-600">Manage and explore your digital memories.</p>
        </div>

        <SearchBar onSearch={setSearchQuery} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCapsules.map(capsule => (
            <CapsuleCard key={capsule.id} capsule={capsule} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
