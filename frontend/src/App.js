import React from 'react';
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
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><a href='/'>Home</a></li>
                        <li><a href='/task-tracker'>Task Tracker</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
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
