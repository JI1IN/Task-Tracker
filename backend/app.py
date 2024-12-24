from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

class TaskTracker:
    def __init__(self):
        self.lists = []

    def add_list(self, list_title):
        original_title = list_title
        index = 1
        # Ensure unique list title
        while any(l['title'] == list_title for l in self.lists):
            list_title = f"{original_title} ({index})"
            index += 1
        self.lists.append({
            'title': list_title,
            'tasks': [],
            'expanded': False
        })

    def add_task_to_list(self, list_title, task_name, due_date, priority):
        for todo_list in self.lists:
            if todo_list['title'] == list_title:
                original_task_name = task_name
                index = 1
                # Ensure unique task name within the list
                while any(task['name'] == task_name for task in todo_list['tasks']):
                    task_name = f"{original_task_name} ({index})"
                    index += 1
                todo_list['tasks'].append({
                    'name': task_name,
                    'dueDate': due_date.strftime('%Y.%m.%d'),
                    'priority': priority,
                    'done': False
                })
                break

    def get_all_lists(self):
        return self.lists

    def update_task_status(self, list_title, task_name, done):
        for todo_list in self.lists:
            if todo_list['title'] == list_title:
                for task in todo_list['tasks']:
                    if task['name'] == task_name:
                        task['done'] = done
                        return True
        return False

    def remove_task(self, list_title, task_name):
        for todo_list in self.lists:
            if todo_list['title'] == list_title:
                todo_list['tasks'] = [task for task in todo_list['tasks'] if task['name'] != task_name]
                return True
        return False

tracker = TaskTracker()


@app.route('/api/get_lists', methods=['GET'])
def get_lists():
    return jsonify(tracker.get_all_lists()), 200


@app.route('/api/add_list', methods=['POST'])
def add_list():
    title = request.json.get('title')
    if title:
        tracker.add_list(title)
        return jsonify({'success': True}), 201
    return jsonify({'error': 'Missing title'}), 400


@app.route('/api/add_task', methods=['POST'])
def add_task():
    task_name = request.json.get('task')
    due_date = request.json.get('date')
    priority = request.json.get('priority')
    list_title = request.json.get('list_title')

    if task_name and due_date and priority and list_title:
        tracker.add_task_to_list(list_title, task_name, datetime.strptime(due_date, '%Y.%m.%d'), priority)
        return jsonify({'success': True}), 201
    return jsonify({'error': 'Missing required fields'}), 400


@app.route('/api/update_task_status', methods=['POST'])
def update_task_status():
    task_name = request.json.get('task')
    done = request.json.get('done')
    list_title = request.json.get('list_title')

    if not task_name or done is None or not list_title:
        return jsonify({'error': 'Missing required fields'}), 400

    success = tracker.update_task_status(list_title, task_name, done)

    if success:
        return jsonify(success=True)
    else:
        return jsonify({'error': 'Failed to update task status'}), 400


@app.route('/api/delete_task', methods=['POST'])
def delete_task():
    task_name = request.json.get('task')
    list_title = request.json.get('title')

    if not task_name or not list_title:
        return jsonify({'error': 'Missing required fields'}), 400

    success = tracker.remove_task(list_title, task_name)
    if success:
        return jsonify({'success': True})
    else:
        return jsonify({'error': 'Task not found'}), 400

if __name__ == '__main__':
    app.run(debug=True)
