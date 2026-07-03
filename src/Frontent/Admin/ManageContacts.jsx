import React, { useState, useEffect } from 'react';

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/contacts')
      .then(res => res.json())
      .then(data => {
        if (data.success) setContacts(data.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this contact message?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`http://localhost:5000/api/contacts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setContacts(contacts.filter(c => c._id !== id));
      } else {
        alert('Failed to delete contact.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-6">Manage Contacts</h2>
      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
        {contacts.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No contact messages yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-sm uppercase tracking-widest">
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-4">Email</th>
                  <th className="pb-3 pr-4">Subject</th>
                  <th className="pb-3 pr-4">Message</th>
                  <th className="pb-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 pr-4 font-bold">{c.name}</td>
                    <td className="py-4 pr-4">{c.email}</td>
                    <td className="py-4 pr-4">{c.subject}</td>
                    <td className="py-4 pr-4 max-w-xs truncate">{c.message}</td>
                    <td className="py-4">
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="text-red-400 hover:text-red-300 transition-colors text-sm font-bold uppercase tracking-widest"
                      >
                        Delete
                      </button>
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

export default ManageContacts;