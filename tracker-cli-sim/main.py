from datetime import datetime
import pandas as pd
from TaskTracker import TaskTracker


def sort_dict(tasks, asc=True):
    if not tasks:
        print("No tasks to sort.")
        return

    task_series = pd.Series(tasks)
    task_dates = task_series.apply(lambda x: x['date'])
    sorted_task_dates = task_dates.sort_values(ascending=asc)
    sorted_tasks = task_series[sorted_task_dates.index]
    print(sorted_tasks)


def add_to_dict(tracker):
    user_input = input('Enter a task: ')
    user_input1 = input('Enter a due date (format: dd.mm.yyyy): ')
    date_of_task = datetime.strptime(user_input1, '%d.%m.%Y')
    priority_level = input('Enter a priority level(high, medium, low): ')
    tracker.add_task(user_input, date_of_task, priority_level)


def get_tasks_from_dict(tracker):
    all_tasks = tracker.get_all_tasks()
    for task, attributes in all_tasks.items():
        date = attributes['date']
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
            print("Options: add, get, remove, mark done, unmark done,"
                  " get priority, sort task, get tasks: todo, done, all")
            user_input = input("What task do you want to perform?: ").lower().strip()

            match user_input:
                case "add":
                    add_to_dict(tracker)
                case "get":
                    get_tasks_from_dict(tracker)
                case "remove":
                    remove_task_from_dict(tracker, user_input)
                case "mark done":
                    user_input = input("What task do you want to mark as done?: ")
                    mark_task_done(tracker, user_input)
                case "unmark done":
                    user_input = input("What task do you want to unmark as done?: ")
                    unmark_task_done(tracker, user_input)
                case "get priority":
                    user_input = input('Enter a priority level(high, medium, low): ')
                    match user_input:
                        case "high":
                            print(tracker.get_tasks_high_priority())
                        case "medium":
                            print(tracker.get_tasks_med_priority())
                        case "low":
                            print(tracker.get_tasks_low_priority())
                case "sort task":
                    sort_dict(tracker)
                case "get tasks":
                    get_tasks_from_dict(tracker)
                case _:
                    print("Invalid input, try again")
                    continue

    except KeyboardInterrupt:
        print("\nUser cancelled.")
    except ValueError:
        print("Invalid Input, please try again.")


def main():
    tracker = TaskTracker()
    loop(tracker)


if __name__ == "__main__":
    main()
