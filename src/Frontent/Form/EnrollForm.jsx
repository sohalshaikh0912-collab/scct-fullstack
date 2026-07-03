import React, { useState } from 'react';

const EnrollForm = () => {
  const [data, setData] = useState({ email: '', name: '', number: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!data.name.trim()) newErrors.name = 'Name is required';
    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!data.number.trim()) newErrors.number = 'Phone number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch('http://localhost:5000/api/enrolls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json(); // renamed to avoid shadowing

      if (response.ok) {
        console.log('Success:', result);
        setData({ name: '', email: '', number: '' });
        // Optionally show a success message
      } else {
        alert(result.message || 'Something went wrong. Try again.');
      }
    } catch (error) {
      console.error('Could not connect to the server. Make sure backend is running on port 5000.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-800 mt-10">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Enroll Now</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-gray-300">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={data.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {errors.name && <span className="text-red-400 text-xs mt-1">{errors.name}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-gray-300">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {errors.email && <span className="text-red-400 text-xs mt-1">{errors.email}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="number" className="text-sm font-medium text-gray-300">
            Contact Number
          </label>
          <input
            id="number"
            name="number"
            type="tel"
            value={data.number}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {errors.number && <span className="text-red-400 text-xs mt-1">{errors.number}</span>}
        </div>

        <button
          type="submit"
          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md"
        >
          Submit Enrollment
        </button>
      </form>
    </div>
  );
};

export default EnrollForm;