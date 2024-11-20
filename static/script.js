// Add event listeners for adding new lists and tasks (in case you're handling them dynamically)
    document.getElementById('list-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const listTitle = document.getElementById('list-title').value;

        fetch('/add_list', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: listTitle })
        }).then(response => response.json())
          .then(data => {
              if (data.success) {
                  loadTodoLists(); // Reload lists after adding a new one
              }
          });
    });

    document.getElementById('task-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const taskInput = document.getElementById('task').value;
        const dateInput = document.getElementById('date').value;
        const priorityInput = document.getElementById('priority').value;
        const listTitle = document.getElementById('list-select').value;

        fetch('/add_task', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                task: taskInput,
                date: dateInput,
                priority: priorityInput,
                list_title: listTitle
            })
        }).then(response => response.json())
          .then(data => {
              if (data.success) {
                  loadTasksForList(listTitle); // Reload tasks for the selected list
              }
          });
    });

    // Load the to-do lists and display them
    function loadTodoLists() {
        fetch('/get_lists')
            .then(response => response.json())
            .then(lists => {
                const todoListContainer = document.getElementById('todo-list');
                const listSelect = document.getElementById('list-select');
                todoListContainer.innerHTML = ''; // Clear the list
                listSelect.innerHTML = ''; // Clear the select options

                lists.forEach(list => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <strong>${list.title}</strong>
                        <button onclick="toggleTaskVisibility('${list.title}')">Show Tasks</button>
                        <ul id="tasks-${list.title}" class="task-list" style="display: none;"></ul>
                    `;
                    todoListContainer.appendChild(listItem);

                    // Add to the dropdown list for task creation
                    const option = document.createElement('option');
                    option.value = list.title;
                    option.textContent = list.title;
                    listSelect.appendChild(option);

                    // Load tasks for this list
                    loadTasksForList(list.title);
                });
            });
    }

    // Load tasks for a specific to-do list
    function loadTasksForList(listTitle) {
        fetch('/get_lists')
            .then(response => response.json())
            .then(lists => {
                const taskListContainer = document.getElementById(`tasks-${listTitle}`);
                taskListContainer.innerHTML = ''; // Clear the task list

                const selectedList = lists.find(list => list.title === listTitle);
                if (selectedList) {
                    selectedList.tasks.forEach(task => {
                        const li = document.createElement('li');
                        li.innerHTML = `
                            <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleTaskDone('${listTitle}', '${task.name}', this.checked)">
                            ${task.name} - Due: ${task.date} - Priority: ${task.priority}
                        `;
                        taskListContainer.appendChild(li);
                    });
                }
            });
    }

    // Function to toggle visibility of the task list under each to-do list
    function toggleTaskVisibility(listTitle) {
        const taskList = document.getElementById(`tasks-${listTitle}`);
        const button = event.target;

        // Toggle the display property to show or hide the tasks
        if (taskList.style.display === "none" || taskList.style.display === "") {
            taskList.style.display = "block";
            button.textContent = "Hide Tasks";
        } else {
            taskList.style.display = "none";
            button.textContent = "Show Tasks";
        }
    }

    // Toggle task completion status
    function toggleTaskDone(listTitle, taskName, isDone) {
        fetch('/update_task_status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                task: taskName,
                done: isDone,
                list_title: listTitle
            })
        }).then(response => response.json())
          .then(data => {
              if (data.success) {
                  loadTasksForList(listTitle); // Reload tasks after updating the completion status
              }
          });
    }

    // Initial load of to-do lists
    loadTodoLists();