import { useState, useEffect } from "react";
import { Link, useLocation, Route, Routes } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@mui/material";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import TaskTracker from "./components/tasktracker/TaskTracker";
import Login from "./components/login/login";
import Register from "./components/register/register";
import PageNotFound from "./components/pageNotFound/404";
import LoadingScreen from "./components/LoadingScreen/loadingScreen";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isTaskTrackerPage = location.pathname === "/tasktracker";

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/JI1IN/Task-Tracker",
      icon: <GitHubIcon />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/jason-chen-0784bb329/",
      icon: <LinkedInIcon />,
    },
  ];

  return (
    <div className="bg-orange-100 min-h-screen">
      <Disclosure
        as="nav"
        className={`fixed z-50 bg-black/80 backdrop-blur-sm shadow-lg font-sans
        ${
          isTaskTrackerPage
            ? "md:w-[280px] md:right-4 md:top-4 md:rounded-xl md:max-h-[calc(100vh-2rem)] md:overflow-auto w-full sm:w-full top-0 right-0 rounded-b-xl"
            : "w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] left-1/2 transform -translate-x-1/2 top-4 rounded-xl"
        }`}
      >
        {({ open }) => (
          <>
            <div className="px-4 py-3 flex items-center justify-between">
              <div className={`flex items-center ${isTaskTrackerPage ? "md:flex-col md:items-center" : ""}`}>
                <Link to="/" className="text-white text-lg font-bold flex items-center">
                  <img src="/icon.png" alt="main_icon" className="w-10 h-10 mr-2" />
                  TaskMaster
                </Link>

                {!isTaskTrackerPage && (
                  <div className="hidden md:flex ml-6 space-x-6">
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

              {!isTaskTrackerPage && (
                <div className="hidden md:flex items-center space-x-4 min-w-[180px] justify-end">
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      color: "#F8C794",
                      borderColor: "#F8C794",
                      "&:hover": { borderColor: "#e0a877" },
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
                    }}
                  >
                    Sign up
                  </Button>
                </div>
              )}
              <Disclosure.Button className="md:hidden text-white focus:outline-none">
                {open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
              </Disclosure.Button>
            </div>

            {isTaskTrackerPage && (
              <div className="hidden md:block border-t border-gray-700 py-4">
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

                  <div className="flex flex-col space-y-3 w-full px-2 mt-2">
                    <Button
                      component={Link}
                      to="/login"
                      variant="outlined"
                      fullWidth
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
                      fullWidth
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
              </div>
            )}

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
                    fullWidth
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
                    fullWidth
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
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <div className={`${isTaskTrackerPage ? "md:pl-0 md:pr-[300px]" : "px-4 md:px-0"} pt-16 md:pt-0`}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/tasktracker" element={<TaskTracker />} />
          <Route exact path="/login" element={<Login setUser={setUser} />} />
          <Route exact path="/register" element={<Register setUser={setUser} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>

      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <p className="text-lg font-semibold text-white">
                <Link to="/" className="text-white hover:text-gray-400 transition-colors duration-300">
                  TaskMaster
                </Link>
              </p>
              <p className="mt-2 text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Jason Chen. All rights reserved.
              </p>
            </div>

            <div className="flex space-x-6 mt-4 sm:mt-0">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-400 transition-colors duration-300"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
