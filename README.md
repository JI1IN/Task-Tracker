

---

# Task Tracker

Task Tracker is a simple web application built with **Flask** that helps you manage your to-do tasks. It allows you to **add**, **remove**, and **mark tasks as done**. You can also view tasks and sort them by their due date. Future updates may bring additional features.

## Features

- **Add a Task**: Add tasks with a due date and priority level.
- **View Tasks**: See all tasks with their status (done or not).
- **Mark Task as Done**: Easily mark a task as complete and update its status.
- **Unmark Task**: Move a task back from "done" to the "to-do" list.
- **Simulation**: A simulation of the web app is included.
- **Future Features**: More features may be added in future updates.

## Requirements

- Python 3.7+
- Flask
- Pandas (for sorting tasks)

You can install the required dependencies with:

```bash
pip install Flask pandas
```

## File Structure

The project consists of the following files:

- **app.py**: The main Flask application that handles task management logic.
- **templates/index.html**: The HTML template for the user interface.
- **README.md**: Documentation for the project (you're reading it now).

## How to Use

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/JI1IN/Task-Tracker.git
    cd Task-Tracker
    ```

2. **Run the Application**:

    ```bash
    python app.py
    ```

3. **Access the Application**:

    Open your web browser and navigate to [http://127.0.0.1:5000/](http://127.0.0.1:5000/) to access the app.
    Update (14.11.2024): As of now, routing hasn't been implemented

5. **Interacting with the App**:

    - Use the form to add tasks.
    - The list of tasks will be displayed on the page.
    - Mark tasks as done by checking the checkbox next to each task.

## Example Usage

1. Enter a task name, priority, and due date (in **dd.mm.yyyy** format) into the input fields.
2. Click "Add Task" to submit the form.
3. The task will appear in the list. To mark it as done, check the corresponding checkbox.

## JavaScript Interaction

The app uses JavaScript for certain actions:

- **Adding a Task**: When the form is submitted, a **POST** request sends the new task to the server.
- **Loading Tasks**: Tasks are automatically fetched from the server when the page loads, and after adding a new task.
- **Updating Task Status**: When you check or uncheck a task, a **POST** request is sent to update its status.

## Troubleshooting

- If you encounter errors related to Flask or Pandas, make sure they are properly installed. You can install the dependencies with:

    ```bash
    pip install Flask pandas
    ```

- If the app crashes or behaves unexpectedly, check for syntax or logic errors in the code.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

---

