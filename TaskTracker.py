class TaskTracker:
    def __init__(self):
        self.tasks_not_done = {}
        self.tasks_done = {}

    def add_task(self, task, date):
        self.tasks_not_done[task] = date

    def remove_task(self, task):
        if task in self.tasks_not_done:
            del self.tasks_not_done[task]
        elif task in self.tasks_done:
            del self.tasks_done[task]

    def mark_task_done(self, task):
        if task in self.tasks_not_done:
            date = self.tasks_not_done.pop(task)
            self.tasks_done[task] = date
        else:
            print(f'Task "{task}" not found in "to-do" list.')

    def unmark_task_done(self, task):
        if task in self.tasks_done:
            date = self.tasks_done.pop(task)
            self.tasks_not_done[task] = date
        else:
            print(f'Task "{task}" not found in "done" list.')

    def get_tasks_not_done(self):
        return self.tasks_not_done

    def get_tasks_done(self):
        return self.tasks_done

    def get_all_tasks(self):
        all_tasks = {**self.tasks_not_done, **self.tasks_done}
        return all_tasks
