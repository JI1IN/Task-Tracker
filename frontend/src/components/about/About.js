import React from 'react';
import '../stylesheet.css'


function About() {

    return (
        <div>
            <div className="flex flex-col justify-center items-center min-h-screen text-center px-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">About Us</h1>
                <p className="text-lg sm:text-gray-700 mb-6">
                    Just a bunch of passionate developers.
                </p>
            </div>


            <div
                className="flex flex-col justify-center items-start min-h-screen bg-orange-50 px-6 sm:px-32 py-10 sm:py-0">
                <h2 className="text-3xl sm:text-3xl font-bold text-black leading-snug mb-6">
                    Who we are
                </h2>
                <p className="text-base sm:text-gray-700 leading-relaxed">
                    Located in Vienna,<br/>
                    we are a team of junior developers creating simple,
                    <br/>
                    yet powerful solutions and tools to
                    <br/>
                    resolve real world problems (to the best of our abilities).
                </p>
            </div>

            <div
                className="flex flex-col justify-center items-start min-h-screen bg-orange-200 px-6 sm:px-32 py-10 sm:py-0">
                <h2 className="text-3xl sm:text-3xl font-bold text-black leading-snug mb-6">
                    Our Mission
                </h2>
                <p className="text-base sm:text-gray-700 leading-relaxed">
                    Our mission is to empower individuals<br/>
                    and teams to stay organized, <br />
                    focused, and on top of their goals. <br/>
                    We believe that managing your tasks should be intuitive,<br />
                    efficient, and as simple as humanly possible.
                </p>
            </div>
        </div>
    );

}

export default About;