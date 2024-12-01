from datetime import datetime
from flask import Flask, jsonify, request, send_from_directory
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

        if not task or not date_str or not priority or not list_title:
            return jsonify({'error': 'Missing required fields'}), 400

        try:
            date_of_task = datetime.strptime(date_str, '%Y.%m.%d')
        except ValueError:
            return jsonify({'error': f"Invalid date format. Expected YYYY.MM.DD, got {date_str}"}), 400

        tracker.add_task_to_list(list_title, task, date_of_task, priority)
        return jsonify(success=True)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/get_lists', methods=['GET'])
def get_lists():
    return jsonify(tracker.get_all_lists())


@app.route('/api/update_task_status', methods=['POST'])
def update_task_status():
    task_name = request.json.get('task')
    done = request.json.get('done')
    list_title = request.json.get('list_title')

    success = tracker.update_task_status(list_title, task_name, done)

    if success:
        return jsonify(success=True)
    else:
        return jsonify({'error': 'Failed to update task status'}), 400


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
