import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import TaskTracker from './components/TaskTracker';
import './styles/styles.css';

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <Router>
            <div>
                <nav className="navbar">
                    <div className="container">
                        <a href="/" className="logo">Task-Master</a>
                        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="nav-links">
                            <ul>
                                <li><a href="/">Home</a></li>
                                <li><a href="/about">About</a></li>
                                <li><a href="/task-tracker">Tracker</a></li>
                                <li><a href="/contact">Contact</a></li>
                            </ul>
                        </div>
                        <button className="hamburger" id="hamburger" onClick={toggleMenu}>
                            {isMenuOpen ? '✖' : '☰'}
                        </button>
                    </div>
                </nav>
                <footer className="site-footer">
                    <div className="footer-content text-center">
                        <p>&copy; 2024 Jason Chen. All rights reserved.</p>
                    </div>
                </footer>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/task-tracker" element={<TaskTracker />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
