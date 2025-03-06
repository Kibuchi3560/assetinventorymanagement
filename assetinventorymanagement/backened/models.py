from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import UserMixin
from datetime import datetime

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(50), nullable=False, default="User")
    
    # Establish one-to-one relationship with Employee
    employee = db.relationship("Employee", backref="user", uselist=False)
    
    requests = db.relationship("Request", back_populates="user", cascade="all, delete-orphan")
    allocations = db.relationship("Allocation", back_populates="user", cascade="all, delete-orphan")

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

class Department(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    employees = db.relationship("Employee", back_populates="department", cascade="all, delete-orphan")

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    department_id = db.Column(db.Integer, db.ForeignKey('department.id'), nullable=False)
    # New user_id column to link with the User model.
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    
    department = db.relationship("Department", back_populates="employees")
    assets = db.relationship("Asset", back_populates="employee", cascade="all, delete-orphan")

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    assets = db.relationship("Asset", back_populates="category", cascade="all, delete-orphan")

class Asset(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=True)
    status = db.Column(db.String(20), default="Available")
    quantity = db.Column(db.Integer, nullable=False, default=1)
    allocation_date = db.Column(db.DateTime, nullable=True)
    image_url = db.Column(db.String(255), nullable=True)
    cost = db.Column(db.Float, nullable=False)
    purchase_date = db.Column(db.DateTime, default=datetime.utcnow)
    # Optionally, if you plan to use warrantyExpiry:
    # warrantyExpiry = db.Column(db.DateTime, nullable=True)

    category = db.relationship("Category", back_populates="assets")
    employee = db.relationship("Employee", back_populates="assets")
    requests = db.relationship("Request", back_populates="asset", cascade="all, delete-orphan")
    allocations = db.relationship("Allocation", back_populates="asset", cascade="all, delete-orphan")

class Request(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    asset_id = db.Column(db.Integer, db.ForeignKey('asset.id'), nullable=False)
    request_type = db.Column(db.String(50), nullable=False)
    urgency = db.Column(db.String(20), nullable=False, default="Medium")
    status = db.Column(db.String(20), nullable=False, default="Pending")
    reason = db.Column(db.Text, nullable=True)
    request_date = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", back_populates="requests")
    asset = db.relationship("Asset", back_populates="requests")

class Allocation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    asset_id = db.Column(db.Integer, db.ForeignKey('asset.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    allocation_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    asset = db.relationship("Asset", back_populates="allocations")
    user = db.relationship("User", back_populates="allocations")

def init_db(app):
    db.init_app(app)
    bcrypt.init_app(app)
    with app.app_context():
        db.create_all()
