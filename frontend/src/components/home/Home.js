import React from 'react';

function Home() {
    return (
        <div>
            <div className="flex flex-col justify-center items-center min-h-screen text-center px-4">
                <h1 className="text-4xl sm:text-6xl font-bold text-black mb-6">TaskMaster</h1>
                <p className="text-lg sm:text-2xl text-gray-700 mb-10">
                    Stay Organized, Get Things Done.
                </p>
                <button
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-orange-400 text-white text-lg sm:text-xl font-semibold rounded-lg shadow-md hover:bg-orange-500">
                    Get Started Now
                </button>
            </div>

            <div className="flex flex-col justify-center items-start min-h-screen bg-orange-50 px-6 sm:px-32 py-10 sm:py-0">
                <p className="text-orange-500 text-lg sm:text-xl font-semibold mb-4">
                    Make lists, export them and enhance your workflow
                </p>
                <h2 className="text-3xl sm:text-5xl font-bold text-black leading-snug mb-6">
                    List-Based Task<br />Manager
                </h2>
                <p className="text-base sm:text-2xl text-gray-700 leading-relaxed">
                    Scared of losing your data?<br />
                    Just make a snapshot of your workspace and continue working.<br />
                    Share the workspaces with your co-workers, boss, etc.
                </p>
            </div>

            <div className="flex flex-col justify-center items-start min-h-screen bg-orange-50 px-6 sm:px-32 py-10 sm:py-0">
                <p className="text-orange-500 text-lg sm:text-xl font-semibold mb-4">
                    Clear your mind
                </p>
                <h2 className="text-3xl sm:text-5xl font-bold text-black leading-snug mb-6">
                    Get more done<br />with less clutter
                </h2>
                <p className="text-base sm:text-2xl text-gray-700 leading-relaxed">
                    TaskMaster’s simple, clutter-free interface ensures<br />
                    you can focus solely on your tasks.<br />
                    Create, add or organize your list and tasks with just a few taps.
                </p>
            </div>
        </div>
    );
}

export default Home;
