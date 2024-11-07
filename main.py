from datetime import datetime
from TaskTracker import TaskTracker
import pandas as pd

tracker = TaskTracker()


def sort_dict(asc):
    global tracker
    tasks = tracker.get_tasks()
    if tasks is None or len(tasks) == 0:
        print("Nothing to sort")
    if asc is True:
        sorted_dict = pd.Series(tasks).sort_values(ascending=True)
    else:
        sorted_dict = pd.Series(tasks).sort_values(ascending=False)
    print(sorted_dict)


def add_to_dict():
    global tracker
    user_input = input('Enter a task: ')
    user_input1 = input('Enter a date(format: dd.mm.yyyy): ')
    date_of_task = datetime.strptime(user_input1, '%d.%m.%Y')
    tracker.add_task(user_input, date_of_task)


def get_tasks_from_dict():
    global tracker
    for tasks, date in tracker.get_tasks().items():
        print(tasks, date)


def remove_task_from_dict(task):
    global tracker
    if task is None:
        print('Task cannot be None')
        return

    tasks = tracker.get_tasks()
    if task in tasks:
        tracker.remove_task(task)
        print(f'Task "{task}" removed')
    else:
        print(f'Task "{task}" not found')


def Loop():
    while True:
        print("add, get, remove, sort tasks")
        user_input = input("What task do you want to perform?: ")
        user_input = user_input.lower().strip()
        if user_input == 'add':
            add_to_dict()
        elif user_input == 'get':
            get_tasks_from_dict()
        elif user_input == 'remove':
            user_input = input("What task do you want to remove?: ")
            remove_task_from_dict(user_input)
        elif user_input == "sort":
            user_input = input("Sort tasks in ascending order or descending order? (asc or desc): ")
            if user_input == 'asc':
                sort_dict(asc=True)
            else:
                sort_dict(asc=False)
        else:
            print("Invalid Input, please try again")


def main():
    try:
        Loop()
    except ValueError:
        print('Invalid input')
    except KeyboardInterrupt:
        print('\nClosing program...')
if __name__ == "__main__":
    main()
