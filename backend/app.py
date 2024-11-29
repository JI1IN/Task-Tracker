from flask import Flask, jsonify, request, send_from_directory
from datetime import datetime
from tracker import TaskTracker

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
tracker = TaskTracker()


@app.route('/api/add_list', methods=['POST'])
def add_list():
    list_title = request.json.get('title')
    tracker.add_list(list_title)
    return jsonify(success=True)


@app.route('/api/add_task', methods=['POST'])
def add_task():
    try:
        task = request.json.get('task')
        date_str = request.json.get('date')
        priority = request.json.get('priority')
        list_title = request.json.get('list_title')

        print(f"Received task: {task}, date: {date_str}, priority: {priority}, list_title: {list_title}")

        if not task or not date_str or not priority or not list_title:
            return jsonify({'error': 'Missing required fields'}), 400

        try:
            date_of_task = datetime.strptime(date_str, '%Y.%m.%d')
        except ValueError:
            return jsonify({'error': f"Invalid date format. Expected YYYY.MM.DD, got {date_str}"}), 400

        # Add the task to the tracker
        tracker.add_task_to_list(list_title, task, date_of_task, priority)
        return jsonify(success=True)
    except Exception as e:
        # Handle unexpected errors
        print(f"Unexpected error: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/get_lists', methods=['GET'])
def get_lists():
    all_lists = tracker.get_all_lists()
    return jsonify(all_lists)


@app.route('/api/update_task_status', methods=['POST'])
def update_task_status():
    task = request.json.get('task')
    done = request.json.get('done')
    list_title = request.json.get('list_title')
    tracker.update_task_status(list_title, task, done)
    return jsonify(success=True)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(debug=True)
