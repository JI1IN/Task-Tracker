from flask import Flask, render_template, request, jsonify
from datetime import datetime

app = Flask(__name__)


class TaskTracker:
    def __init__(self):
        self.tasks = []

    def add_task(self, name, due_date, priority):
        self.tasks.append({
            'name': name,
            'date': due_date.strftime('%d.%m.%Y'),
            'priority': priority,
            'done': False
        })

    def get_all_tasks(self):
        return self.tasks

    def update_task_status(self, task_name, done):
        for task in self.tasks:
            if task['name'] == task_name:
                task['done'] = done
                break

tracker = TaskTracker()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/contact')
def contact():
    return render_template('contact.html')


@app.route('/task-tracker')
def tasks_tracker():
    return render_template('app.html')


@app.route('/add_task', methods=['POST'])
def add_task():
    task = request.json.get('task')
    date_str = request.json.get('date')
    priority = request.json.get('priority')
    date_of_task = datetime.strptime(date_str, '%d.%m.%Y')
    print(f"Tracker object: {tracker}")
    tracker.add_task(task, date_of_task, priority)
    return jsonify(success=True)


@app.route('/get_tasks', methods=['GET'])
def get_tasks():
    all_tasks = tracker.get_all_tasks()
    return jsonify(all_tasks)


@app.route('/update_task_status', methods=['POST'])
def update_task_status():
    task = request.json.get('task')
    done = request.json.get('done')
    tracker.update_task_status(task, done)
    return jsonify(success=True)
if __name__ == '__main__':
    app.run(debug=True)