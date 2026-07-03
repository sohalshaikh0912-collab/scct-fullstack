import React, { useState, useEffect } from 'react';

const DashboardStats = () => {
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, app: 0, admitted: 0 });

  useEffect(() => {
    fetch('http://localhost:5000/api/admissions')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const all = data.data;
          setStats({
            total: all.length,
            new: all.filter(l => l.status === 'New').length,
            contacted: all.filter(l => l.status === 'Contacted').length,
            app: all.filter(l => l.status === 'Application').length,
            admitted: all.filter(l => l.status === 'Admitted').length
          });
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-6">Dashboard Stats</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 p-6 bg-[#111] border border-white/10 rounded-xl">
        <div><span className="text-xs text-gray-500">Total</span><div className="text-2xl font-black">{stats.total}</div></div>
        <div><span className="text-xs text-gray-500">New</span><div className="text-2xl font-black text-blue-400">{stats.new}</div></div>
        <div><span className="text-xs text-gray-500">Contacted</span><div className="text-2xl font-black text-yellow-400">{stats.contacted}</div></div>
        <div><span className="text-xs text-gray-500">Applications</span><div className="text-2xl font-black text-purple-400">{stats.app}</div></div>
        <div><span className="text-xs text-gray-500">Admitted</span><div className="text-2xl font-black text-green-400">{stats.admitted}</div></div>
      </div>
      <div className="bg-[#111] p-4 border border-white/10 rounded-xl">
        <span className="text-xs text-gray-400 uppercase">📊 Funnel</span>
        <div className="flex gap-4 mt-2 flex-wrap">
          <span className="text-sm text-white">New ({stats.new}) →</span>
          <span className="text-sm text-yellow-400">Contacted ({stats.contacted}) →</span>
          <span className="text-sm text-purple-400">Application ({stats.app}) →</span>
          <span className="text-sm text-green-400 font-bold">Admitted ({stats.admitted})</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;