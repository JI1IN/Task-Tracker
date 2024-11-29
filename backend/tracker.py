from datetime import datetime


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
                    'date': due_date.strftime('%Y.%m.%d'),
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

    def remove_task(self, list_title, task_name):
        for todo_list in self.lists:
            if todo_list['title'] == list_title:
                todo_list['tasks'] = [task for task in todo_list['tasks'] if task['name'] != task_name]
                break

    def get_tasks_not_done(self, list_title):
        for todo_list in self.lists:
            if todo_list['title'] == list_title:
                return [task for task in todo_list['tasks'] if not task['done']]
        return []

    def get_tasks_done(self, list_title):
        for todo_list in self.lists:
            if todo_list['title'] == list_title:
                return [task for task in todo_list['tasks'] if task['done']]
        return []

    def get_tasks_by_priority(self, list_title, priority):
        for todo_list in self.lists:
            if todo_list['title'] == list_title:
                return [task for task in todo_list['tasks'] if task['priority'] == priority]
        return []

    def get_all_tasks(self, list_title):
        for todo_list in self.lists:
            if todo_list['title'] == list_title:
                return todo_list['tasks']
        return []