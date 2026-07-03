import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdmissionPage = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', dob: '', 
    course: '', education: '', address: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
 const [isLoading, setisLoading] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (e.g., +91 9876543210)";
    }

    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.course) newErrors.course = "Please select a course";

    if (!formData.education.trim()) newErrors.education = "Previous education is required";
    if (!formData.address.trim()) newErrors.address = "Residential address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setisLoading(true);   

  try {
    const response = await fetch('http://localhost:5000/api/admissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Backend response:", data);
      setSubmitted(true);
      setFormData({
        firstName: '', lastName: '', email: '', phone: '', dob: '',
        course: '', education: '', address: ''
      });
    } else {
      alert(data.message || "Something went wrong. Please try again.");
    }
  } catch (error) {
    alert("Could not connect to the server. Make sure your backend is running on port 5000.");
  } finally {
    setisLoading(false); 
  }
};


  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="max-w-lg bg-[#111] border border-white/10 rounded-xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 border border-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Application Submitted!</h2>
          <p className="text-gray-400 mt-2 mb-6">We will reach out to you shortly.</p>
          <button onClick={() => setSubmitted(false)} className="bg-white text-black font-bold px-8 py-3 hover:bg-gray-200 transition-colors uppercase text-sm tracking-widest">
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 md:px-16 py-16 relative">
        
        
        <div className="absolute top-0 right-0 md:right-16 text-[20rem] md:text-[30rem] font-black text-white/5 leading-none select-none pointer-events-none">
          01
        </div>

        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight border-l-4 border-white pl-4 mb-4">
            Admission <br /> Form
          </h1>
          <p className="text-gray-400 text-lg mb-12">Fill out the details below to start your journey.</p>

          
          <div className="bg-[#111111]/60 backdrop-blur-lg border-2 border-dashed border-white/20 rounded-2xl p-8 md:p-10 shadow-2xl hover:border-white/40 transition-colors duration-500">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
           
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">First Name</label>
                <input required value={formData.firstName} onChange={handleChange} name="firstName" placeholder="John"
                  className="w-full px-4 py-4 rounded-lg bg-black border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-white transition-all" />
                {errors.firstName && <span className="text-red-400 text-xs mt-1 ml-1 uppercase tracking-wide font-bold">{errors.firstName}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Last Name</label>
                <input required value={formData.lastName} onChange={handleChange} name="lastName" placeholder="Doe"
                  className="w-full px-4 py-4 rounded-lg bg-black border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-white transition-all" />
                {errors.lastName && <span className="text-red-400 text-xs mt-1 ml-1 uppercase tracking-wide font-bold">{errors.lastName}</span>}
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Email Address</label>
                <input required value={formData.email} onChange={handleChange} name="email" type="email" placeholder="john@example.com"
                  className="w-full px-4 py-4 rounded-lg bg-black border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-white transition-all" />
                {errors.email && <span className="text-red-400 text-xs mt-1 ml-1 uppercase tracking-wide font-bold">{errors.email}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Phone Number</label>
                <input required value={formData.phone} onChange={handleChange} name="phone" type="tel" placeholder="+91 98765 43210"
                  className="w-full px-4 py-4 rounded-lg bg-black border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-white transition-all" />
                {errors.phone && <span className="text-red-400 text-xs mt-1 ml-1 uppercase tracking-wide font-bold">{errors.phone}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Date of Birth</label>
                <input required value={formData.dob} onChange={handleChange} name="dob" type="date"
                  className="w-full px-4 py-4 rounded-lg bg-black border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-white transition-all" />
                {errors.dob && <span className="text-red-400 text-xs mt-1 ml-1 uppercase tracking-wide font-bold">{errors.dob}</span>}
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Select Course</label>
                <select required value={formData.course} onChange={handleChange} name="course"
                  className="w-full px-4 py-4 rounded-lg bg-black border border-white/10 text-white text-lg focus:outline-none focus:ring-1 focus:ring-white transition-all">
                  <option value="">Select a course</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Python Programming">Python Programming</option>
                  <option value="Web Development">Web Development</option>
                </select>
                {errors.course && <span className="text-red-400 text-xs mt-1 ml-1 uppercase tracking-wide font-bold">{errors.course}</span>}
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Previous Education</label>
                <input required value={formData.education} onChange={handleChange} name="education" placeholder="E.g. B.Sc. in Computer Science"
                  className="w-full px-4 py-4 rounded-lg bg-black border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-white transition-all" />
                {errors.education && <span className="text-red-400 text-xs mt-1 ml-1 uppercase tracking-wide font-bold">{errors.education}</span>}
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Residential Address</label>
                <textarea required value={formData.address} onChange={handleChange} name="address" rows="3" placeholder="Enter your full address"
                  className="w-full px-4 py-4 rounded-lg bg-black border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-white transition-all resize-none" />
                {errors.address && <span className="text-red-400 text-xs mt-1 ml-1 uppercase tracking-wide font-bold">{errors.address}</span>}
              </div>
              <div className="md:col-span-2 mt-2">
                <button 
  type="submit" 
  disabled={isLoading}
  className="w-full mt-2 bg-white text-black font-black uppercase tracking-widest py-3 rounded hover:bg-gray-200 transition-all flex justify-center items-center gap-2"
>
  {isLoading ? (
    <>
      
      <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Sending...
    </>
  ) : (
    'Send Message'
  )}
</button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdmissionPage;