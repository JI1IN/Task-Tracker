from datetime import datetime
import pandas as pd
from TaskTracker import TaskTracker

# Add priority for tasks, add simple GUI using Tkinter later


def sort_dict(tasks, asc=True):
    if not tasks:
        print("No tasks to sort.")
        return
    sorted_tasks = pd.Series(tasks).sort_values(ascending=asc)
    print(sorted_tasks)


def add_to_dict(tracker):
    user_input = input('Enter a task: ')
    user_input1 = input('Enter a due date (format: dd.mm.yyyy): ')
    date_of_task = datetime.strptime(user_input1, '%d.%m.%Y')
    priority_level = input('Enter a priority level(high, medium, low): ')
    tracker.add_task(user_input, date_of_task, priority_level)


def get_tasks_from_dict(tracker):
    all_tasks = tracker.get_all_tasks()
    for task, date in all_tasks.items():
        print(f'{task} - {date.strftime("%d.%m.%Y")}')


def remove_task_from_dict(tracker, task):
    if task is None:
        print('Task cannot be None')
        return
    if task in tracker.get_tasks_not_done():
        tracker.remove_task(task)
        print(f'Task "{task}" removed from to-do list.')
    elif task in tracker.get_tasks_done():
        tracker.remove_task(task)
        print(f'Task "{task}" removed from done list.')
    else:
        print(f'Task "{task}" not found')


def mark_task_done(tracker, task):
    tracker.mark_task_done(task)
    print(f'Task "{task}" has been marked as done.')


def unmark_task_done(tracker, task):
    tracker.unmark_task_done(task)
    print(f'Task "{task}" has been unmarked from done.')


def loop(tracker):
    try:
        while True:
            print("Options: add, get, remove, mark done, unmark done, get priority, sort task: todo, done, all")
            user_input = input("What task do you want to perform?: ").lower().strip()

            if user_input == 'add':
                add_to_dict(tracker)
            elif user_input == 'get':
                get_tasks_from_dict(tracker)
            elif user_input == 'remove':
                task = input("What task do you want to remove?: ")
                remove_task_from_dict(tracker, task)
            elif user_input == 'mark done':
                task = input("What task do you want to mark as done?: ")
                mark_task_done(tracker, task)
            elif user_input == 'unmark done':
                task = input("What task do you want to unmark as done?: ")
                unmark_task_done(tracker, task)
            elif user_input == "sort todo":
                sort_dict(tracker.get_tasks_not_done(), asc=True)
            elif user_input == "sort done":
                sort_dict(tracker.get_tasks_done(), asc=True)
            elif user_input == "sort all":
                sort_dict(tracker.get_all_tasks(), asc=True)
            elif user_input == "get priority":
                user_input = input("What priority level(high, medium, low): ")
                if user_input == 'high':
                    print(tracker.get_tasks_high_priority())
                elif user_input == 'medium':
                    print(tracker.get_tasks_medium_priority())
                elif user_input == 'low':
                    print(tracker.get_tasks_low_priority())
            else:
                print("Invalid Input, please try again.")
    except KeyboardInterrupt:
        print("User cancelled.")
    except ValueError:
        print("Invalid Input, please try again.")


def main():
    tracker = TaskTracker()
    loop(tracker)


if __name__ == "__main__":
    main()
