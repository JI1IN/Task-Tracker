import React from 'react';

function Home() {
    return (
        <div>
            <div className="flex flex-col justify-center items-center min-h-screen  text-center">
                <h1 className="text-6xl font-bold text-black mb-6">TaskMaster</h1>
                <p className="text-2xl text-gray-700 mb-10">Stay Organized, Get Things Done.</p>
                <button
                    className="px-8 py-4 bg-orange-400 text-white text-xl font-semibold rounded-lg shadow-md hover:bg-orange-500">
                    Get Started Now
                </button>
            </div>

            <div className="flex flex-col justify-center items-start min-h-screen bg-orange-50 px-32 ">
                <p className="text-orange-500 text-xl font-semibold mb-4">
                    Make lists, export them and enhance your workflow
                </p>
                <h2 className="text-5xl font-bold text-black leading-snug mb-6">
                    List-Based Task<br/>Manager
                </h2>
                <p className="text-2xl text-gray-700 leading-relaxed">
                    Scared of losing your data?<br/> Just make a snapshot of your workspace and continue working.<br/>
                    Share the workspaces with your co-workers, boss, etc.
                </p>
            </div>
            <div className="flex flex-col justify-center items-start min-h-screen bg-orange-50 px-32 ">
                <p className="text-orange-500 text-xl font-semibold mb-4">
                    clear your mind
                </p>
                <h2 className="text-5xl font-bold text-black leading-snug mb-6">
                    Get more done<br/>with less clutter
                </h2>
                <p className="text-2xl text-gray-700 leading-relaxed">
                    TaskMaster’s simple, clutter-free interface ensures<br/>
                    you can focus solely on your tasks.<br/>
                    Create, add or organize your list and task with just a few taps.<br/>
                </p>
            </div>
        </div>
    );
}

export default Home;
