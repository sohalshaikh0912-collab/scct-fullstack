import React from 'react';
import { Route, Routes } from 'react-router-dom';


import HomePage from './Frontent/Pages/HomePage';
import AdmissionPage from './Frontent/Form/AdmissionPage';
import CourscePage from './Frontent/Pages/CourscePage';
import AboutPage from './Frontent/Pages/AboutPage';
import ContactPage from './Frontent/Pages/ContactPage';
import FacultyPage from './Frontent/Pages/FacultyPage';
import PlacementsPage from './Frontent/Pages/PlacementsPage';
import CourseDetail from './Frontent/Pages/CourseDetail';
import AdminLogin from './Frontent/Admin/AdminLogin';
import AdminDashboard from './Frontent/Admin/AdminDashboard';

const App = () => {
  return (
    <Routes>
  
      <Route path='/' element={<HomePage/>} />
      <Route path='/admissions' element={<AdmissionPage/>} />
      <Route path='/courses' element={<CourscePage/>} />
      <Route path='/course/:id' element={<CourseDetail/>} />
      <Route path='/about' element={<AboutPage/>} />
      <Route path='/contact' element={<ContactPage/>} />
      <Route path='/faculty' element={<FacultyPage/>} />
      <Route path='/placements' element={<PlacementsPage/>} />
      <Route path='/admin/login' element={<AdminLogin/>} />
      <Route path='/admin/dashboard' element={<AdminDashboard/>} />
    </Routes>
  );
};

export default App;