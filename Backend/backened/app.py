import os
from flask import Flask, request, jsonify
from flask_login import LoginManager, login_user, logout_user, current_user, login_required
from functools import wraps
from flask_migrate import Migrate
from models import db, User, Department, Employee, Category, Asset, Request, Allocation, init_db
from datetime import datetime, timedelta
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://my_user:fHV0KI3qGMuAQgGKhbZSLtouptv96eyS@dpg-cv2pr9dumphs739tj4g0-a.oregon-postgres.render.com/mydatabase1_m56n"
app.config['SECRET_KEY'] = 'your_secure_secret_key'

# Enable CORS (with credentials) for cross-origin requests.
CORS(app, supports_credentials=True)

# Set up Flask-Login.
login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Initialize the database and migration
init_db(app)
migrate = Migrate(app, db)

# Role-based access decorator.
def role_required(*roles):
    def wrapper(f):
        @wraps(f)
        @login_required
        def decorated_function(*args, **kwargs):
            user_role = "Employee" if current_user.role == "User" else current_user.role
            if user_role not in roles:
                return jsonify({"message": "Unauthorized"}), 403
            return f(*args, **kwargs)
        return decorated_function
    return wrapper

# Serialization Functions
def user_to_dict(user):
    employee = user.employee if hasattr(user, 'employee') else None
    department_name = employee.department.name if employee and employee.department else None
    return {
        "id": user.id,
        "name": user.name,
        "username": user.email,  # using email as username
        "role": user.role,
        "department": department_name,
        "employee_id": employee.user_id if employee else None
    }


def asset_to_dict(asset):
    return {
        "id": asset.id, 
        "name": asset.name, 
        "category": asset.category.name if asset.category else None,
        "status": asset.status, 
        "quantity": asset.quantity, 
        "image_url": asset.image_url,
        "cost": asset.cost, 
        "purchaseDate": asset.purchase_date.isoformat(),
        "assignedTo": asset.employee.user_id if asset.employee and hasattr(asset.employee, 'user_id') else None,
        "warrantyExpiry": getattr(asset, 'warrantyExpiry', None)
    }

def request_to_dict(req):
    return {
        "id": req.id, 
        "user": req.user.name, 
        "userId": req.user.id,
        "asset": req.asset.name if req.asset else None,
        "request_type": req.request_type,
        "type": req.request_type,  # alias for frontend filtering
        "urgency": req.urgency, 
        "status": req.status,
        "reason": req.reason, 
        "request_date": req.request_date.isoformat(),
        "createdAt": req.request_date.isoformat()  # alias for sorting by date
    }

# ----------------------------
# Authentication Endpoints
# ----------------------------

@app.route('/assetinventorymanagement/login', methods=['POST'])
def login():
    data = request.get_json()
    name = data.get('name')
    password = data.get('password')
    numeric_role = data.get('role')  # "1" (Admin), "2" (Manager), "3" (Employee)

    role_map = {
        "1": "Admin",
        "2": "Manager",
        "3": "Employee"
    }
    mapped_role = role_map.get(numeric_role)
    if not mapped_role:
        return jsonify({"message": "Invalid role selected"}), 400

    user = User.query.filter_by(name=name).first()
    if user and user.check_password(password) and user.role == mapped_role:
        login_user(user)
        return jsonify({
            "message": "Logged in successfully",
            "user": {
                "name": user.name,
                "role": mapped_role  # Returns "Admin" instead of "1"
            }
        }), 200
    else:
        return jsonify({"message": "Invalid credentials or role"}), 401

@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out successfully"}), 200

# ----------------------------
# User Management Endpoints
# ----------------------------

@app.route('/users', methods=['GET'])
@role_required('Admin')
def get_users():
    users = User.query.all()
    return jsonify([user_to_dict(u) for u in users]), 200

@app.route('/users', methods=['POST'])
@role_required('Admin')
def create_user():
    data = request.get_json()
    username = data.get('username')
    role = data.get('role', 'employee').capitalize()  # Expected: Admin, Procurement, Employee
    department_name = data.get('department')
    if not username or not department_name:
        return jsonify({"message": "Username and department are required"}), 400
    email = f"{username.replace(' ', '').lower()}@example.com"
    default_password = "password123"
    user = User(name=username, email=email, role=role)
    user.set_password(default_password)
    db.session.add(user)
    db.session.commit()
    department = Department.query.filter_by(name=department_name).first()
    if not department:
        return jsonify({"message": "Department not found"}), 400
    employee = Employee(name=username, role=role, department_id=department.id, user_id=user.id)
    db.session.add(employee)
    db.session.commit()
    return jsonify({"message": "User created", "user": user_to_dict(user)}), 201

