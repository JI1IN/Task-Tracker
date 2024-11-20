from flask import Flask, render_template, request, jsonify
from datetime import datetime

app = Flask(__name__)


class TaskTracker:
    def __init__(self):
        self.lists = []

    def add_list(self, list_title):
        self.lists.append({
            'title': list_title,
            'tasks': []
        })

    def add_task_to_list(self, list_title, task_name, due_date, priority):
        for todo_list in self.lists:
            if todo_list['title'] == list_title:
                todo_list['tasks'].append({
                    'name': task_name,
                    'date': due_date.strftime('%d.%m.%Y'),
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
                        break

tracker = TaskTracker()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/task-tracker')
def tasks_tracker():
    return render_template('app.html')


@app.route('/add_list', methods=['POST'])
def add_list():
    list_title = request.json.get('title')
    tracker.add_list(list_title)
    return jsonify(success=True)


@app.route('/add_task', methods=['POST'])
def add_task():
    task = request.json.get('task')
    date_str = request.json.get('date')
    priority = request.json.get('priority')
    list_title = request.json.get('list_title')
    date_of_task = datetime.strptime(date_str, '%d.%m.%Y')
    tracker.add_task_to_list(list_title, task, date_of_task, priority)
    return jsonify(success=True)


@app.route('/get_lists', methods=['GET'])
def get_lists():
    all_lists = tracker.get_all_lists()
    return jsonify(all_lists)


@app.route('/update_task_status', methods=['POST'])
def update_task_status():
    task = request.json.get('task')
    done = request.json.get('done')
    list_title = request.json.get('list_title')
    tracker.update_task_status(list_title, task, done)
    return jsonify(success=True)

if __name__ == '__main__':
    app.run(debug=True)
