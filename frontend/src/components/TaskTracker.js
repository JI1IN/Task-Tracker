import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/tasktracker.css';

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
    const [expandedTask, setExpandedTask] = useState(null);

    useEffect(() => {
        loadTodoLists();
    }, []);

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

            // Optimistic UI update...
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

    const handleDelete = async (taskName, listTitle) => {
        try {
            await axios.post('/api/delete_task', { title: listTitle, task: taskName });
            await loadTodoLists();
        } catch (error) {
            setErrorMessage(error);
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
        <div className="min-h-screen bg-gray-100">
            <header className="bg-600 p-6 flex justify-start md:justify-center items-center w-full">
                <h1 className="text-4xl font-bold">Tracker</h1>
            </header>

            <div className="task-container max-w-4xl mx-auto p-4">
                <section className="form-section mb-8">
                    <form className="list-form flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md"
                          onSubmit={addList}>
                        <input
                            type="text"
                            value={newListTitle}
                            onChange={(e) => setNewListTitle(e.target.value)}
                            placeholder="New List Title"
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Add List
                        </button>
                    </form>
                </section>

                {errorMessage && <div className="text-red-600 text-center">{errorMessage}</div>}

                <section className="task-list-section mt-8">
                    <div className="task-list-container bg-white p-6 rounded-lg shadow-md">
                        <ul className="task-list">
                            {lists.map((list) => (
                                <li key={list.title} className="mb-6">
                                    <div
                                        className="list-header font-semibold text-xl cursor-pointer"
                                        onClick={() => toggleListExpand(list.title)}
                                    >
                                        {list.title}
                                    </div>
                                    {list.expanded && (
                                        <ul>
                                            {list.tasks.map((task) => (
                                                <li
                                                    key={task.name}
                                                    className={`task-list-item p-4 mb-4 border border-gray-300 rounded-lg ${task.done ? 'bg-green-100 line-through' : 'bg-white'}`}
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
                                                                className="cursor-pointer"
                                                                onClick={() => handleShowDetails(task)}
                                                            >
                                                                {task.name}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className={`mt-4 pl-4 ${expandedTask === task.name ? 'block' : 'hidden'}`}>
                                                        <div className="flex flex-col space-y-2">
                                                            <span className={`text-${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}-600`}>
                                                                Priority: {task.priority}
                                                            </span>
                                                            <div className="flex space-x-4">
                                                                <button
                                                                    onClick={() => handleShowDetails(task)}
                                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-sm"
                                                                >
                                                                    Show Details
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(task.name, list.title)}
                                                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 text-sm"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
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
                className="fixed bottom-4 right-4 px-6 py-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300 shadow-lg"
            >
                + Add Task
            </button>

            {isDetailsModalOpen && selectedTask && (
                <div
                    className="task-details-modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="task-details-modal-content bg-white p-8 rounded-lg w-1/3 shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Task Details</h2>
                        <p><strong>Task Name:</strong> {selectedTask.name}</p>
                        <p><strong>Priority:</strong> {selectedTask.priority}</p>
                        <p><strong>Due Date:</strong> {selectedTask.dueDate || selectedTask.date}</p>
                        <p><strong>Status:</strong> {selectedTask.done ? 'Completed' : 'Pending'}</p>
                        <button
                            onClick={closeDetailsModal}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {isTaskModalOpen && (
                <div
                    className="task-modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="task-modal-content bg-white p-8 rounded-lg w-11/12 sm:w-9/12 md:w-1/3 shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Add Task</h2>
                        <form onSubmit={addTask}>
                            <input
                                type="text"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                placeholder="Task Name"
                                className="px-4 py-2 border border-gray-300 rounded-lg w-full mb-4"
                            />
                            <input
                                type="date"
                                value={taskDueDate}
                                onChange={(e) => setTaskDueDate(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg w-full mb-4"
                            />
                            <select
                                value={taskPriority}
                                onChange={(e) => setTaskPriority(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg w-full mb-4"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>

                            <select
                                value={selectedList}
                                onChange={(e) => setSelectedList(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg w-full mb-4"
                            >
                                <option value="">Select List</option>
                                {lists.map((list) => (
                                    <option key={list.title} value={list.title}>
                                        {list.title}
                                    </option>
                                ))}
                            </select>

                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg w-full"
                            >
                                Add Task
                            </button>
                        </form>
                        <button
                            onClick={closeTaskModal}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskTracker;
