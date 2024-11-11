
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
    git clone https://github.com/JI1IN/Task-Tracker.git
    cd Task-Tracker
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
