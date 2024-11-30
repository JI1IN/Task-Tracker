import React from 'react';
import '../styles/home.css'

function Home() {
    return (
        <div>
         <div className="section">
            <div className='header' id="home-header">
                Welcome<br />
                to Task-Master
            </div>
        </div>

        <div className="section section1">
            <h1>
                Start tracking already!
            </h1>
        </div>

        <div className="section section2">
           <h1>And if you don't start tracking...</h1>
        </div>

        <div className="section section3">
            <h1>I will kill you.</h1>
        </div>


    <footer className="site-footer">
        <div className="footer-content">
            <p>&copy; 2024 Jason Chen. All rights reserved.</p>
        </div>
    </footer>
    </div>
    );
}


export default Home;