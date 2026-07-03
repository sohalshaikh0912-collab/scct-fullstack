import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none select-none flex items-center justify-center">
        <span className="text-[20rem] md:text-[30rem] font-black text-white/[0.03] leading-none tracking-tighter uppercase">
          ADMIN
        </span>
      </div>

      <div className="relative z-10 flex-grow flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-[#111111] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black uppercase tracking-widest mb-1">Admin Access</h1>
            <p className="text-gray-500 text-sm">Enter your credentials to manage the system.</p>
          </div>

          {error && (
            <div className="mb-4 p-3 border border-red-500/50 bg-red-500/10 text-red-400 text-sm rounded-lg text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-white transition-all"
                placeholder="admin@scct.com"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-white transition-all"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-black uppercase tracking-widest py-3 rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-white/10 pt-6">
            <NavLink to="/" className="text-xs text-gray-500 hover:text-white transition-colors">
              ← Back to Public Website
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;