# ----------------------------
# Asset Management Endpoints
# ----------------------------

@app.route('/assets', methods=['GET'])
@role_required('Admin', 'Manager')
def get_assets():
    assets = Asset.query.all()
    return jsonify([asset_to_dict(a) for a in assets]), 200

@app.route('/assets', methods=['POST'])
@role_required('Admin', 'Manager')
def create_asset():
    data = request.get_json()
    name = data.get('name')
    category_name = data.get('category')
    image_url = data.get('image_url', None)
    if not name or not category_name:
        return jsonify({"message": "Asset name and category are required"}), 400
    category = Category.query.filter_by(name=category_name).first()
    if not category:
        return jsonify({"message": "Category not found"}), 400
    asset = Asset(
        name=name,
        category_id=category.id,
        status='Available',
        quantity=1,
        image_url=image_url,
        cost=0,
        purchase_date=datetime.utcnow()
    )
    db.session.add(asset)
    db.session.commit()
    return jsonify({"message": "Asset created", "asset": asset_to_dict(asset)}), 201

@app.route('/assets/<int:id>/allocate', methods=['POST'])
@role_required('Admin', 'Manager')
def allocate_asset(id):
    asset = Asset.query.get_or_404(id)
    data = request.get_json()
    employee_id = data.get('employee_id')
    employee = Employee.query.get_or_404(employee_id)
    if asset.status != 'Available':
        return jsonify({"message": "Asset not available"}), 400
    asset.employee_id = employee_id
    asset.allocation_date = datetime.utcnow()
    asset.status = 'Allocated'
    allocation = Allocation(
        asset_id=asset.id,
        user_id=data.get('user_id'),
        quantity=1,
        allocation_date=datetime.utcnow()
    )
    db.session.add(allocation)
    db.session.commit()
    return jsonify({"message": "Asset allocated"}), 200

# ----------------------------
# Request Management Endpoints
# ----------------------------

@app.route('/requests', methods=['POST'])
@role_required('Employee')
def create_request():
    data = request.get_json()
    asset_id = data.get('asset_id')
    if asset_id:
        asset = Asset.query.get_or_404(asset_id)
        if asset.employee_id != current_user.id:
            return jsonify({"message": "Asset not assigned to you"}), 403
    req_obj = Request(
        user_id=current_user.id,
        asset_id=asset_id,
        request_type=data.get('request_type'),
        urgency=data.get('urgency'),
        reason=data.get('reason'),
        status='Pending',
        request_date=datetime.utcnow()
    )
    db.session.add(req_obj)
    db.session.commit()
    return jsonify({"message": "Request submitted", "request": request_to_dict(req_obj)}), 201

@app.route('/requests', methods=['GET'])
@role_required('Admin', 'Manager', 'Finance')
def get_requests():
    status = request.args.get('status')
    query = Request.query
    if status:
        query = query.filter_by(status=status)
    reqs = query.order_by(Request.request_date).all()
    return jsonify([request_to_dict(r) for r in reqs]), 200

@app.route('/requests/me', methods=['GET'])
@role_required('Employee')
def get_my_requests():
    status = request.args.get('status')
    query = Request.query.filter_by(user_id=current_user.id)
    if status:
        query = query.filter_by(status=status)
    reqs = query.all()
    return jsonify([request_to_dict(r) for r in reqs]), 200

@app.route('/requests/<int:id>', methods=['PUT'])
@role_required('Manager')
def update_request(id):
    req_obj = Request.query.get_or_404(id)
    data = request.get_json()
    new_status = data.get('status')
    if new_status not in ['Approved', 'Rejected']:
        return jsonify({"message": "Invalid status"}), 400
    req_obj.status = new_status
    if req_obj.request_type == 'Repair' and new_status == 'Approved':
        asset = Asset.query.get(req_obj.asset_id)
        if asset:
            asset.status = 'Under Repair'
    db.session.commit()
    return jsonify({"message": "Request updated", "request": request_to_dict(req_obj)}), 200

