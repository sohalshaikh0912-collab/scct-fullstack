import React, { useState, useEffect } from 'react';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', discount: '', startDate: '', image: '' });
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetch('http://localhost:5000/api/courses').then(res => res.json()).then(d => d.success && setCourses(d.data));
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/courses', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(newCourse)
    });
    if (res.ok) { setCourses([...courses, (await res.json()).data]); setNewCourse({ title: '', discount: '', startDate: '', image: '' }); }
  };

  const handleDelete = async (id) => {
    if(!window.confirm('Delete this course?')) return;
    const res = await fetch(`http://localhost:5000/api/courses/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
    if (res.ok) setCourses(courses.filter(c => c._id !== id));
  };

  return (
    <div><h2 className="text-3xl font-black uppercase tracking-tight text-white mb-6">Manage Courses</h2>
      <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-6 bg-[#111] border border-white/10 rounded-xl">
        <input type="text" placeholder="Title" value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} className="bg-black border border-white/10 px-4 py-2 text-white" required />
        <input type="text" placeholder="Discount" value={newCourse.discount} onChange={e => setNewCourse({...newCourse, discount: e.target.value})} className="bg-black border border-white/10 px-4 py-2 text-white" required />
        <input type="text" placeholder="Start Date" value={newCourse.startDate} onChange={e => setNewCourse({...newCourse, startDate: e.target.value})} className="bg-black border border-white/10 px-4 py-2 text-white" required />
        <input type="text" placeholder="Image URL" value={newCourse.image} onChange={e => setNewCourse({...newCourse, image: e.target.value})} className="bg-black border border-white/10 px-4 py-2 text-white" required />
        <div className="md:col-span-2"><button type="submit" className="bg-white text-black font-bold px-6 py-2 rounded hover:bg-gray-200">Add Course</button></div>
      </form>
      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
        {courses.map(c => <div key={c._id} className="flex justify-between border-b border-white/10 py-3"><span>{c.title}</span><button onClick={() => handleDelete(c._id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button></div>)}
      </div>
    </div>
  );
};
export default ManageCourses;