import React from 'react';

function Home() {
    return (
        <div>
            <div className="flex justify-start items-center w-full h-screen font-bold px-5 bg-blue-600 text-black">
                <div className="text-left text-[10vw] md:text-[8vw] sm:text-[6vw]">
                    Welcome<br/>
                    to Task-Master
                </div>
            </div>

            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <h1 className="text-center text-3xl font-semibold">
                    Start tracking already!
                </h1>
            </div>

            <div className="flex justify-center items-center min-h-screen bg-blue-500">
                <h1 className="text-center text-3xl font-semibold text-white">
                    And if you don't start tracking...
                </h1>
            </div>

            <div className="flex justify-center items-center min-h-screen bg-teal-100">
                <h1 className="text-center text-3xl font-semibold text-gray-800">
                    I will kill you.
                </h1>
            </div>
        </div>
    );
}

export default Home;
