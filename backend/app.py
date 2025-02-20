import json
from sqlite3 import IntegrityError
import sqlite3
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, LoginManager, login_user, login_required, logout_user, current_user
from flask_marshmallow import Marshmallow # install marshmallow-sqlalchemy too
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select
from datetime import datetime, timedelta
import bcrypt

app = Flask(__name__)

# TODO configure to be more secure
app.config['SESSION_PERMANENT'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///userdata.db' 
app.config["SESSION_COOKIE_NAME"] = "my_session"
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SECURE"] = False  # True if using HTTPS
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"  
app.config["REMEMBER_COOKIE_DURATION"] = timedelta(days=7)  # Keep session alive
app.config["SECRET_KEY"] = "your_secret_key"  # Ensure it's set

login_manager = LoginManager()
login_manager.init_app(app)

CORS(app, supports_credentials=True, origins=["http://localhost:3000"])
db = SQLAlchemy(app)
ma = Marshmallow(app)

class User(UserMixin, db.Model):
    __tablename__ = 'user'
    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    password_salt = db.Column(db.String(255), nullable=False)
    
    # Define relationship with tasklist
    tasklists = db.relationship('Tasklist', backref='user', lazy=True)
    def get_id(self):
        return self.user_id
   

class Tasklist(db.Model):
    __tablename__ = 'tasklist'
    tasklist_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    title = db.Column(db.String, nullable=False)
    
    # Define relationship with tasks
    tasks = db.relationship('Task', backref='tasklist', lazy=True)

class Task(db.Model):
    __tablename__ = 'task'
    task_id = db.Column(db.Integer, primary_key=True)
    tasklist_id = db.Column(db.Integer, db.ForeignKey('tasklist.tasklist_id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    due_date = db.Column(db.Date)
    priority = db.Column(db.String(16))
    done = db.Column(db.Boolean, default=False)

# some things that help serialise to json, for responses
class TasklistSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Tasklist
        include_relationships = True  
        load_instance = True  

class TaskSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Task
        include_fk = True  
        load_instance = True


@login_manager.user_loader
def load_user(user_id):
    return User.query.filter_by(user_id=user_id).first()


@app.route('/register', methods=['POST'])
def register():
    try:
        email = request.json.get('email')
        password = request.json.get('password')  # pwd alr a str
        salt = bcrypt.gensalt()                # gensalt() returns a str in python_bcrypt
        hash = bcrypt.hashpw(password.encode('utf-8'), salt)    # pass pwd as a str

        user = User(
            email=email,
            password_salt=salt,
            password_hash=hash
        )
        db.session.add(user)
        db.session.commit()
        login_user(user, remember=True)
        session.modified = True
    except IntegrityError:
        return jsonify({'error': 'Email already in use'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    return jsonify({'success': True}), 200


@app.route('/login', methods=['POST'])
def login():
    try:
        email = request.json.get('email')
        password = request.json.get('password')  # Already a str
        user = User.query.filter_by(email=email).first()
        if user:
            salt = user.password_salt       # Stored as a str
            stored_hash = user.password_hash # Stored as a str
            input_hash = bcrypt.hashpw(password.encode('utf-8'), salt)  # Use the password str
            if input_hash == stored_hash:
                login_user(user, remember=True)
                session.modified = True
                return jsonify({'success': True}), 200
        return jsonify({'error': 'Wrong email or password'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/get_lists', methods=['GET'])
@login_required
def get_lists():
    print(session)
    try:
        tasklists_from_db = Tasklist.query.filter_by(user_id=current_user.get_id())
        tasklists_serialised = TasklistSchema(many=True).dumps(tasklists_from_db)
        return tasklists_serialised, 200
    except Exception as e:
        return jsonify({'error' : str(e)}), 400
        

@app.route('/delete_list', methods=['POST'])
@login_required
def delete_list():
    title = request.json.get('title')
    if not title:
        return jsonify({'error': 'Missing title'}), 400
    Tasklist.query.filter_by(title=title, user_id=current_user.get_id()).delete()
    db.session.commit()

    return jsonify({'success': True}), 200

@app.route('/add_list', methods=['POST'])
@login_required
def add_list():
    print(current_user.get_id())
    print(session)
    list_title = request.json.get('title')
    
    if not list_title or list_title.isspace():
        return jsonify({'error': 'Missing title'}), 400
    elif db.session.query(Tasklist).filter_by(title=list_title, user_id=current_user.get_id()).first():
        return jsonify({'error': 'Duplicate title'}), 400

    try:
        new_tasklist = Tasklist(user_id=current_user.get_id(), title=list_title)
        db.session.add(new_tasklist)
        db.session.commit()
        return jsonify({'success' : True}), 201
    except Exception as e:
        return jsonify({'error' : str(e)}), 400


@app.route('/add_task', methods=['POST'])
@login_required
def add_task():
    task_name = request.json.get('task')
    due_date = request.json.get('date')
    priority = request.json.get('priority')
    list_title = request.json.get('list_title')

    if task_name and due_date and priority and list_title:
        try:
            parsed_due_date = datetime.strptime(due_date, '%Y-%m-%d')
            tasklist = Tasklist.query.filter_by(
                title=list_title,
                user_id=current_user.user_id
            ).first()
            if not tasklist:
                return jsonify({'error': 'List not found'}), 404
            list_id = tasklist.tasklist_id

            task = Task(
                tasklist_id=list_id,
                name=task_name,
                due_date=parsed_due_date,
                priority=priority
            )
            db.session.add(task)
            db.session.commit()
            return jsonify({'success': True}), 201
        except ValueError:
            return jsonify({'error': 'Invalid date format'}), 400
        except Exception as e:
            return jsonify({'error': str(e)}), 400
    return jsonify({'error': 'Missing fields'}), 400

# TODO testing
@app.route('/update_task_status', methods=['POST'])
@login_required
def update_task_status():
    task_name = request.json.get('task')
    done = request.json.get('done')
    list_title = request.json.get('list_title')

    if not task_name or done is None or not list_title:
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        list_id = db.session.query(Tasklist).filter_by(title=list_title).first().tasklist_id
        Task.query.filter_by(name=task_name, tasklist_id=list_id).update({'done' : done})
        return jsonify({'success' : True}), 204
    except Exception as e:
        return jsonify({'error': 'Failed to update task status'}), 400

# TODO testing
@app.route('/delete_task', methods=['POST'])
@login_required
def delete_task():
    task_name = request.json.get('task')
    list_title = request.json.get('title')

    if not task_name or not list_title:
        return jsonify({'error': 'Missing required fields'}), 400
    
    try:
        list_id = db.session.query(Tasklist).filter_by(title=list_title).first().tasklist_id
        rowsdeleted = Task.query.filter_by(name=task_name, tasklist_id=list_id).delete()
        db.session.commit()
        print(rowsdeleted)
    except Exception as e:
        return jsonify({'error' : str(e)}), 400
    
    return jsonify({'success' : True}), 204

# TODO testing needed
@app.route('/get_tasks', methods=['GET'])
@login_required
def get_tasks():
    try:
        list_title = request.get('title')
        list_id = db.session.query(Tasklist).filter_by(title=list_title, user_id=current_user.get_id()).first().tasklist_id
        tasks_from_db = Task.query.filter_by(tasklist_id=list_id)
        tasks_serialised = TaskSchema(many=True).dumps(tasks_from_db)
        return tasks_serialised, 200
    except Exception as e:
        return jsonify({'error' : str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
