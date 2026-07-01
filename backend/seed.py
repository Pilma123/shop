import os
from werkzeug.security import generate_password_hash
from app import app, db
from models import User, Product

def seed():
    with app.app_context():
        db.create_all()
        print("Database tables created.")
        
        username = input("Admin username [admin]: ").strip() or "admin"
        password = ""
        while True:
            password = input("Admin password (min 12 chars, must contain upper, lower, number, special char): ").strip()
            if not password:
                print("Password cannot be empty.")
                continue
            
            # Complexity validation
            is_valid = True
            reasons = []
            if len(password) < 12:
                is_valid = False
                reasons.append("at least 12 characters long")
            if not any(c.isupper() for c in password):
                is_valid = False
                reasons.append("one uppercase letter")
            if not any(c.islower() for c in password):
                is_valid = False
                reasons.append("one lowercase letter")
            if not any(c.isdigit() for c in password):
                is_valid = False
                reasons.append("one digit")
            special_chars = '!@#$%^&*(),.?":{}|<>'
            if not any(c in special_chars for c in password):
                is_valid = False
                reasons.append("one special character (e.g. !@#$%^&*())")
                
            if is_valid:
                break
            else:
                print(f"Password fails complexity requirements. It must include: {', '.join(reasons)}")
                
        # Hash password
        pwd_hash = generate_password_hash(password)
        
        # Check if user exists
        user = User.query.filter_by(username=username).first()
        if user:
            user.password_hash = pwd_hash
            print(f"Updated password for existing user '{username}'.")
        else:
            user = User(username=username, password_hash=pwd_hash)
            db.session.add(user)
            print(f"Created admin user '{username}'.")
            
        # Seed some initial sample products if none exist
        if Product.query.count() == 0:
            sample_products = [
                Product(
                    name="Golden Bloom Necklace",
                    description="A luminous pendant encasing a delicate yellow flower in warm golden resin.",
                    price=38.00,
                    stock=8,
                    image_filename=None,
                    where_to_get="Order by calling us directly or sending a DM.",
                    instagram_url="https://instagram.com/kramlill",
                    phone="+4612345678",
                    category="Pinned 1"
                ),
                Product(
                    name="Forest Whisper Necklace",
                    description="Soft fern fronds and tiny wildflowers suspended in clear resin.",
                    price=40.00,
                    stock=4,
                    image_filename=None,
                    where_to_get="Order by calling us directly or sending a DM.",
                    instagram_url="https://instagram.com/kramlill",
                    phone="+4612345678",
                    category="Pinned 2"
                ),
                Product(
                    name="Wildflower Teardrop Necklace",
                    description="Tiny wildflowers pressed into a classic teardrop of crystal-clear resin.",
                    price=42.00,
                    stock=12,
                    image_filename=None,
                    where_to_get="Order by calling us directly or sending a DM.",
                    instagram_url="https://instagram.com/kramlill",
                    phone="+4612345678",
                    category="Pinned 3"
                ),
                Product(
                    name="KramLill Classic Mug",
                    description="A beautiful handmade ceramic mug, perfect for your morning coffee.",
                    price=19.99,
                    stock=10,
                    image_filename=None,
                    where_to_get="Available at our physical shop.",
                    instagram_url="https://instagram.com/kramlill",
                    phone="+4612345678",
                    category="Normal"
                ),
                Product(
                    name="KramLill Woolen Scarf",
                    description="Soft, warm scarf made from 100% organic local wool.",
                    price=45.00,
                    stock=5,
                    image_filename=None,
                    where_to_get="Order by calling us directly or sending a DM.",
                    instagram_url="https://instagram.com/kramlill",
                    phone="+4612345678",
                    category="Normal"
                )
            ]
            db.session.bulk_save_objects(sample_products)
            print("Added sample products.")
            
        db.session.commit()
        print("Database seeded successfully.")

if __name__ == "__main__":
    seed()
