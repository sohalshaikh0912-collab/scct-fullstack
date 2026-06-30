import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isloading, setisloading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message cannot be empty";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!validate()) return;
    
      try{
        setisloading(true)
     const response= await fetch('http://localhost:5000/api/contacts',{
      method:'POST',
      headers:{'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      }
     )
     const result=await response.json()

if (response.ok) {
  console.log("✅ Success! Resetting form...");
  setSubmitted(true);
  setForm({ name: '', email: '', subject: '', message: '' });
} else {
  console.log("❌ Response not OK. Status:", response.status);
  alert(result.message || 'Something went wrong');
}
      }catch(error){
        console.error("your port is not connected to port5000")
      }finally{
        setisloading(false)
      }
    
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="bg-[#111] border border-white/10 p-8 rounded-xl text-center max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-2 uppercase">Message Sent!</h2>
            <p className="text-gray-400 mb-6">We will get back to you within 24 hours.</p>
            <button onClick={() => {setSubmitted(false); setForm({name:'',email:'',subject:'',message:''});}} className="bg-white text-black font-bold uppercase px-6 py-2 hover:bg-gray-200 transition-colors">
              Send Another
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 md:px-16 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Contact Us</span>
            <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.8] mt-2">
              Get In <br /> Touch
            </h1>
          </div>
          <div className="space-y-6 border-t border-white/10 pt-8">
            <div className="flex flex-col">
              <span className="text-xs uppercase text-gray-500 tracking-widest font-bold">Address</span>
              <span className="text-gray-200 mt-1">123 Tech Park, Innovation Hub, <br />New Delhi, India</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase text-gray-500 tracking-widest font-bold">Email</span>
              <span className="text-gray-200 mt-1">admissions@scct.edu.in</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase text-gray-500 tracking-widest font-bold">Phone</span>
              <span className="text-gray-200 mt-1">+91 12345 67890</span>
            </div>
          </div>
        </div>

        
        <div className="bg-[#111111] border border-white/10 rounded-xl p-8 shadow-2xl">
          <h2 className="text-xl font-bold uppercase mb-6 border-b border-white/10 pb-4">Send a Message</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-xs uppercase text-gray-400 font-bold tracking-wider">Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe"
                className="w-full mt-1 px-4 py-3 rounded bg-black border border-white/10 text-white placeholder-gray-600 focus:ring-1 focus:ring-white outline-none" />
              {errors.name && <span className="text-red-400 text-xs mt-1 block uppercase font-bold">{errors.name}</span>}
            </div>
            <div>
              <label className="text-xs uppercase text-gray-400 font-bold tracking-wider">Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com"
                className="w-full mt-1 px-4 py-3 rounded bg-black border border-white/10 text-white placeholder-gray-600 focus:ring-1 focus:ring-white outline-none" />
              {errors.email && <span className="text-red-400 text-xs mt-1 block uppercase font-bold">{errors.email}</span>}
            </div>
            <div>
              <label className="text-xs uppercase text-gray-400 font-bold tracking-wider">Subject</label>
              <input name="subject" value={form.subject} onChange={handleChange} placeholder="Admission Inquiry"
                className="w-full mt-1 px-4 py-3 rounded bg-black border border-white/10 text-white placeholder-gray-600 focus:ring-1 focus:ring-white outline-none" />
              {errors.subject && <span className="text-red-400 text-xs mt-1 block uppercase font-bold">{errors.subject}</span>}
            </div>
            <div>
              <label className="text-xs uppercase text-gray-400 font-bold tracking-wider">Message</label>
              <textarea name="message" rows="4" value={form.message} onChange={handleChange} placeholder="Tell us how we can help..."
                className="w-full mt-1 px-4 py-3 rounded bg-black border border-white/10 text-white placeholder-gray-600 focus:ring-1 focus:ring-white outline-none resize-none" />
              {errors.message && <span className="text-red-400 text-xs mt-1 block uppercase font-bold">{errors.message}</span>}
            </div>
           <button 
  type="submit" 
  disabled={isloading}
  className="w-full mt-2 bg-white text-black font-black uppercase tracking-widest py-3 rounded hover:bg-gray-200 transition-all flex justify-center items-center gap-2"
>
  {isloading ? (
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
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;