from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False, default=0)
    image_filename = db.Column(db.String(255), nullable=True)
    where_to_get = db.Column(db.Text, nullable=True)
    instagram_url = db.Column(db.String(255), nullable=True)
    phone = db.Column(db.String(50), nullable=True)
    category = db.Column(db.String(50), nullable=False, default='Normal')

