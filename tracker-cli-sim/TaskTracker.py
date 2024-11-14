class TaskTracker:
    def __init__(self):
        self.tasks_not_done = {}
        self.tasks_done = {}

    def add_task(self, task, date, priority):
        self.tasks_not_done[task] = {
            'date': date,
            'priority': priority
        }

    def set_priority(self, task, priority):
        if task in self.tasks_not_done:
            self.tasks_done[task]['priority'] = priority
        elif task in self.tasks_not_done:
            self.tasks_not_done[task]['priority'] = priority

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

    def get_tasks_high_priority(self):
        dict_high = {}
        for task, attributes in self.tasks_not_done.items():
            if attributes["priority"] == "high":
                dict_high[task] = attributes
        return dict_high

    def get_tasks_med_priority(self):
        dict_med = {}
        for task, attributes in self.tasks_not_done.items():
            if attributes["priority"] == "medium":
                dict_med[task] = attributes
        return dict_med

    def get_tasks_low_priority(self):
        dict_low = {}
        for task, attributes in self.tasks_not_done.items():
            if attributes["priority"] == "low":
                dict_low[task] = attributes
        return dict_low

    def get_all_tasks(self):
        all_tasks = {**self.tasks_not_done, **self.tasks_done}
        return all_tasks
