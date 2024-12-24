import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './tasktracker.css';

function TaskTracker() {
    const [lists, setLists] = useState([]);
    const [newListTitle, setNewListTitle] = useState('');
    const [newTask, setNewTask] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');
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
        } catch (error) {
            setErrorMessage("Error loading task lists. Please try again.");
        }
    };

    const addList = async (event) => {
        event.preventDefault();
        if (!newListTitle) {
            setErrorMessage("Please enter a list title.");
            return;
        }

        try {
            await axios.post('/api/add_list', { title: newListTitle });
            setNewListTitle('');
            await loadTodoLists();
        } catch (error) {
            setErrorMessage("Error adding list. Please try again.");
        }
    };

    const deleteList = async (listTitle) => {
    try {
        await axios.post('/api/delete_list', { title: listTitle });
        await loadTodoLists();
    } catch (error) {
        setErrorMessage("Error deleting list. Please try again.");
    }
};


    const addTask = async (event) => {
        event.preventDefault();
        if (!newTask || !selectedList || !taskDueDate) {
            setErrorMessage("Please fill in all fields.");
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
                setTaskDueDate('');
                await loadTodoLists();
                closeTaskModal();
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
            console.error('Error updating task status:', error.response ? error.response.data : error.message);
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
            setErrorMessage(error.message || "Error deleting task. Please try again.");
        }
    };

    const closeTaskModal = () => {
        setIsTaskModalOpen(false);
        setNewTask('');
        setTaskDueDate('');
        setTaskPriority('medium');
        setSelectedList('');
    };

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false);
        setSelectedTask(null);
    };

    return (
        <div className="min-h-screen ">
            <header className=" p-6 flex justify-center items-center">
                <h1 className="text-4xl font-semibold">Task Tracker</h1>
            </header>

            <div className="task-container max-w-4xl mx-auto p-6">
                <section className="form-section mb-8">
                    <form className="list-form bg-white p-6 rounded-lg shadow-lg" onSubmit={addList}>
                        <input
                            type="text"
                            value={newListTitle}
                            onChange={(e) => setNewListTitle(e.target.value)}
                            placeholder="New List Title"
                            className="px-4 py-3 mb-4 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-[#F8C794] text-black-900 rounded-lg hover:bg-[#F8C794] hover:text-black-900 transition duration-300"
                        >
                            Add List
                        </button>
                    </form>
                </section>

                {errorMessage && (
                    <div className="text-red-600 text-center mb-4">{errorMessage}</div>
                )}

                <section className="task-list-section mt-8">
                    <div className="task-list-container bg-white p-6 rounded-lg shadow-lg">
                        <ul className="task-list">
                            {lists.map((list) => (
                                <li key={list.title} className="mb-6">
                                    <div
                                        className="list-header font-semibold text-xl flex justify-between items-center">
                <span onClick={() => toggleListExpand(list.title)} className="cursor-pointer">
                    {list.title}
                </span>
                                        <button
                                            onClick={() => deleteList(list.title)}
                                            className="px-4 py-2 bg-[#F8C794] text-black-900 rounded-lg hover:bg-[#F8C794] hover:text-black-900 transition duration-300 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    {list.expanded && (
                                        <ul className="mt-4 space-y-4">
                                            {list.tasks.map((task) => (
                                                <li
                                                    key={task.name}
                                                    className={`task-list-item p-4 rounded-lg border ${
                                                        task.done ? 'bg-green-100 line-through' : 'bg-white'
                                                    } hover:shadow-lg transition duration-300`}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                checked={task.done}
                                                                onChange={(e) => toggleTaskDone(task.name, e.target.checked, list.title)}
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
                                                                onClick={() => handleDelete(list.title, task.name)}
                                                                className="px-4 py-2 bg-[#F8C794] text-black-900 rounded-lg hover:bg-[#F8C794] hover:text-black-900 transition duration-300 text-sm"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>

                    </div>
                </section>
            </div>

            <button
                onClick={() => setIsTaskModalOpen(true)}
                className="fixed bottom-6 right-6 px-6 py-4 bg-[#F8C794] text-black-900 rounded-full shadow-xl hover:bg-[#F8C794] hover:text-black-900 transition duration-300"
            >
                + Add Task
            </button>

            {isDetailsModalOpen && selectedTask && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg w-11/12 sm:w-9/12 md:w-1/3 shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Task Details</h2>
                        <p><strong>Task Name:</strong> {selectedTask.name}</p>
                        <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>
                        <p><strong>Priority:</strong> {selectedTask.priority}</p>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={closeDetailsModal}
                                className="px-4 py-2 bg-[#F8C794] text-black-900 rounded-lg hover:bg-[#F8C794] hover:text-black-900 transition duration-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isTaskModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg w-11/12 sm:w-9/12 md:w-1/3 shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
                        <form onSubmit={addTask}>
                            <div className="mb-4">
                                <label className="block mb-2">Task Name</label>
                                <input
                                    type="text"
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                    className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Due Date</label>
                                <input
                                    type="date"
                                    value={taskDueDate}
                                    onChange={(e) => setTaskDueDate(e.target.value)}
                                    className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Priority</label>
                                <select
                                    value={taskPriority}
                                    onChange={(e) => setTaskPriority(e.target.value)}
                                    className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Select List</label>
                                <select
                                    value={selectedList}
                                    onChange={(e) => setSelectedList(e.target.value)}
                                    className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select a list</option>
                                    {lists.map((list) => (
                                        <option key={list.title} value={list.title}>
                                            {list.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#F8C794] text-black-900 rounded-lg hover:bg-[#F8C794] hover:text-black-900 transition duration-300"
                                >
                                    Add Task
                                </button>
                                <button
                                    type="button"
                                    onClick={closeTaskModal}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskTracker;
