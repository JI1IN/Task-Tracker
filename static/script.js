document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskInput = document.getElementById('task').value;
    const dateInput = document.getElementById('date').value;
    const priorityInput = document.getElementById('priority').value;

    fetch('/add_task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            task: taskInput,
            date: dateInput,
            priority: priorityInput
        })
    }).then(response => response.json())
      .then(data => {
          if (data.success) {
              loadTasks(); // Reload tasks after adding
          }
      });
});

function loadTasks() {
    fetch('/get_tasks')
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = ''; // Clear existing tasks
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleTaskDone('${task.name}', this.checked)">
                    ${task.name} - Due: ${task.date} - Priority: ${task.priority}
                `;
                taskList.appendChild(li);
            });
        });
}

function toggleTaskDone(taskName, isDone) {
    fetch('/update_task_status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            task: taskName,
            done: isDone
        })
    })
}

