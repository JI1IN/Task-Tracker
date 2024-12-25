import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import TaskTracker from './components/tasktracker/TaskTracker';
import Login from './components/login/login';
import Register from './components/register/register';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#FFF2D7] font-sans">
        <nav className="bg-[#FFE0B5] px-8 py-4 sticky top-0 z-50 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <a href="/" className="text-2xl font-bold text-gray-900 hover:text-[#F8C794] transition-all duration-300">TaskMaster</a>
            <div className="hidden md:flex flex-1 justify-center">
              <ul className="flex space-x-8 list-none">
                <li><a href="/about" className="text-gray-900 hover:text-blue-600 transition-all duration-300">About</a></li>
                <li><a href="/task-tracker" className="text-gray-900 hover:text-blue-600 transition-all duration-300">Tracker</a></li>
                <li><a href="/contact" className="text-gray-900 hover:text-blue-600 transition-all duration-300">Contact</a></li>
              </ul>
            </div>
            <div className="hidden md:flex gap-6">
              <a href="/login" className="bg-[#F8C794] text-black-900 font-bold py-3 px-9 rounded-lg hover:bg-gray-900 hover:text-white transition duration-300">
                Log in
              </a>
              <a href="/register" className="bg-[#F8C794] text-black-900 font-bold py-3 px-9 rounded-lg hover:bg-gray-900 hover:text-white transition duration-300">
                Sign up
              </a>
            </div>
            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-900 text-2xl focus:outline-none" onClick={toggleMenu}>
              {isMenuOpen ? '×' : '☰'}
            </button>
          </div>
        </nav>

        {/* Mobile Navbar Sliding Menu */}
        <div className={`fixed inset-0 bg-black bg-opacity-50 transition-all duration-300 ${isMenuOpen ? 'block' : 'hidden'}`} onClick={toggleMenu} />
        <div className={`fixed top-0 left-0 bg-white w-64 h-full shadow-lg transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6">
            <ul className="flex flex-col gap-8">
              <li><a href="/" className="text-gray-900 hover:text-blue-600">Home</a></li>
              <li><a href="/about" className="text-gray-900 hover:text-blue-600">About</a></li>
              <li><a href="/task-tracker" className="text-gray-900 hover:text-blue-600">Tracker</a></li>
              <li><a href="/contact" className="text-gray-900 hover:text-blue-600">Contact</a></li>
            </ul>
            <div className="mt-6">
              <a href="/login" className="w-full bg-[#F8C794] text-black-900 font-bold py-3 rounded-lg hover:bg-gray-900 hover:text-white transition duration-300">Log in</a>
            </div>
          </div>
        </div>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/task-tracker" element={<TaskTracker />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-gray-300 py-6">
          <div className="container mx-auto text-center">
            <p className="text-sm">&copy; 2024 Jason Chen. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
