import React, { useEffect, useState } from 'react';
import '../styles/tasktracker.css';
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
            console.log("Loaded Lists: ", response.data);
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
            loadTodoLists();
        } catch (error) {
            console.error('Error adding list:', error);
        }
    };

    const addTask = async (event) => {
        event.preventDefault();
        if (!newTask || !selectedList || !taskDueDate) return;

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
            loadTodoLists();
        } catch (error) {
            console.error('Error updating task status:', error);
        }
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

                    <select onChange={(e) => setSelectedList(e.target.value)} value={selectedList}>
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

            <section className="task-list-section">
                <div className="task-list-container">
                    <ul className="task-list" id="task-list">
                        {lists.map((list) => (
                            <li key={list.title}>
                                <div className="list-header">
                                    <strong>{list.title}</strong>
                                </div>
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
            </section>
        </div>
 </div>
    );
}

export default TaskTracker;
