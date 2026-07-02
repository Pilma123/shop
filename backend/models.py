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
    description_en = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False, default=0)
    image_filename = db.Column(db.String(255), nullable=True)
    where_to_get = db.Column(db.Text, nullable=True)
    where_to_get_en = db.Column(db.Text, nullable=True)
    instagram_url = db.Column(db.String(255), nullable=True)
    phone = db.Column(db.String(50), nullable=True)
    category = db.Column(db.String(50), nullable=False, default='Normal')

    @property
    def all_filenames(self):
        imgs = []
        if self.image_filename:
            imgs.append(self.image_filename)
        for gi in self.gallery_images:
            imgs.append(gi.filename)
        return imgs

class SiteSettings(db.Model):
    __tablename__ = 'site_settings'
    id = db.Column(db.Integer, primary_key=True)
    phone = db.Column(db.String(50), nullable=True)
    instagram_url = db.Column(db.String(255), nullable=True)
    facebook_url = db.Column(db.String(255), nullable=True)
    email = db.Column(db.String(255), nullable=True)
    order_popup_text = db.Column(db.Text, nullable=True)
    order_popup_text_en = db.Column(db.Text, nullable=True)

class ProductImage(db.Model):
    __tablename__ = 'product_images'
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    filename = db.Column(db.String(255), nullable=False)
    product = db.relationship('Product', backref=db.backref('gallery_images', lazy=True, cascade='all, delete-orphan'))


class BlockedIP(db.Model):
    __tablename__ = 'blocked_ips'
    id = db.Column(db.Integer, primary_key=True)
    ip_address = db.Column(db.String(50), unique=True, nullable=False)
    blocked_at = db.Column(db.DateTime, default=db.func.current_timestamp())


class LoginAttempt(db.Model):
    __tablename__ = 'login_attempts'
    id = db.Column(db.Integer, primary_key=True)
    ip_address = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(80), nullable=False)
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())
    success = db.Column(db.Boolean, default=False)


