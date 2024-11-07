from datetime import datetime
from TaskTracker import TaskTracker


tracker = TaskTracker()


def add_to_list():
    global tracker
    uinput = input('Enter a task: ')
    u1input = input('Enter a date(format: dd.mm.yyyy): ')
    date_of_task = datetime.strptime(u1input, '%d.%m.%Y')
    tracker.add_task(uinput, date_of_task)


def get_tasks_from_list():
    global tracker
    for tasks, date in tracker.get_tasks().items():
        print(tasks, date)


def remove_task_from_list(task):
    global tracker
    if task is None:
        print('Task cannot be None')
    for tasks in tracker.get_tasks():
        if task == tasks:
            tracker.remove_task(task)
            print('Task removed')


def main():
    try:
        while True:
            print("add, get, remove tasks")
            user_input = input("What task do you want to perform?: ")
            if user_input == 'add':
                add_to_list()
            elif user_input == 'get':
                get_tasks_from_list()
            elif user_input == 'remove':
                user_input = input("What task do you want to remove?: ")
                remove_task_from_list(user_input)

    except ValueError:
        print('Invalid input')
    except KeyboardInterrupt:
        print('\nClosing program...')
if __name__ == "__main__":
    main()
