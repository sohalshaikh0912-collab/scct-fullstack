import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DashboardStats from './DashboardStats';
import ManageAdmissions from './ManageAdmissions';
import ManageContacts from './ManageContacts';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stats');

  // ---------- Courses state ----------
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: '', discount: '', startDate: '', image: ''
  });
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchProfileAndData = async () => {
      try {
        const profileRes = await fetch('http://localhost:5000/api/admin/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (profileRes.ok) {
          const data = await profileRes.json();
          setAdmin(data.admin);
        } else {
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
          return;
        }

        const courseRes = await fetch('http://localhost:5000/api/courses');
        const courseData = await courseRes.json();
        if (courseData.success) {
          setCourses(courseData.data);
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndData();
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // ---------- Courses Management ----------
  const handleInputChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newCourse),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: 'Course added successfully!' });
        setCourses([...courses, data.data]);
        setNewCourse({ title: '', discount: '', startDate: '', image: '' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to add course.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Server error.' });
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        setCourses(courses.filter(c => c._id !== id));
        setMessage({ type: 'success', text: 'Course deleted.' });
      } else {
        setMessage({ type: 'error', text: 'Failed to delete course.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Server error.' });
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-black flex justify-center items-center text-white">Loading Admin Panel...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 md:px-16 py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-8 mb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2">Welcome back, <span className="text-white font-bold">{admin?.email}</span></p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 md:mt-0 bg-red-500/10 hover:bg-red-500 border border-red-500/50 text-red-400 hover:text-white font-bold uppercase text-xs tracking-widest px-6 py-3 rounded-lg transition-all"
          >
            Logout
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-6 mb-6 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('stats')}
            className={`font-bold uppercase tracking-widest text-sm ${
              activeTab === 'stats' ? 'text-white border-b-2 border-white pb-3' : 'text-gray-400 hover:text-white'
            }`}
          >
            Stats
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`font-bold uppercase tracking-widest text-sm ${
              activeTab === 'courses' ? 'text-white border-b-2 border-white pb-3' : 'text-gray-400 hover:text-white'
            }`}
          >
            Courses
          </button>
          <button
            onClick={() => setActiveTab('admissions')}
            className={`font-bold uppercase tracking-widest text-sm ${
              activeTab === 'admissions' ? 'text-white border-b-2 border-white pb-3' : 'text-gray-400 hover:text-white'
            }`}
          >
            Admissions
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`font-bold uppercase tracking-widest text-sm ${
              activeTab === 'contacts' ? 'text-white border-b-2 border-white pb-3' : 'text-gray-400 hover:text-white'
            }`}
          >
            Contacts
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'stats' && <DashboardStats />}

        {activeTab === 'courses' && (
          <div>
            {message && (
              <div className={`mb-6 p-4 rounded-lg border ${
                message.type === 'success'
                  ? 'border-green-500/50 bg-green-500/10 text-green-400'
                  : 'border-red-500/50 bg-red-500/10 text-red-400'
              }`}>
                {message.text}
              </div>
            )}

            <div className="bg-[#111111] border border-white/10 rounded-xl p-8 mb-12">
              <h3 className="text-xl font-bold uppercase tracking-wide mb-6">Add New Course</h3>
              <form onSubmit={handleAddCourse} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text" name="title" value={newCourse.title} onChange={handleInputChange}
                  placeholder="Course Title" required
                  className="bg-black border border-white/10 px-4 py-3 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white transition-all"
                />
                <input
                  type="text" name="discount" value={newCourse.discount} onChange={handleInputChange}
                  placeholder="Discount (e.g. 70%)" required
                  className="bg-black border border-white/10 px-4 py-3 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white transition-all"
                />
                <input
                  type="text" name="startDate" value={newCourse.startDate} onChange={handleInputChange}
                  placeholder="Start Date (e.g. July 1st)" required
                  className="bg-black border border-white/10 px-4 py-3 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white transition-all"
                />
                <input
                  type="text" name="image" value={newCourse.image} onChange={handleInputChange}
                  placeholder="Image URL (e.g. /Ai.jpg or https://...)" required
                  className="bg-black border border-white/10 px-4 py-3 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white transition-all"
                />
                <div className="md:col-span-2">
                  <button type="submit" className="w-full bg-white text-black font-black uppercase tracking-widest py-3 rounded-lg hover:bg-gray-200 transition-all">
                    Add Course
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8">
              <h3 className="text-xl font-bold uppercase tracking-wide mb-6">Manage Existing Courses</h3>
              {courses.length === 0 ? (
                <p className="text-gray-500 text-center py-6">No courses added yet. Use the form above!</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 text-sm uppercase tracking-widest">
                        <th className="pb-3 pr-4">Title</th>
                        <th className="pb-3 pr-4">Discount</th>
                        <th className="pb-3 pr-4">Start Date</th>
                        <th className="pb-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course) => (
                        <tr key={course._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 pr-4 font-bold">{course.title}</td>
                          <td className="py-4 pr-4">{course.discount}</td>
                          <td className="py-4 pr-4">{course.startDate}</td>
                          <td className="py-4">
                            <button
                              onClick={() => handleDeleteCourse(course._id)}
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
        )}

        {activeTab === 'admissions' && <ManageAdmissions />}
        {activeTab === 'contacts' && <ManageContacts />}

      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;