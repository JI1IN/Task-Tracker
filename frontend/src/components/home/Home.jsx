import React, {useEffect} from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

function Home() {
    const taskMaster = useRef(null);
    const subtitle = useRef(null);
     useEffect(() => {
    gsap.fromTo(
      taskMaster.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }
    );
  }, []);
     useEffect(() => {
    gsap.fromTo(
      subtitle.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: 'power4.out', delay:0.25 }
    );
  }, []);
  return (

      <div>
          <section
              className="flex flex-col justify-center items-center min-h-screen bg-orange-100 px-4 pt-14">
              <div
                 className="p-8 sm:p-16 sm:w-3/5 h-auto sm:h-[400px] flex flex-col text-left">
                  <h1
                      ref={taskMaster}
                      className="text-5xl sm:text-6xl font-semibold mb-6">
                      Stay Organized, Get Things {""}
                      <span className="underline">Done</span>
                  </h1>
                  <p
                      ref={subtitle}
                      className="text-xl sm:text-2xl mb-14"
                  >
                      Start managing your tasks easily with TaskMaster.
                  </p>
                  <Link to="/register">
                      <Button
                          variant="contained"
                          sx={{
                              backgroundColor: '#F8C794',
                              textTransform: 'none',
                              color: '#000',
                              fontWeight: 'bold',
                              padding: '14px 28px',
                              fontSize: '1.2rem',
                              '&:hover': {backgroundColor: '#ff8c1a'},
                          }}
                      >
                          Get Started Now
                      </Button>
                  </Link>
              </div>
          </section>

          <section className="flex flex-col sm:flex-row justify-center items-center bg-orange-50 px-6 sm:px-32 py-10 min-h-dvh">
              <div className="sm:w-1/2 mb-6 sm:mb-0 text-left">
                  <p className="text-orange-500 font-semibold mb-4">
                      Make lists, export them and enhance your workflow
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-bold text-black leading-snug mb-6">
                      List-Based Task Manager
                  </h2>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Streamline your workflow and enhance collaboration.<br/>
                      Organize your tasks and lists with TaskMaster.
                  </p>
              </div>
              <div className="sm:w-1/2">
                  <img
                      src="/Preview.png"
                      alt="TaskMaster Preview"
                      className="w-full h-auto object-cover rounded-lg shadow-md"
                  />
              </div>
          </section>

          <section className="flex flex-col justify-center items-center bg-orange-200 px-6 sm:px-32 py-10 min-h-dvh">
              <p className="text-orange-500 font-semibold mb-4 text-left">
                  Clear your mind
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-black leading-snug mb-6 text-center">
                  Get more done with less clutter
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-center">
                  TaskMaster’s simple, clutter‑free interface ensures you can focus solely on your tasks.<br/>
                  Create, add, or organize your lists and tasks with just a few taps.
              </p>
          </section>

          <section className="flex flex-col justify-center items-center bg-orange-400 px-6 sm:px-32 py-10 min-h-dvh">
              <p className="text-black font-semibold mb-4 text-left">
                  Zero data lost
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-black leading-snug mb-6 text-center">
                  Worried about losing your data?
              </h2>
              <p className="text-base sm:text-lg text-black leading-relaxed text-center">
                  With TaskMaster's snapshot feature, users do not have to worry about losing their data anymore<br/>
                  Simply download all of your lists and tasks using our snapshot feature.
              </p>
          </section>
      </div>
  );
}

export default Home;
