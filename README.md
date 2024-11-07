
---

# Task Tracker

Task Tracker is a simple Python program to manage your to-do tasks. It allows you to add, remove, and mark tasks as done. You can also view tasks and sort them by their due date.

## Features

- **Add a Task**: Add a task with a due date.
- **Remove a Task**: Remove a task from the to-do or done list.
- **Mark Task as Done**: Move a task from the to-do list to the done list.
- **Unmark Task**: Move a task from the done list back to the to-do list.
- **View Tasks**: View tasks in your to-do, done, or all task lists.
- **Sort Tasks**: Sort tasks by their due date in ascending order for the to-do, done, or all lists.

## Requirements

- Python 3.7+
- Pandas library (for sorting tasks)

You can install the required dependencies by running:

```bash
pip install pandas
```

## File Structure

The project consists of the following files:

- `TaskTracker.py`: Contains the logic for task management.
- `main.py`: Contains the `TaskTracker` class that manages tasks.
- `README.md`: Documentation for the project (you are here).

## How to Use

1. **Clone the repository**:

    ```bash
    git clone https://github.com/JI1IN/task-tracker.git
    cd task-tracker
    ```

2. **Run the program**:

    ```bash
    python task_tracker.py
    ```

3. **Interact with the program**: Once the program is running, you will be prompted to choose an action. The available commands are:

   - **add**: Add a new task to the to-do list.
   - **get**: View all tasks (to-do, done, or both).
   - **remove**: Remove a task from either the to-do or done list.
   - **mark done**: Mark a task as done and move it to the done list.
   - **unmark done**: Move a task back from the done list to the to-do list.
   - **sort todo**: Sort the to-do list by due date.
   - **sort done**: Sort the done list by due date.
   - **sort all**: Sort all tasks by due date.
   - **exit**: Exit the program.

4. **Example**: If you want to add a task, you can type:

    ```
    What task do you want to perform?: add
    Enter a task: Finish report
    Enter a due date (format: dd.mm.yyyy): 10.11.2024
    ```

5. **Sorting Tasks**: You can sort tasks by due date with the following commands:

    ```
    What task do you want to perform?: sort todo
    ```

    This will sort the to-do tasks by their due date in ascending order.

## Code Structure

### `TaskTracker.py`

This file defines the `TaskTracker` class, which manages tasks. It includes methods to add tasks, remove tasks, mark tasks as done, unmark tasks, and retrieve tasks from the to-do and done lists.

### `task_tracker.py`

This file contains functions that interact with the `TaskTracker` class, as well as a simple command-line interface (CLI) loop that allows the user to perform tasks. It handles user input, updates the task lists, and outputs the results to the terminal.

### Methods in the `TaskTracker` class:

- `add_task(task, date)`: Adds a task with a given date to the to-do list.
- `remove_task(task)`: Removes a task from either the to-do or done list.
- `mark_task_done(task)`: Moves a task from the to-do list to the done list.
- `unmark_task_done(task)`: Moves a task from the done list back to the to-do list.
- `get_tasks_not_done()`: Returns the tasks that are not done (to-do list).
- `get_tasks_done()`: Returns the tasks that are done.
- `get_all_tasks()`: Returns all tasks, both to-do and done.

### Functions in `task_tracker.py`:

- `add_to_dict(tracker)`: Prompts the user to enter a task and its due date, and adds it to the tracker.
- `get_tasks_from_dict(tracker)`: Displays all tasks from the tracker.
- `remove_task_from_dict(tracker, task)`: Removes a task from the tracker.
- `mark_task_done(tracker, task)`: Marks a task as done.
- `unmark_task_done(tracker, task)`: Unmarks a task from done.
- `loop(tracker)`: The main loop that runs the CLI, where the user can interact with the task tracker.

## Example Usage

```
Options: add, get, remove, mark done, unmark done, sort task: todo, done, all
What task do you want to perform?: add
Enter a task: Buy groceries
Enter a date (format: dd.mm.yyyy): 15.11.2024

Options: add, get, remove, mark done, unmark done, sort task: todo, done, all
What task do you want to perform?: get
Buy groceries - 15.11.2024
```

## Troubleshooting

- If you see an error related to the `pandas` library, make sure it's installed by running `pip install pandas`.
- If the program crashes or you encounter a bug, check for syntax or logic errors in the input.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
