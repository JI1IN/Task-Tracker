import React, { useState } from 'react';
import '../global.css';
import { Snackbar, Alert } from '@mui/material';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState(null); // For handling success/error status
    const [openSnackbar, setOpenSnackbar] = useState(false); // For Snackbar visibility

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/send_message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                // Clear form fields after successful submission
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }

            setOpenSnackbar(true); // Open Snackbar after submission

            console.log('Form submitted:', data);
        } catch (error) {
            setStatus('error');
            setOpenSnackbar(true); // Open Snackbar on error
            console.error('Error sending form:', error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false); // Close Snackbar when it's clicked or after a timeout
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen text-center px-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">Contact Us</h1>
            <p className="text-lg sm:text-gray-700 mb-6">
                We would like to hear from you
            </p>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Send Message
                </button>
            </form>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000} // Snackbar disappears after 6 seconds
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={status === 'success' ? 'success' : 'error'}
                    sx={{ width: '100%' }}
                >
                    {status === 'success' ? 'Your message has been sent!' : 'There was an error sending your message.'}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Contact;
