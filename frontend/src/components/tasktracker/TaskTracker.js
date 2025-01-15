import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../stylesheet.css'

function TaskTracker() {
    const today = new Date().toISOString().split('T')[0];
    const [lists, setLists] = useState([]);
    const [newListTitle, setNewListTitle] = useState('');
    const [newTask, setNewTask] = useState('');
    const [taskDueDate, setTaskDueDate] = useState(today);
    const [taskPriority, setTaskPriority] = useState('medium');
    const [selectedList, setSelectedList] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    useEffect(() => {
        loadTodoLists();
    }, []);

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    const loadTodoLists = async () => {
        try {
            const response = await axios.get('/api/get_lists');
            setLists(response.data);
            if (!selectedList && response.data.length > 0) {
                setSelectedList(response.data[0].title); // Set the first list as the default selected
            } else if (response.data.length === 0) {
                setSelectedList(''); // Reset to 'Select a List' if no lists available
            }
        } catch (error) {
            setErrorMessage('Error loading task lists. Please try again.');
        }
    };

    const addList = async (event) => {
        event.preventDefault();
        if (!newListTitle) {
            setErrorMessage('Please enter a list title.');
            return;
        }

        try {
            await axios.post('/api/add_list', { title: newListTitle });
            setNewListTitle('');
            await loadTodoLists();
        } catch (error) {
            setErrorMessage('Error adding list. Please try again.');
        }
    };

    const deleteList = async (listTitle) => {
        try {
            await axios.post('/api/delete_list', { title: listTitle });
            await loadTodoLists();
        } catch (error) {
            setErrorMessage('Error deleting list. Please try again.');
        }
    };

    const addTask = async (event) => {
        event.preventDefault();
        if (!newTask || !selectedList || !taskDueDate) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        const formattedDate = new Date(taskDueDate)
            .toLocaleDateString('en-GB')
            .split('/')
            .reverse()
            .join('.');

        try {
            const response = await axios.post('/api/add_task', {
                task: newTask,
                date: formattedDate,
                priority: taskPriority,
                list_title: selectedList,
            });

            if (response.data.success) {
                setNewTask('');
                setTaskDueDate(today);
                await loadTodoLists();
                setIsTaskModalOpen(false);
            } else {
                setErrorMessage('Failed to add task. Please try again.');
            }
        } catch (error) {
            setErrorMessage('Error adding task. Please try again.');
        }
    };

    const toggleTaskDone = async (taskName, isDone, listTitle) => {
        try {
            await axios.post('/api/update_task_status', {
                task: taskName,
                done: isDone,
                list_title: listTitle,
            });

            const updatedLists = lists.map((list) => {
                if (list.title === listTitle) {
                    list.tasks = list.tasks.map((task) =>
                        task.name === taskName ? { ...task, done: isDone } : task
                    );
                }
                return list;
            });

            setLists(updatedLists);
        } catch (error) {
            setErrorMessage('Error updating task status.');
        }
    };

    const toggleListExpand = (listTitle) => {
        setLists(lists.map((list) =>
            list.title === listTitle ? { ...list, expanded: !list.expanded } : list
        ));
    };

    const handleShowDetails = (task) => {
        setSelectedTask({
            ...task,
            dueDate: task.dueDate || task.date
        });
        setIsDetailsModalOpen(true);
    };

    const handleDelete = async (listTitle, taskName) => {
        try {
            await axios.post('/api/delete_task', { title: listTitle, task: taskName });
            await loadTodoLists();
        } catch (error) {
            setErrorMessage('Error deleting task. Please try again.');
        }
    };

    const closeTaskModal = () => {
        setIsTaskModalOpen(false);
        setNewTask('');
        setTaskDueDate(today);
        setTaskPriority('medium');
        setErrorMessage('');
    };

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false);
        setSelectedTask(null);
    };

    return (
        <div className="min-h-screen bg-orange-100">
            {/* Error Message */}
            {errorMessage && (
                <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
                    <strong>Error:</strong> {errorMessage}
                </div>
            )}

            <div className="flex flex-col lg:flex-row">
                {/* Sidebar */}
                <aside className="w-full lg:w-1/5 bg-[#FFE0B5] p-4 shadow-md lg:min-h-screen">

                    <h2 className="text-2xl font-semibold mb-4">Task Lists</h2>

                    <ul>
                        {lists.map((list) => (
                            <li key={list.title} className="flex justify-between items-center mb-2">
                                <span
                                   className={`cursor-pointer p-2 rounded-lg bg-orange-100 hover:bg-[#D4A57A] w-full block transition-colors duration-300 `}
                                    onClick={() => setSelectedList(list.title)}
                                >
                                    {list.title}
                                </span>
                                <button
                                    onClick={() => deleteList(list.title)}
                                    className="text-red-500 bg-white ml-2  px-3 py-2 rounded-3xl hover:bg-gray-400 transition duration-150 text-sm"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                    <form className="mt-4" onSubmit={addList}>
                        <input
                            type="text"
                            value={newListTitle}
                            onChange={(e) => setNewListTitle(e.target.value)}
                            placeholder="New List Title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                        />
                        <button
                            type="submit"
                            className="w-full px-3 py-2 bg-[#D4A57A] text-white rounded-lg hover:bg-[#C28F61] ransition duration-150 text-sm"
                        >
                            Add List
                        </button>
                    </form>
                </aside>

                {/* Mainframe */}
                <main className="w-full lg:w-4/5 bg-[#FFF2D7] p-6">
                    <header className="mb-4">
                        <h1 className="text-3xl font-semibold">{selectedList || 'Select a List'}</h1>
                    </header>

                    {selectedList && (
                        <div>
                            {/* Add Task Button */}
                            <div className="mb-4">
                                <button
                                    onClick={() => setIsTaskModalOpen(true)}
                                    className="px-4 py-2 bg-white rounded-3xl hover:bg-gray-400 transition duration-150 text-sm"
                                >
                                    Add Task
                                </button>
                            </div>

                            {lists
                                .find((list) => list.title === selectedList)
                                ?.tasks.map((task) => (
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
                                                    onChange={(e) => toggleTaskDone(task.name, e.target.checked, selectedList)}
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
                                                    onClick={() => handleDelete(selectedList, task.name)}
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

                    {/* Task Modal (Subwindow) */}
                    {isTaskModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="modal-content bg-white p-6 rounded-lg w-96 shadow-lg">
                                <h2 className="text-xl font-semibold mb-4">Add Task</h2>
                                <form onSubmit={addTask}>
                                    <input
                                        type="text"
                                        value={newTask}
                                        onChange={(e) => setNewTask(e.target.value)}
                                        placeholder="Task Name"
                                        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg"
                                    />
                                    <input
                                        type="date"
                                        value={taskDueDate}
                                        onChange={(e) => setTaskDueDate(e.target.value)}
                                        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg"
                                    />
                                    <select
                                        value={taskPriority}
                                        onChange={(e) => setTaskPriority(e.target.value)}
                                        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                    <div className="flex justify-between">
                                        <button
                                            type="button"
                                            onClick={closeTaskModal}
                                            className="px-4 py-2 bg-[#B67A51] text-white rounded-lg hover:bg-[#A56843]"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-[#D4A57A] text-white rounded-lg hover:bg-[#C28F61]"
                                        >
                                            Add Task
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Task Details Modal (Subwindow) */}
                    {isDetailsModalOpen && selectedTask && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="modal-content bg-white p-6 rounded-lg w-96 shadow-lg">
                                <h2 className="text-xl font-semibold mb-4">Task Details</h2>
                                <p><strong>Task Name:</strong> {selectedTask.name}</p>
                                <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>
                                <p><strong>Priority:</strong> {selectedTask.priority}</p>
                                <div className="flex justify-end mt-4">
                                    <button
                                        onClick={closeDetailsModal}
                                        className="px-4 py-2 bg-[#B67A51] text-white rounded-lg hover:bg-[#A56843]"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default TaskTracker;
