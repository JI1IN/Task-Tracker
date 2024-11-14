document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const task = document.getElementById('task').value;
    const date = document.getElementById('date').value;
    const priority = document.getElementById('priority').value;

    fetch('/add_task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task, date, priority })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadTasks();
            document.getElementById('task-form').reset();
        }
    });
});

document.getElementById('mark-done-btn').addEventListener('click', function() {
    const task = document.getElementById('mark-task').value;

    fetch('/mark_done', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadTasks();
            document.getElementById('mark-task').value = '';
        }
    });
});

document.getElementById('remove-task-btn').addEventListener('click', function() {
    const task = document.getElementById('remove-task').value;

    fetch('/remove_task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadTasks();
            document.getElementById('remove-task').value = '';
        }
    });
});

function loadTasks() {
    fetch('/get_tasks')
    .then(response => response.json())
    .then(tasks => {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        for (const [task, attributes] of Object.entries(tasks)) {
            const listItem = document.createElement('li');
            listItem .textContent = `${task} - Due: ${attributes.date}, Priority: ${attributes.priority}, Done: ${attributes.done ? 'Yes' : 'No'}`;
            taskList.appendChild(listItem);
        }
    });
}

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);