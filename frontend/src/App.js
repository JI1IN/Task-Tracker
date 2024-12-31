import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import TaskTracker from './components/tasktracker/TaskTracker';

function App() {
  return (
  <Router>
  <div className="bg-orange-100 min-h-screen">
    <Disclosure as="nav" className="bg-[#FFE0B5]">
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
          <div className="flex flex-1 items-center justify-center sm:justify-start">
            <div className="flex shrink-0 items-center font-bold sm:justify-start justify-center">
              <Link to="/">Task-Master</Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link to="/" className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                  Home
                </Link>
                <Link to="/contact" className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                  Contact
                </Link>
                <Link to="/about" className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                  About
                </Link>
                <Link to="/tasktracker" className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                  TaskTracker
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link to="/" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
            Home
          </Link>
          <Link to="/contact" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
            Contact
          </Link>
          <Link to="/about" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
            About
          </Link>
          <Link to="/tasktracker" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
            TaskTracker
          </Link>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/tasktracker" element={<TaskTracker />} />
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
