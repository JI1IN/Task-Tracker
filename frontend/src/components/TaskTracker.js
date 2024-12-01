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
    const [selectedTask, setSelectedTask] = useState(null);  // Track the selected task for detailed view

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

            // Update the local state immediately after the backend update
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
        setSelectedTask(task);  // Open the task in subwindow
    };

    const closeTaskSubwindow = () => {
        setSelectedTask(null);  // Close the subwindow
    };

    return (
        <div>
            <header>
                <h1>Task Tracker</h1>
            </header>

            <div className="task-container">
                <section className="form-section">
                    <form className="list-form" onSubmit={addList}>
                        <input
                            type="text"
                            value={newListTitle}
                            onChange={(e) => setNewListTitle(e.target.value)}
                            placeholder="New List Title"
                        />
                        <button type="submit">Add List</button>
                    </form>

                    <form className="task-form" onSubmit={addTask}>
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="New Task"
                        />
                        <input
                            type="date"
                            value={taskDueDate}
                            onChange={(e) => setTaskDueDate(e.target.value)}
                        />
                        <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)}>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>

                        <label htmlFor="listSelect">Select a List</label>
                        <select
                            id="listSelect"
                            value={selectedList}
                            onChange={(e) => setSelectedList(e.target.value)}
                        >
                            <option value="">Select a list</option>
                            {lists.map((list) => (
                                <option key={list.title} value={list.title}>
                                    {list.title}
                                </option>
                            ))}
                        </select>

                        <button type="submit">Add Task</button>
                    </form>
                </section>

                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <section className="task-list-section">
                    <div className="task-list-container">
                        <ul className="task-list">
                            {lists.map((list) => (
                                <li key={list.title}>
                                    <div className="list-header" onClick={() => toggleListExpand(list.title)}>
                                        <strong>{list.title}</strong>
                                    </div>
                                    {list.expanded && (
                                        <ul>
                                            {list.tasks.map((task) => (
                                                <li key={task.name} className={task.done ? 'task-done' : ''}>
                                                    <input
                                                        type="checkbox"
                                                        checked={task.done}
                                                        onChange={(e) =>
                                                            toggleTaskDone(task.name, e.target.checked, list.title)
                                                        }
                                                    />
                                                    {task.name} - Priority: <span className={`priority-${task.priority}`}>{task.priority}</span>

                                                    {/* Show Details Button */}
                                                    <button onClick={() => handleShowDetails(task)}>Show Details</button>
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
                    <div className="task-subwindow">
                        <div className="task-subwindow-content">
                            <button className="close-btn" onClick={closeTaskSubwindow}>X</button>
                            <h2>{selectedTask.name}</h2>
                            <p><strong>Due Date:</strong> {selectedTask.date}</p>
                            <p><strong>Priority:</strong> {selectedTask.priority}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TaskTracker;
