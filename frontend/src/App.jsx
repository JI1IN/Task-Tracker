"use client"

import { useState } from "react"
import { Link, useLocation, Route, Routes } from "react-router-dom"
import { Disclosure } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { Button } from "@mui/material"
import Home from "./components/home/Home"
import About from "./components/about/About"
import Contact from "./components/contact/Contact"
import TaskTracker from "./components/tasktracker/TaskTracker"
import Login from "./components/login/login"
import Register from "./components/register/register"

function App() {
  const [user, setUser] = useState(null)
  const location = useLocation()
  const isTaskTrackerPage = location.pathname === "/tasktracker"

  return (
    <div className="bg-[#FFF2D7] min-h-screen">
      <Disclosure
        as="nav"
        className={`fixed z-50 ease-in-out bg-black/80 backdrop-blur-sm shadow-lg
        ${
          isTaskTrackerPage
            ? "md:w-[280px] md:right-4 md:top-4 md:rounded-xl md:max-h-[calc(100vh-2rem)] md:overflow-auto w-full sm:w-full top-0 right-0 rounded-b-xl"
            : "w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] left-1/2 transform -translate-x-1/2 top-4 rounded-xl"
        }`}
        style={{
          transition:
            "width 700ms ease-in-out, left 550ms ease-in-out, right 550ms ease-in-out, transform 550ms ease-in-out, top 550ms ease-in-out, border-radius 550ms ease-in-out, max-height 550ms ease-in-out",
        }}
      >
        {({ open }) => (
          <>
            <div className="px-4 py-3 flex items-center justify-between">
              <div
                className={`flex items-center transition-all duration-1000 ease-in-out ${isTaskTrackerPage ? "md:w-full md:justify-center" : "space-x-6"}`}
              >
                <Link to="/" className="text-white text-lg font-bold flex items-center">
                  <img src="/icon.png" alt="main_icon" className="w-10 h-10 mr-2" />
                  TaskMaster
                </Link>

                {/* Desktop Nav Links - Only show horizontally when not on TaskTracker */}
                {!isTaskTrackerPage && (
                  <div className="hidden md:flex space-x-6">
                    <Link to="/tasktracker" className="text-white hover:text-gray-300 transition-colors duration-300">
                        Tracker
                    </Link>
                    <Link to="/about" className="text-white hover:text-gray-300 transition-colors duration-300">
                      About
                    </Link>
                    <Link to="/contact" className="text-white hover:text-gray-300 transition-colors duration-300">
                      Contact
                    </Link>

                  </div>
                )}
              </div>

              {/* User Auth Buttons - Only show horizontally when not on TaskTracker */}
              {!isTaskTrackerPage && (
                <div className="hidden md:flex space-x-4 transition-all duration-1000 ease-in-out">
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      color: "#F8C794",
                      borderColor: "#F8C794",
                      "&:hover": { borderColor: "#e0a877" },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Sign in
                  </Button>
                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#F8C794",
                      "&:hover": { backgroundColor: "#e0a877" },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Sign up
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button - Hidden on desktop */}
              <Disclosure.Button className="md:hidden text-white focus:outline-none transition-transform duration-300">
                {open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
              </Disclosure.Button>
            </div>

            {/* TaskTracker Sidebar Navigation Links - Only visible on desktop when on TaskTracker */}
            {isTaskTrackerPage && (
              <div
                className="hidden md:flex flex-col items-center py-4 border-t border-gray-700 transition-all duration-1000 ease-in-out"
                style={{ transition: "opacity 1000ms ease-in-out, height 1000ms ease-in-out" }}
              >
                <div className="flex flex-col items-center space-y-4 w-full px-4">
                  <Link
                    to="/tasktracker"
                    className="text-white hover:text-gray-300 w-full text-center py-2 transition-colors duration-300"
                  >
                    Tracker
                  </Link>
                  <Link
                    to="/about"
                    className="text-white hover:text-gray-300 w-full text-center py-2 transition-colors duration-300"
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className="text-white hover:text-gray-300 w-full text-center py-2 transition-colors duration-300"
                  >
                    Contact
                  </Link>

                </div>

                {/* Auth buttons below nav links in sidebar mode */}
                <div className="flex flex-col space-y-3 w-full px-6 mt-6 mb-4 transition-all duration-1000 ease-in-out">
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      color: "#F8C794",
                      borderColor: "#F8C794",
                      "&:hover": { borderColor: "#e0a877" },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Sign in
                  </Button>
                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#F8C794",
                      "&:hover": { backgroundColor: "#e0a877" },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Sign up
                  </Button>
                </div>
              </div>
            )}

            {/* Mobile Menu */}
            <Disclosure.Panel className="md:hidden bg-black/90 rounded-b-xl text-center py-4 px-4 transition-all duration-300 ease-in-out">
              <div className="space-y-4">
                <Link
                  to="/tasktracker"
                  className="text-white block py-2 hover:bg-black/40 rounded-lg transition-colors duration-300"
                >
                  Tracker
                </Link>
                <Link
                  to="/about"
                  className="text-white block py-2 hover:bg-black/40 rounded-lg transition-colors duration-300"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-white block py-2 hover:bg-black/40 rounded-lg transition-colors duration-300"
                >
                  Contact
                </Link>

                <div className="pt-2 space-y-3">
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      color: "#F8C794",
                      borderColor: "#F8C794",
                      "&:hover": { borderColor: "#e0a877" },
                      transition: "all 0.3s ease",
                    }}
                    className="w-full"
                  >
                    Sign in
                  </Button>
                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#F8C794",
                      "&:hover": { backgroundColor: "#e0a877" },
                      transition: "all 0.3s ease",
                    }}
                    className="w-full"
                  >
                    Sign up
                  </Button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Main Content - Add padding only on desktop when on TaskTracker page */}
      <div
        className={`
          ${isTaskTrackerPage ? "md:pl-0 md:pr-[300px]" : ""} 
          pt-16 md:pt-0 
          transition-all duration-1000 ease-in-out
        `}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/tasktracker" element={<TaskTracker />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Jason Chen. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App

