import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TaskTracker() {
    const [lists, setLists] = useState([]);
    const [newListTitle, setNewListTitle] = useState('');
    const [newTask, setNewTask] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');
    const [taskPriority, setTaskPriority] = useState('medium');
    const [selectedList, setSelectedList] = useState('');

    useEffect(() => {
        loadTodoLists();
    }, []);

    const loadTodoLists = async () => {
        try {
            const response = await axios.get('/api/get_lists');
            console.log("Loaded Lists: ", response.data);  // Log the data received
            setLists(response.data);
        } catch (error) {
            console.error('Error loading todo lists:', error);
        }
    };

    const addList = async (event) => {
        event.preventDefault();
        if (!newListTitle) return;

        try {
            await axios.post('/api/add_list', { title: newListTitle });
            setNewListTitle('');
            loadTodoLists(); // Reload lists after adding a new one
        } catch (error) {
            console.error('Error adding list:', error);
        }
    };

    const addTask = async (event) => {
        event.preventDefault();
        if (!newTask || !selectedList || !taskDueDate) return;

        // Convert the date from YYYY-MM-DD (default date input format) to DD.MM.YYYY
        const formattedDate = new Date(taskDueDate)
            .toLocaleDateString('en-GB')  // Get the date in DD/MM/YYYY format
            .split('/')                  // Split the date by '/'
            .reverse()                    // Reverse the array to get DD.MM.YYYY
            .join('.');                   // Join with '.' separator

        try {
            const response = await axios.post('/api/add_task', {
                task: newTask,
                date: formattedDate, // Send the formatted date
                priority: taskPriority,
                list_title: selectedList,
            });

            if (response.data.success) {
                setNewTask('');
                setTaskDueDate('');
                loadTodoLists(); // Reload lists after adding a new task
            } else {
                console.error('Failed to add task');
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const toggleTaskDone = async (listTitle, taskName, isDone) => {
        try {
            await axios.post('/api/update_task_status', {
                task: taskName,
                done: isDone,
                list_title: listTitle,
            });
            loadTodoLists(); // Reload tasks after updating status
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    return (
        <div>
            <h1>Task Tracker</h1>

            {/* Add List Form */}
            <form onSubmit={addList}>
                <input
                    type="text"
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                    placeholder="New List Title"
                />
                <button type="submit">Add List</button>
            </form>

            {/* List Selection */}
            <select onChange={(e) => setSelectedList(e.target.value)} value={selectedList}>
                <option value="">Select a list</option>
                {lists.map((list) => (
                    <option key={list.title} value={list.title}>
                        {list.title}
                    </option>
                ))}
            </select>

            {/* Add Task Form */}
            <form onSubmit={addTask}>
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
                <button type="submit">Add Task</button>
            </form>

            {/* Task List Display */}
            <ul>
                {lists.map((list) => (
                    <li key={list.title}>
                        <strong>{list.title}</strong>
                        <ul>
                            {list.tasks.map((task) => (
                                <li key={task.name}>
                                    <input
                                        type="checkbox"
                                        checked={task.done}
                                        onChange={(e) => toggleTaskDone(list.title, task.name, e.target.checked)}
                                    />
                                    {task.name} - Due: {task.date} - Priority: {task.priority}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskTracker;
