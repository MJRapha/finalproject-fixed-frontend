//import React, { useEffect } from 'react';
import './App.css';
import Navabar from './components/main-navbar/Navabar';
import { Route, Routes } from "react-router-dom";
import './themed-bootstrap.scss'
import Footer from './components/footer/Footer';
import Home from './routes/HomePage/Home';
import About from './routes/AboutPage/About';
import Register from './routes/RegisterPage/Register';
import Login from './routes/LoginPage/Login';
import Add from './routes/AddPage/Add';
//import { getCards } from './services/cards.service'
function App() {

  return (
    <>
      <Navabar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
