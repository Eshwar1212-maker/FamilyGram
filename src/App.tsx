import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import { Post } from './pages/Post';



function App() {
  return (
    <div className="bg-black" id='light'>
        <Router>
          <Navbar />
          <br />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/post' element={<Post />}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
