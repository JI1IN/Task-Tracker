class TaskTracker:
    def __init__(self):
        self.tasks = {}

    def add_task(self, task, date):
        self.tasks[task] = date

    def remove_task(self, task):
        self.tasks.pop(task)

    def get_tasks(self):
        return self.tasks

