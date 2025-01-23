import { Disclosure, DisclosureButton} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import TaskTracker from './components/tasktracker/TaskTracker';
import Login from './components/login/login';
import Register from './components/register/register';

function App() {
  return (
  <Router>
  <div className="bg-[#FFF2D7] min-h-screen">
    <Disclosure as="nav" className="bg-[#FFE0B5] bg-opacity-80 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton
                className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5"/>
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden"/>
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block"/>
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:justify-start">
            <div className="flex shrink-0 items-center font-bold sm:justify-start justify-center">
              <Link to="/"><img src="/image.png" alt="main_icon" className="hover:scale-75 ease-in duration-150 w-10 h-auto" ></img></Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link to="/" className="hover:underline px-3 py-2 text-sm font-medium">
                  Home
                </Link>
                <Link to="/tasktracker" className="hover:underline px-3 py-2 text-sm font-medium">
                  TaskTracker
                </Link>
                <Link to="/about" className="hover:underline px-3 py-2 text-sm font-medium">
                  About
                </Link>
                <Link to="/contact" className="hover:underline px-3 py-2 text-sm font-medium">
                  Contact
                </Link>
                <Link to="/login" className="hover:underline px-3 py-2 text-sm font-medium">
                  Login
                </Link>
                <Link to="/register" className="hover:underline px-3 py-2 text-sm font-medium">
                  Register
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      <Disclosure.Panel className="sm:hidden fixed inset-0 bg-gray-900 bg-opacity-95 z-50 flex flex-col items-center justify-center space-y-8">
                        {({ close }) => (
                            <>
                                <button
                                    className="absolute top-4 right-4 text-gray-100 focus:outline-none"
                                    onClick={close}
                                >
                                    <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                                </button>
                               <Link
                                    to="/"
                                    className="text-gray-100 text-2xl font-semibold hover:underline"
                                    onClick={close}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/tasktracker"
                                    className="text-gray-100 text-2xl font-semibold hover:underline"
                                    onClick={close}
                                >
                                    TaskTracker
                                </Link>
                                <Link
                                    to="/about"
                                    className="text-gray-100 text-2xl font-semibold hover:underline"
                                    onClick={close}
                                >
                                    About
                                </Link>
                                <Link
                                    to="/contact"
                                    className="text-gray-100 text-2xl font-semibold hover:underline"
                                    onClick={close}
                                >
                                    Contact
                                </Link>
                            </>
                        )}
                    </Disclosure.Panel>
    </Disclosure>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/tasktracker" element={<TaskTracker/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>

    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; 2024 Jason Chen. All rights reserved.</p>
      </div>
    </footer>
  </div>
  </Router>

  );
}

export default App;
