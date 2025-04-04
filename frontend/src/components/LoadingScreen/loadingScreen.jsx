import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const LoadingScreen = () => {
  useEffect(() => {
    gsap.fromTo(
      ".dot",
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.3,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: "power2.inOut",
      }
    );
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-100">
      <div className="text-3xl text-black font-semibold">
        <p className="text-black mt-4">
          Loading
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
