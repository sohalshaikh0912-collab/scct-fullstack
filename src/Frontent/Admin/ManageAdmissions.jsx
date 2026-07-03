import React, { useState, useEffect } from 'react';

const ManageAdmissions = () => {
  const [admissions, setAdmissions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/admissions')
      .then(res => res.json())
      .then(data => {
        if (data.success) setAdmissions(data.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-6">Manage Admissions</h2>
      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
        {admissions.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No admissions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-sm uppercase tracking-widest">
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-4">Email</th>
                  <th className="pb-3 pr-4">Course</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {admissions.map((a) => (
                  <tr key={a._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 pr-4 font-bold">{a.firstName} {a.lastName}</td>
                    <td className="py-4 pr-4">{a.email}</td>
                    <td className="py-4 pr-4">{a.course}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 text-xs font-bold uppercase rounded-full ${
                        a.status === 'Admitted' ? 'bg-green-500/20 text-green-400 border border-green-500/50' :
                        a.status === 'Application' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' :
                        a.status === 'Contacted' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' :
                        'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                      }`}>
                        {a.status || 'New'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAdmissions;