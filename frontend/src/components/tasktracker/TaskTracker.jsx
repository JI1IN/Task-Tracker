import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../global.css';
import { TextField, Button, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function TaskTracker() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
    axios.defaults.withCredentials = true;
    axios.defaults.credentials = 'include';

    const today = new Date().toISOString().split('T')[0];
    const [lists, setLists] = useState([]);
    const [tasks, setTasks] = useState([]); // State to store tasks for the selected list
    const [newListTitle, setNewListTitle] = useState('');
    const [newTask, setNewTask] = useState('');
    const [taskDueDate, setTaskDueDate] = useState(today);
    const [taskPriority, setTaskPriority] = useState('medium');
    const [selectedList, setSelectedList] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('error');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        loadTodoLists();
    }, []);

    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => {
                setOpen(false);
            }, 3000); // auto-hide after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    const handleCloseToast = () => {
        setOpen(false);
    };

    const loadTodoLists = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/get_lists`);
            setLists(response.data);
            if (!selectedList && response.data.length > 0) {
                setSelectedList(response.data[0].title);
            } else if (response.data.length === 0) {
                setSelectedList('');
            }
        } catch (error) {
            setToastMessage('Error loading task lists. Please try again.');
            setToastType('error');
            setOpen(true);
        }
    };

    const loadTasks = async (listTitle) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/get_tasks?title=${listTitle}`);
            const tasksData = response.data;
            setTasks(tasksData);
        } catch (error) {
            setToastMessage('Error loading tasks. Please try again.');
            setToastType('error');
            setOpen(true);
        }
    };

    // Function to generate a unique title for the new list
    const generateUniqueListTitle = (title) => {
        let uniqueTitle = title;
        let index = 1;

        // Check if the list title already exists
        while (lists.some((list) => list.title === uniqueTitle)) {
            uniqueTitle = `${title} (${index})`;
            index++;
        }

        return uniqueTitle;
    };

    // Modify the addList function to use the unique title
    const addList = async (event) => {
        event.preventDefault();
        if (!newListTitle) {
            setToastMessage('Please enter a list title.');
            setToastType('error');
            setOpen(true);
            return;
        }

        const uniqueTitle = generateUniqueListTitle(newListTitle);

        try {
            await axios.post(`${API_BASE_URL}/add_list`, { title: uniqueTitle });
            setNewListTitle('');
            await loadTodoLists();
            setToastMessage('List added successfully!');
            setToastType('success');
            setOpen(true);
        } catch (error) {
            setToastMessage('Error adding list. Please try again.');
            setToastType('error');
            setOpen(true);
        }
    };

    const deleteList = async (listTitle) => {
        try {
            await axios.post(`${API_BASE_URL}/delete_list`, { title: listTitle });
            await loadTodoLists();
            setToastMessage('List deleted successfully!');
            setToastType('success');
            setOpen(true);
        } catch (error) {
            setToastMessage('Error deleting list. Please try again.');
            setToastType('error');
            setOpen(true);
        }
    };

    const addTask = async (event) => {
        event.preventDefault();
        if (!newTask || !selectedList || !taskDueDate) {
            setToastMessage('Please fill in all fields.');
            setToastType('error');
            setOpen(true);
            return;
        }
        const formattedDate = new Date(taskDueDate)
            .toLocaleDateString('en-GB')
            .split('/')
            .reverse()
            .join('-');

        try {
            const response = await axios.post(`${API_BASE_URL}/add_task`, {
                task: newTask,
                date: formattedDate,
                priority: taskPriority,
                list_title: selectedList
            });

            if (response.data.success) {
                setNewTask('');
                setTaskDueDate(today);
                await loadTodoLists();
                await loadTasks(selectedList);
                setIsTaskModalOpen(false);
                setToastMessage('Task added successfully!');
                setToastType('success');
                setOpen(true);
            } else {
                setToastMessage('Failed to add task. Please try again.');
                setToastType('error');
                setOpen(true);
            }
        } catch (error) {
            setToastMessage('Error adding task. Please try again.');
            setToastType('error');
            setOpen(true);
        }
    };

    const toggleTaskDone = async (taskName, isDone) => {
        try {
            await axios.post(`${API_BASE_URL}/update_task_status`, {
                task: taskName,
                done: isDone,
                list_title: selectedList
            });

            const updatedTasks = tasks.map((task) =>
                task.name === taskName ? { ...task, done: isDone } : task
            );

            setTasks(updatedTasks);
        } catch (error) {
            setToastMessage('Error updating task status.');
            setToastType('error');
            setOpen(true);
        }
    };

    const handleShowDetails = (task) => {
        setSelectedTask(task);
        setIsDetailsModalOpen(true);
    };

    const handleDelete = async (taskName) => {
        try {
            await axios.post(`${API_BASE_URL}/delete_task`, { title: selectedList, task: taskName });
            await loadTasks(selectedList); // Reload tasks after deletion
            setToastMessage('Task deleted successfully!');
            setToastType('success');
            setOpen(true);
        } catch (error) {
            setToastMessage('Error deleting task. Please try again.');
            setToastType('error');
            setOpen(true);
        }
    };

    const closeTaskModal = () => {
        setIsTaskModalOpen(false);
        setNewTask('');
        setTaskDueDate(today);
        setTaskPriority('medium');
        setToastMessage('');
    };

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false);
        setSelectedTask(null);
    };

    useEffect(() => {
        if (selectedList) {
            loadTasks(selectedList);
        }
    }, [selectedList]);

    return (
        <div className="min-h-screen bg-orange-100">
            <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseToast}>
                <Alert onClose={handleCloseToast} severity={toastType} sx={{ width: '100%' }}>
                    {toastMessage}
                </Alert>
            </Snackbar>

            <div className="flex flex-col lg:flex-row">
                <aside className="w-full lg:w-1/5 bg-[#FFE0B5] p-4 shadow-md lg:min-h-screen">
                    <h2 className="text-2xl font-semibold mb-4">Task Lists</h2>
                    <form className="mt-4 mb-4" onSubmit={addList}>
                        <div className="mb-2">
                            <TextField
                                id="filled-helperText"
                                label="New List Title"
                                variant="filled"
                                fullWidth
                                value={newListTitle}
                                onChange={(e) => setNewListTitle(e.target.value)}
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            color="success">
                            Add List
                        </Button>
                    </form>

                    <div className="flex flex-col gap-2">
                        {lists.map((list) => (
                            <div key={list.title}
                                 className="flex justify-between items-center p-2 rounded-lg bg-orange-100 hover:bg-[#D4A57A] w-full transition-colors duration-300">
                                <span
                                className="cursor-pointer w-full block"
                                onClick={() => setSelectedList(list.title)}
                                >
                                {list.title}
                                </span>
                                <div className="ml-0.5">
                                    <Button
                                        variant="contained"
                                        onClick={() => deleteList(list.title)}
                                        textTransform='none'
                                        color="error"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>


                <main className="w-full lg:w-4/5 bg-[#FFF2D7] p-6">
                    <header className="mb-4">
                        <h1 className="text-3xl font-semibold">{selectedList || 'Select a List'}</h1>
                    </header>

                    {selectedList && (
                        <div>
                            <div className="mb-4">
                                <button
                                    onClick={() => setIsTaskModalOpen(true)}
                                    className="px-4 py-2 bg-white rounded-3xl hover:bg-gray-400 transition duration-150 text-sm"
                                >
                                    Add Task
                                </button>
                            </div>

                            {tasks.map((task) => (
                                <div
                                    key={task.name}
                                    className={`p-4 mb-2 rounded-3xl border-b-4 border-gray-400 ${
                                        task.done ? 'bg-green-100 line-through' : 'bg-[#FFE0B5]'
                                    }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={task.done}
                                                onChange={(e) => toggleTaskDone(task.name, e.target.checked)}
                                                className="mr-4"
                                            />
                                            <span
                                                className="cursor-pointer text-lg text-gray-800 transition-transform duration-300 transform hover:scale-105"
                                                onClick={() => handleShowDetails(task)}
                                            >
                                                {task.name}
                                            </span>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => handleDelete(task.name)}
                                                className="px-4 py-2 bg-[#D4A57A] text-white rounded-lg hover:bg-[#C28F61] transition duration-300 text-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            <Dialog open={isTaskModalOpen} onClose={closeTaskModal} maxWidth="sm" fullWidth>
                <DialogTitle className="bg-[#FFE0B5] text-center font-semibold text-xl">Add New Task</DialogTitle>
                <DialogContent className="bg-[#FFF2D7]">
                    <form onSubmit={addTask}>
                        <TextField
                            label="Task Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />
                        <TextField
                            label="Due Date"
                            type="date"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={taskDueDate}
                            onChange={(e) => setTaskDueDate(e.target.value)}
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            label="Priority"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={taskPriority}
                            onChange={(e) => setTaskPriority(e.target.value)}
                            select
                            SelectProps={{native: true}}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </TextField>
                    </form>
                </DialogContent>
                <DialogActions className="bg-[#FFF2D7]">
                    <Button onClick={closeTaskModal} color="secondary">Cancel</Button>
                    <Button onClick={addTask} color="primary">Add Task</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isDetailsModalOpen} onClose={closeDetailsModal} maxWidth="sm" fullWidth>
                <DialogTitle className="bg-[#FFE0B5] text-center font-semibold text-xl">Task Details</DialogTitle>
                <DialogContent className="bg-[#FFF2D7]">
                    {selectedTask && (
                        <div>
                            <h3 className="text-lg">{selectedTask.name}</h3>
                            <p>Due Date: {selectedTask.date}</p>
                            <p>Priority: {selectedTask.priority}</p>
                            <p>Status: {selectedTask.done ? 'Completed' : 'Pending'}</p>
                        </div>
                    )}
                </DialogContent>
                <DialogActions className="bg-[#FFF2D7]">
                    <Button onClick={closeDetailsModal} color="secondary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default TaskTracker;
