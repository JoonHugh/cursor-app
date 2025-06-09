import React from 'react';
import { useState } from 'react';
import styles from './App.module.css';
import MainContainer from './MainContainer.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { BrowserRouter  as Router, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from '../pages/Dashboard.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Home from '../pages/Home.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  const [count, setCount] = useState(0)

  // gapi.load('auth2', function() {
  //   gapi.auth2,init();
  // })

  return(
    <>
      <Router>
        <Layout />
      </Router>
      <ToastContainer />
    </>
  );
}

function Layout() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="main-container">
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App
