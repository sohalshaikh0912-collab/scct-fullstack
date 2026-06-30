import React from 'react';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const tabs = ['Dashboard Stats', 'Manage Courses', 'Manage Admissions', 'Manage Contacts'];

  return (
    <div className="w-full md:w-64 bg-[#111111] border-r border-white/10 p-6 h-full min-h-screen flex-shrink-0">
      <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-8">SCCT Admin</h2>
      <ul className="flex flex-col gap-2">
        {tabs.map((tab) => (
          <li key={tab}>
            <button
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors font-bold uppercase tracking-wide text-sm ${
                activeTab === tab 
                  ? 'bg-white text-black' 
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-8 pt-8 border-t border-white/10">
        <button 
          onClick={() => { localStorage.removeItem('adminToken'); window.location.href = '/admin/login'; }} 
          className="w-full text-red-400 hover:text-red-300 text-sm font-bold uppercase tracking-widest"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;