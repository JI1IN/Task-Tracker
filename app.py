
from flask import Flask, render_template, request, jsonify
from TaskTracker import TaskTracker
from datetime import datetime

app = Flask(__name__)
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


@app.route('/add_task', methods=['POST'])
def add_task():
    task = request.json.get('task')
    date_str = request.json.get('date')
    priority = request.json.get('priority')
    date_of_task = datetime.strptime(date_str, '%d.%m.%Y')
    tracker.add_task(task, date_of_task, priority)
    return jsonify(success=True)


@app.route('/get_tasks', methods=['GET'])
def get_tasks():
    all_tasks = tracker.get_all_tasks()
    return jsonify(all_tasks)


@app.route('/remove_task', methods=['POST'])
def remove_task():
    task = request.json.get('task')
    tracker.remove_task(task)
    return jsonify(success=True)


@app.route('/mark_done', methods=['POST'])
def mark_done():
    task = request.json.get('task')
    tracker.mark_task_done(task)
    return jsonify(success=True)


@app.route('/unmark_done', methods=['POST'])
def unmark_done():
    task = request.json.get('task')
    tracker.unmark_task_done(task)
    return jsonify(success=True)

if __name__ == '__main__':
    app.run(debug=True)