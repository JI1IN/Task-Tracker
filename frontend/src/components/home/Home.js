import React from 'react';

function Home() {
    return (
        <div>
            <div className="flex justify-start items-center w-full h-screen font-bold px-5 text-black">
                <div className="text-left text-[10vw] md:text-[8vw] sm:text-[6vw]">
                    Welcome<br/>
                    to Task-Master
                </div>
            </div>

            <div className="flex justify-center items-center min-h-screen ">
                <h1 className="text-center text-3xl font-semibold">
                    Start tracking already!
                </h1>
            </div>

            <div className="flex justify-center items-center min-h-screen">
                <h1 className="text-center text-3xl font-semibold ">
                    And if you don't start tracking...
                </h1>
            </div>

            <div className="flex justify-center items-center min-h-screen">
                <h1 className="text-center text-3xl font-semibold ">
                    I will kill you.
                </h1>
            </div>
        </div>
    );
}

export default Home;
