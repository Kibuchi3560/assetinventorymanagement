from app import app
from models import db, User, Department, Employee, Category, Asset, Request, Allocation
from flask_bcrypt import Bcrypt
from datetime import datetime, timedelta
import random

bcrypt = Bcrypt(app)

def seed_data():
    with app.app_context():
        # ----------------------------
        # Create Departments
        # ----------------------------
        dept_names = [
            "Administration", "HR", "IT", "Finance", "Procurement",
            "Operations", "Marketing", "Sales", "Research", "Customer Support"
        ]
        departments = {}
        for name in dept_names:
            dept = Department.query.filter_by(name=name).first()
            if not dept:
                dept = Department(name=name)
                db.session.add(dept)
                db.session.commit()
            departments[name] = dept
        print("Departments seeded.")

        # ----------------------------
        # Create Categories
        # ----------------------------
        cat_names = [
            "IT Equipment", "Furniture", "Office Supplies", "Electronics", "Vehicles",
            "Software", "Medical Equipment", "Industrial Machinery", "Communication Devices", "Stationery"
        ]
        categories = {}
        for name in cat_names:
            cat = Category.query.filter_by(name=name).first()
            if not cat:
                cat = Category(name=name)
                db.session.add(cat)
                db.session.commit()
            categories[name] = cat
        print("Categories seeded.")

        # ----------------------------
        # Create Users and Employee Records
        # ----------------------------

        # **Admin User**
        admin_user = User.query.filter_by(email="ian@gmail.com").first()
        if not admin_user:
            admin_user = User(name="Ian", email="ian@gmail.com", role="Admin")
            admin_user.set_password("Ian1")
            db.session.add(admin_user)
            db.session.commit()
            admin_employee = Employee(name="AdminUser", role="Admin", department_id=departments["Administration"].id, user_id=admin_user.id)
            db.session.add(admin_employee)
            db.session.commit()
            print("Admin user created.")
        else:
            print("Admin user already exists.")

        # **Managers**
        managers_data = [
            {"name": "Kamal", "email": "manager1@example.com", "password": "Kamal123", "department": "Finance"},
            {"name": "King", "email": "manager2@example.com", "password": "King123", "department": "IT"},
            {"name": "Sharon", "email": "manager3@example.com", "password": "Sharon123", "department": "Sales"}
        ]
        managers = []
        for m in managers_data:
            user = User.query.filter_by(email=m["email"]).first()
            if not user:
                user = User(name=m["name"], email=m["email"], role="Manager")
                user.set_password(m["password"])
                db.session.add(user)
                db.session.commit()
                employee = Employee(name=m["name"], role="Manager", department_id=departments[m["department"]].id, user_id=user.id)
                db.session.add(employee)
                db.session.commit()
                managers.append(user)
                print(f"Manager {m['name']} created.")
            else:
                managers.append(user)
                print(f"Manager {m['name']} already exists.")

        # **Employees**
        employee_data = [
            {"name": "Alice", "email": "alice@example.com", "password": "alice123", "department": "IT"},
            {"name": "Bob", "email": "bob@example.com", "password": "bob123", "department": "HR"},
            {"name": "Charlie", "email": "charlie@example.com", "password": "charlie123", "department": "Operations"},
            {"name": "David", "email": "david@example.com", "password": "david123", "department": "Sales"},
            {"name": "Eva", "email": "eva@example.com", "password": "eva123", "department": "Marketing"},
            {"name": "Frank", "email": "frank@example.com", "password": "frank123", "department": "Customer Support"},
            {"name": "Grace", "email": "grace@example.com", "password": "grace123", "department": "Research"},
            {"name": "Helen", "email": "helen@example.com", "password": "helen123", "department": "Procurement"},
            {"name": "Ian", "email": "ian@example.com", "password": "ian123", "department": "Finance"},
            {"name": "Jane", "email": "jane@example.com", "password": "jane123", "department": "IT"},
            {"name": "Kevin", "email": "kevin@example.com", "password": "kevin123", "department": "Operations"},
            {"name": "Laura", "email": "laura@example.com", "password": "laura123", "department": "Marketing"},
            {"name": "Mike", "email": "mike@example.com", "password": "mike123", "department": "HR"},
            {"name": "Nina", "email": "nina@example.com", "password": "nina123", "department": "Customer Support"}
        ]
        employees = []
        for emp in employee_data:
            user = User.query.filter_by(email=emp["email"]).first()
            if not user:
                user = User(name=emp["name"], email=emp["email"], role="Employee")
                user.set_password(emp["password"])
                db.session.add(user)
                db.session.commit()
                employee_record = Employee(name=emp["name"], role="Employee", department_id=departments[emp["department"]].id, user_id=user.id)
                db.session.add(employee_record)
                db.session.commit()
                employees.append(user)
                print(f"Employee {emp['name']} created.")
            else:
                employees.append(user)
                print(f"Employee {emp['name']} already exists.")

        # ----------------------------
        # Create Assets
        # ----------------------------
        asset_data = [
            {"name": "Dell Inspiron Laptop", "category": "IT Equipment", "status": "Available", "quantity": 10, "cost": 1200, "image_url": "https://example.com/dell.jpg"},
            {"name": "HP Pavilion Desktop", "category": "IT Equipment", "status": "Available", "quantity": 5, "cost": 900, "image_url": "https://example.com/hp.jpg"},
            {"name": "Ergonomic Office Chair", "category": "Furniture", "status": "Available", "quantity": 20, "cost": 150, "image_url": "https://example.com/chair.jpg"},
            {"name": "Standing Desk", "category": "Furniture", "status": "Available", "quantity": 15, "cost": 350, "image_url": "https://example.com/desk.jpg"},
            {"name": "Canon Printer", "category": "Office Supplies", "status": "Allocated", "quantity": 3, "cost": 300, "image_url": "https://example.com/printer.jpg"},
            {"name": "Samsung 27\" Monitor", "category": "Electronics", "status": "Allocated", "quantity": 8, "cost": 250, "image_url": "https://example.com/monitor.jpg"},
            {"name": "Toyota Camry", "category": "Vehicles", "status": "Available", "quantity": 2, "cost": 25000, "image_url": "https://example.com/camry.jpg"},
            {"name": "Adobe Creative Cloud License", "category": "Software", "status": "Available", "quantity": 50, "cost": 600, "image_url": "https://example.com/adobe.jpg"},
            {"name": "3D Printer", "category": "Electronics", "status": "Available", "quantity": 2, "cost": 1800, "image_url": "https://example.com/3dprinter.jpg"},
            {"name": "Medical Ultrasound Machine", "category": "Medical Equipment", "status": "Available", "quantity": 1, "cost": 50000, "image_url": "https://example.com/ultrasound.jpg"},
            {"name": "Industrial Forklift", "category": "Industrial Machinery", "status": "Available", "quantity": 3, "cost": 15000, "image_url": "https://example.com/forklift.jpg"},
            {"name": "VoIP Phone System", "category": "Communication Devices", "status": "Available", "quantity": 10, "cost": 800, "image_url": "https://example.com/voip.jpg"},
            {"name": "Executive Office Desk", "category": "Furniture", "status": "Available", "quantity": 5, "cost": 700, "image_url": "https://example.com/executivedesk.jpg"}
        ]
        assets_created = {}
        for a in asset_data:
            asset = Asset.query.filter_by(name=a["name"]).first()
            if not asset:
                asset = Asset(
                    name=a["name"],
                    category_id=categories[a["category"]].id,
                    status=a["status"],
                    quantity=a["quantity"],
                    cost=a["cost"],
                    image_url=a["image_url"],
                    purchase_date=datetime.utcnow() - timedelta(days=random.randint(0, 365))
                )
                db.session.add(asset)
                db.session.commit()
                assets_created[a["name"]] = asset
                print(f"Asset '{a['name']}' created.")
            else:
                assets_created[a["name"]] = asset
                print(f"Asset '{a['name']}' already exists.")

        # ----------------------------
        # Create a Dummy Asset for New Asset Requests
        # ----------------------------
        new_asset_placeholder = Asset.query.filter_by(name="New Asset Placeholder").first()
        if not new_asset_placeholder:
            new_asset_placeholder = Asset(
                name="New Asset Placeholder",
                category_id=categories["Office Supplies"].id,
                status="Placeholder",
                quantity=0,
                cost=0,
                image_url="",
                purchase_date=datetime.utcnow()
            )
            db.session.add(new_asset_placeholder)
            db.session.commit()
            print("New Asset Placeholder created.")
        else:
            print("New Asset Placeholder already exists.")

        # ----------------------------
        # Allocate Assets to Employees
        # ----------------------------
        canon_printer = Asset.query.filter_by(name="Canon Printer").first()
        bob = User.query.filter_by(name="Bob").first()
        if canon_printer and bob and canon_printer.status != "Allocated":
            bob_employee = bob.employee
            canon_printer.employee_id = bob_employee.id
            canon_printer.status = "Allocated"
            canon_printer.allocation_date = datetime.utcnow() - timedelta(days=random.randint(1, 30))
            db.session.commit()
            allocation = Allocation(
                asset_id=canon_printer.id,
                user_id=bob.id,
                quantity=1,
                allocation_date=canon_printer.allocation_date
            )
            db.session.add(allocation)
            db.session.commit()
            print("Canon Printer allocated to Bob.")

        samsung_monitor = Asset.query.filter_by(name='Samsung 27" Monitor').first()
        alice = User.query.filter_by(name="Alice").first()
        if samsung_monitor and alice and samsung_monitor.status != "Allocated":
            alice_employee = alice.employee
            samsung_monitor.employee_id = alice_employee.id
            samsung_monitor.status = "Allocated"
            samsung_monitor.allocation_date = datetime.utcnow() - timedelta(days=random.randint(1, 30))
            db.session.commit()
            allocation = Allocation(
                asset_id=samsung_monitor.id,
                user_id=alice.id,
                quantity=1,
                allocation_date=samsung_monitor.allocation_date
            )
            db.session.add(allocation)
            db.session.commit()
            print("Samsung Monitor allocated to Alice.")

        # ----------------------------
        # Create Requests
        # ----------------------------
        request_data = [
            {"user_name": "Charlie", "asset_name": None, "request_type": "New Asset", "urgency": "High", "status": "Pending", "reason": "Requesting new office desk"},
            {"user_name": "David", "asset_name": "HP Pavilion Desktop", "request_type": "Repair", "urgency": "Medium", "status": "Pending", "reason": "Desktop malfunctioning"},
            {"user_name": "Eva", "asset_name": "Ergonomic Office Chair", "request_type": "Repair", "urgency": "Low", "status": "Approved", "reason": "Chair squeaks"},
            {"user_name": "Frank", "asset_name": None, "request_type": "New Asset", "urgency": "High", "status": "Pending", "reason": "Need an additional monitor"},
            {"user_name": "Grace", "asset_name": "Standing Desk", "request_type": "Repair", "urgency": "High", "status": "Rejected", "reason": "Desk is not adjusting properly"},
            {"user_name": "Helen", "asset_name": "Adobe Creative Cloud License", "request_type": "New Asset", "urgency": "Medium", "status": "Pending", "reason": "Requesting additional licenses"},
            {"user_name": "Ian", "asset_name": "3D Printer", "request_type": "Repair", "urgency": "High", "status": "Pending", "reason": "Printer requires maintenance"},
            {"user_name": "Jane", "asset_name": None, "request_type": "New Asset", "urgency": "Low", "status": "Pending", "reason": "Need extra keyboard and mouse"},
            {"user_name": "Kevin", "asset_name": "Toyota Camry", "request_type": "Repair", "urgency": "Medium", "status": "Pending", "reason": "Engine check-up needed"},
            {"user_name": "Laura", "asset_name": "Executive Office Desk", "request_type": "New Asset", "urgency": "High", "status": "Pending", "reason": "Office expansion requirement"}
        ]
        for r in request_data:
            user = User.query.filter_by(name=r["user_name"]).first()
            if r["asset_name"]:
                asset = Asset.query.filter_by(name=r["asset_name"]).first()
            else:
                asset = new_asset_placeholder
            req = Request(
                user_id=user.id if user else None,
                asset_id=asset.id,
                request_type=r["request_type"],
                urgency=r["urgency"],
                status=r["status"],
                reason=r["reason"],
                request_date=datetime.utcnow() - timedelta(days=random.randint(0, 90))
            )
            db.session.add(req)
            db.session.commit()
            print(f"Request by {r['user_name']} created.")

        print("Database seeded successfully with comprehensive made-up data!")

if __name__ == '__main__':
    seed_data()