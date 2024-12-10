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
            loadTodoLists();
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
                loadTodoLists();
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
            console.error('Error updating task status:', error);
        }
    };

    const toggleListExpand = (listTitle) => {
        setLists(lists.map((list) =>
            list.title === listTitle ? { ...list, expanded: !list.expanded } : list
        ));
    };

    const handleShowDetails = (task) => {
        setSelectedTask(task);
    };

    const handleDelete = async (taskName, listTitle) => {
        try {
            await axios.post('/api/delete_task', { title: listTitle, task: taskName });
            loadTodoLists();
        } catch (error) {
            setErrorMessage(error);
        }
    };

    const closeTaskSubwindow = () => {
        setSelectedTask(null);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white p-6 text-center">
                <h1 className="text-4xl font-bold">Task Tracker</h1>
            </header>

            <div className="task-container max-w-4xl mx-auto p-4">
                <section className="form-section mb-8">
                    <form className="list-form flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md" onSubmit={addList}>
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

                    <form className="task-form flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md mt-8" onSubmit={addTask}>
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="New Task"
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="date"
                            value={taskDueDate}
                            onChange={(e) => setTaskDueDate(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            value={taskPriority}
                            onChange={(e) => setTaskPriority(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>

                        <label htmlFor="listSelect" className="text-sm">Select a List</label>
                        <select
                            id="listSelect"
                            value={selectedList}
                            onChange={(e) => setSelectedList(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select a list</option>
                            {lists.map((list) => (
                                <option key={list.title} value={list.title}>
                                    {list.title}
                                </option>
                            ))}
                        </select>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Add Task
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
                                                            <span>{task.name}</span> - Priority: <span className={`text-${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}-600`}>{task.priority}</span>
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            <button
                                                                onClick={() => handleShowDetails(task)}
                                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                                                            >
                                                                Show Details
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(task.name, list.title)}
                                                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
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

                {selectedTask && (
                    <div className="task-subwindow fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="task-details bg-white p-8 rounded-lg w-1/3 shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4">{selectedTask.name}</h2>
                            <p><strong>Due Date:</strong> {selectedTask.due_date}</p>
                            <p><strong>Priority:</strong> {selectedTask.priority}</p>
                            <button
                                onClick={closeTaskSubwindow}
                                className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TaskTracker;
