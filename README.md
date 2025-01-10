# TaskMaster

## Overview
TaskMaster is a web-based application built using Flask and React to help users manage and organize tasks. It allows users to create task lists, add tasks with due dates and priorities, mark tasks as completed, and delete tasks. The app features a simple and user-friendly interface to manage tasks efficiently.

## Features
- **Create Task Lists**: Users can create multiple task lists to organize their tasks.
- **Add Tasks**: Users can add tasks with a title, due date, priority level (High, Medium, Low), and associate them with a specific task list.
- **Task Status**: Tasks can be marked as completed or pending. 
- **Delete Tasks**: Users can delete tasks from any list.
- **Delete Lists**: Users can delete lists that they deem as not needed.
## Tech Stack
- **Backend**: Flask (Python web framework)
- **Frontend**: React (JavaScript library for building user interfaces),
- **Database**: In-memory list storage (no external database)
> **Comment: *Databases in process* (feature under development)
> 
## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
- Python 3.x
- Node.js (for React development)
- npm (Node package manager)

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/JI1IN/Task-Tracker
   cd Task-Tracker
   ```

2. **Install backend dependencies**:
   - Navigate to the backend folder.
   - Install Python dependencies using `pip`:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Install frontend dependencies**:
   - Navigate to the frontend folder.
   - Install React app dependencies using `npm`:
   ```bash
   cd frontend
   npm install
   ```

4. **Running the app**:
   - **Backend**:
     In the backend folder, start the Flask server:
     ```bash
     cd backend
     python app.py
     ```

   - **Frontend**:
     In the frontend folder, start the React development server:
     ```bash
     cd frontend
     npm start
     ```

   The app will be accessible at `http://localhost:3000`.

## API Endpoints

The backend exposes the following RESTful API endpoints:

- **POST /api/add_list**: Adds a new task list.
  
- **GET /api/get_lists**: Fetches all task lists with their respective tasks.

- **DELETE /api/delete_list**: Deletes a list.
    
- **POST /api/add_task**: Adds a new task to a specific list.
  
- **POST /api/delete_task**: Deletes a task from a list.

- **POST /api/update_task_status**: Updates the status of a task (done or not done).


## Frontend Features

The frontend, built using React, includes the following components:
- **Task List**: Displays a list of tasks within each task list. Users can expand/collapse lists and check/uncheck tasks.
- **Task Form**: Allows users to add new tasks and task lists.
- **Task Details**: Shows detailed information about a task (name, due date, priority).
- **Error Message**: Displays error messages for incomplete fields or failed actions.

## UI Layout

1. **Task Lists View**: 
   - Task lists are displayed with their respective tasks. Tasks can be marked as done or pending using checkboxes.
   - Task details can be viewed by clicking on a "Show Details" button for each task.

2. **Task and List Creation**:
   - Users can create new task lists and tasks using forms.
   - Task forms allow setting a due date, priority, and selecting the list the task belongs to.

3. **Delete Tasks and Lists**:
   - Users can delete tasks from a list by clicking the "Delete" button next to each task.
   - Users can delete lists by clicking the "Delete" Button next to the list name.

## Styling

The app uses custom CSS for styling the task lists, forms, and other UI elements to ensure a clean and simple layout. 

## Future Improvements
- Integrate with a database (e.g., SQLite or PostgreSQL) for persistent data storage.
- Add user authentication (login/signup) for task list management.
- Implement sorting and filtering features for tasks (e.g., by due date or priority).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
- [Flask](https://flask.palletsprojects.com/) for the backend framework.
- [React](https://reactjs.org/) for the frontend framework.