@app.route('/requests/approve-all', methods=['PUT'])
@role_required('Manager', 'Finance')
def approve_all_requests():
    pending_reqs = Request.query.filter_by(status='Pending').all()
    for req_obj in pending_reqs:
        req_obj.status = 'Approved'
    db.session.commit()
    return jsonify({"message": "All pending requests approved"}), 200

# ----------------------------
# Categories & Departments Endpoints
# ----------------------------

@app.route('/assetinventorymanagement/categories', methods=['GET'])
@login_required
def get_categories():
    cats = Category.query.all()
    return jsonify([cat.name for cat in cats]), 200

@app.route('/assetinventorymanagement/categories', methods=['POST'])
@login_required
def add_category():
    data = request.get_json()
    name = data.get('name')
    if not name:
        return jsonify({"message": "Category name required"}), 400
    if Category.query.filter_by(name=name).first():
        return jsonify({"message": "Category already exists"}), 400
    cat = Category(name=name)
    db.session.add(cat)
    db.session.commit()
    return jsonify({"message": "Category added", "category": cat.name}), 201

@app.route('/assetinventorymanagement/departments', methods=['GET'])
@login_required
def get_departments():
    deps = Department.query.all()
    return jsonify([dep.name for dep in deps]), 200

@app.route('/assetinventorymanagement/departments', methods=['POST'])
@login_required
def add_department():
    data = request.get_json()
    name = data.get('name')
    if not name:
        return jsonify({"message": "Department name required"}), 400
    if Department.query.filter_by(name=name).first():
        return jsonify({"message": "Department already exists"}), 400
    dep = Department(name=name)
    db.session.add(dep)
    db.session.commit()
    return jsonify({"message": "Department added", "department": dep.name}), 201

# ----------------------------
# Additional Dashboard Endpoints
# ----------------------------

@app.route('/assetinventorymanagement/activity-log', methods=['GET'])
@login_required
def get_activity_log():
    # Dummy data; replace with real activity logs.
    return jsonify([]), 200

@app.route('/assets/allocated', methods=['GET'])
@login_required
@role_required('Employee')
def get_allocated_assets():
    assets = Asset.query.join(Employee).filter(Employee.user_id == current_user.id).all()
    return jsonify([asset_to_dict(a) for a in assets]), 200

def asset_to_dict(asset):
    return {
        "id": asset.id,
        "name": asset.name,
        "category": asset.category.name if asset.category else None,
        "status": asset.status,
        "quantity": asset.quantity,
        "image_url": asset.image_url,
        "cost": asset.cost,
        "purchaseDate": asset.purchase_date.isoformat(),
        "allocationDate": asset.allocation_date.isoformat() if asset.allocation_date else None,
        "assignedTo": asset.employee.user_id if asset.employee and hasattr(asset.employee, 'user_id') else None,
        "warrantyExpiry": getattr(asset, 'warrantyExpiry', None)
    }


@app.route('/assetinventorymanagement/alerts', methods=['GET'])
@login_required
def get_alerts():
    # Dummy critical alerts.
    return jsonify([]), 200

@app.route('/assetinventorymanagement/dashboard-metrics', methods=['GET'])
@login_required
def get_dashboard_metrics():
    total_users = User.query.count()
    total_assets = Asset.query.count()
    total_requests = Request.query.count()
    metrics = [
        {"icon": "fa-users", "title": "Total Users", "value": total_users, "variant": "primary"},
        {"icon": "fa-boxes", "title": "Total Assets", "value": total_assets, "variant": "success"},
        {"icon": "fa-file-alt", "title": "Total Requests", "value": total_requests, "variant": "warning"}
    ]
    return jsonify(metrics), 200

@app.route('/assetinventorymanagement/maintenance-schedule', methods=['GET'])
@login_required
def get_maintenance_schedule():
    # Dummy maintenance schedule data.
    return jsonify([]), 200

@app.route('/assetinventorymanagement/reporting-export', methods=['GET'])
@login_required
def get_reporting_export():
    # Dummy export data.
    return jsonify({}), 200

if __name__ == '__main__':
    app.run(debug=True)
