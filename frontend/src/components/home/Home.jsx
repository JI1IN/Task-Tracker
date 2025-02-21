import React from 'react';
import '../global.css'
import {Button} from '@mui/material'
import {Link} from "react-router-dom";

function Home() {
    return (
        <div>
            <div className="flex flex-col justify-center items-center min-h-screen text-center px-4">
                <div className="bg-orange-300 text-black p-8 sm:p-16 rounded-lg shadow-xl w-full sm:w-1/2">
                    <h1 className="text-4xl sm:text-6xl font-bold mb-6 sm:mb-8 break-words">
                        TaskMaster
                    </h1>
                    <p className="text-lg sm:text-2xl sm:text-black mb-6">
                        Stay Organized, Get Things Done.
                    </p>
                    <Link to="/register">
                     <Button  variant="contained"
                  sx={{
                  backgroundColor: '#F8C794',
                  textTransform: 'none',
                    color: '#000',
                   fontWeight:'bold',

                  '&:hover': { backgroundColor: '#ff8c1a' },
                  }}>
                  Get Started Now
                  </Button>
                        </Link>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center min-h-screen bg-orange-50 px-6 sm:px-32 py-10 sm:py-0">
                {/* Left Side - Text */}
                <div className="flex flex-col justify-center items-start sm:w-1/2 mb-6 sm:mb-0">
                    <p className="text-orange-500 sm:font-semibold mb-4">
                        Make lists, export them and enhance your workflow
                    </p>
                    <h2 className="text-3xl sm:text-3xl font-bold text-black leading-snug mb-6">
                        List-Based Task<br />Manager
                    </h2>
                    <p className="text-base sm:text-gray-700 leading-relaxed">
                        Welcome to our platform!
                        <br />
                        Streamline your workflow and enhance collaboration.<br />
                        Organize your tasks and lists with TaskMaster.
                    </p>
                </div>


                <div className="sm:w-1/2">
                    <img
                        src="/Preview.png"
                        alt="TaskMaster"
                        className="w-full h-auto object-cover rounded-lg shadow-md"
                    />
                </div>
            </div>

            <div
                className="flex flex-col justify-center items-start min-h-screen bg-orange-200 px-6 sm:px-32 py-10 sm:py-0">
                <p className="text-orange-500 sm:font-semibold mb-4">
                    Clear your mind
                </p>
                <h2 className="text-3xl sm:text-3xl font-bold text-black leading-snug mb-6">
                    Get more done<br />with less clutter
                </h2>
                <p className="text-base sm:text-gray-700 leading-relaxed">
                    TaskMaster’s simple, clutter-free interface ensures<br />
                    you can focus solely on your tasks.<br />
                    Create, add or organize your list and tasks with just a few taps.
                </p>
            </div>
        </div>
    );
}

export default Home;
