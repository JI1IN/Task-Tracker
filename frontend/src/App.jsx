import { Disclosure, DisclosureButton } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import {BrowserRouter as Router, Link, Route, Routes, useNavigate} from "react-router-dom"
import Home from "./components/home/Home"
import About from "./components/about/About"
import Contact from "./components/contact/Contact"
import TaskTracker from "./components/tasktracker/TaskTracker"
import Login from "./components/login/login"
import Register from "./components/register/register"
import Settings from "./components/settings/Settings"
import Button from "@mui/material/Button"
import { useState, useEffect } from "react"

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const storedUser = sessionStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const getUsername = (email) => {
    if (!email) return ""
    return email.split("@")[0]
  }

  const handleLogout = () => {
    sessionStorage.removeItem("user")
    setUser(null)
    navigate("/login");
  }

  return (
      <div className="bg-[#FFF2D7] min-h-screen">
        <Disclosure as="nav" className="bg-[#FFE0B5] sticky top-0 z-50">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                </DisclosureButton>
              </div>

              <div className="flex items-center justify-between sm:justify-start">
                <Link to="/">
                  <img
                    src="/icon.png"
                    alt="main_icon"
                    className="hover:scale-95 transition-all duration-200 ease-in-out w-12 h-auto hidden sm:block"
                  />
                </Link>
              </div>

              <div className="hidden sm:flex space-x-6 ml-6 items-center">
                <Link
                  to="/"
                  className="text-gray-800 hover:text-[#FF6F00] font-medium text-lg px-3 py-2 rounded-md transition-colors duration-300 ease-in-out"
                >
                  Home
                </Link>
                <Link
                  to="/tasktracker"
                  className="text-gray-800 hover:text-[#FF6F00] font-medium text-lg px-3 py-2 rounded-md transition-colors duration-300 ease-in-out"
                >
                  TaskTracker
                </Link>
                <Link
                  to="/about"
                  className="text-gray-800 hover:text-[#FF6F00] font-medium text-lg px-3 py-2 rounded-md transition-colors duration-300 ease-in-out"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-800 hover:text-[#FF6F00] font-medium text-lg px-3 py-2 rounded-md transition-colors duration-300 ease-in-out"
                >
                  Contact
                </Link>
              </div>

              <div className="ml-auto flex space-x-4 items-center">
                {user ? (
                  <>
                    <Link
                      to="/settings"
                      className="text-gray-800 hover:text-[#FF6F00] font-medium text-lg px-3 py-2 rounded-md transition-colors duration-300 ease-in-out"
                    >
                      {getUsername(user.email)}
                    </Link>
                    <Button
                      variant="contained"
                      onClick={handleLogout}
                      sx={{
                        backgroundColor: "#F8C794",
                        textTransform: "none",
                        color: "#000",
                        fontWeight: "bold",
                        "&:hover": { backgroundColor: "#ff8c1a" },
                      }}
                    >
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#F8C794",
                          textTransform: "none",
                          color: "#000",
                          fontWeight: "bold",
                          "&:hover": { backgroundColor: "#ff8c1a" },
                        }}
                      >
                        Log in
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#F8C794",
                          textTransform: "none",
                          color: "#000",
                          fontWeight: "bold",
                          "&:hover": { backgroundColor: "#ff8c1a" },
                        }}
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="sm:hidden fixed inset-0 bg-gray-900 bg-opacity-95 z-50 flex flex-col items-center justify-center space-y-8 py-10">
            {({ close }) => (
              <>
                <button className="absolute top-4 right-4 text-gray-100 focus:outline-none" onClick={close}>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
                <Link
                  to="/"
                  className="text-gray-100 text-2xl font-semibold hover:text-[#FF6F00] transition duration-300 ease-in-out"
                  onClick={close}
                >
                  Home
                </Link>
                <Link
                  to="/tasktracker"
                  className="text-gray-100 text-2xl font-semibold hover:text-[#FF6F00] transition duration-300 ease-in-out"
                  onClick={close}
                >
                  TaskTracker
                </Link>
                <Link
                  to="/about"
                  className="text-gray-100 text-2xl font-semibold hover:text-[#FF6F00] transition duration-300 ease-in-out"
                  onClick={close}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-100 text-2xl font-semibold hover:text-[#FF6F00] transition duration-300 ease-in-out"
                  onClick={close}
                >
                  Contact
                </Link>
                {user && (
                  <Link
                    to="/settings"
                    className="text-gray-100 text-2xl font-semibold hover:text-[#FF6F00] transition duration-300 ease-in-out"
                    onClick={close}
                  >
                    {getUsername(user.email)}
                  </Link>
                )}
              </>
            )}
          </Disclosure.Panel>
        </Disclosure>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/tasktracker" element={<TaskTracker />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 py-6">
          <div className="container mx-auto text-center">
            <p className="text-sm">&copy; 2024 Jason Chen. All rights reserved.</p>
          </div>
        </footer>
      </div>
  )
}

export default App

