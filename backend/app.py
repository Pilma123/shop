import os
from flask import Flask, render_template, request, redirect, url_for, session, abort
from werkzeug.utils import secure_filename
from werkzeug.security import check_password_hash
from models import db, User, Product

app = Flask(
    __name__,
    template_folder=os.path.abspath(os.path.join(os.path.dirname(__file__), '../frontend/templates')),
    static_folder=os.path.abspath(os.path.join(os.path.dirname(__file__), '../frontend/static'))
)

# SQLite Config
db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'shop.db'))
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Session key persistence
secret_key_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'secret.key'))
if os.path.exists(secret_key_path):
    with open(secret_key_path, 'rb') as f:
        app.secret_key = f.read()
else:
    app.secret_key = os.urandom(24)
    with open(secret_key_path, 'wb') as f:
        f.write(app.secret_key)

db.init_app(app)

# Upload Config
UPLOAD_FOLDER = os.path.join(app.static_folder, 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Helper to check if logged in
def check_admin():
    if not session.get('is_admin'):
        abort(403)

# Public routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/products')
def products():
    search_query = request.args.get('search', '').strip()
    if search_query:
        # Search by name or description
        all_products = Product.query.filter(
            (Product.name.like(f'%{search_query}%')) | 
            (Product.description.like(f'%{search_query}%'))
        ).all()
    else:
        all_products = Product.query.all()
    return render_template('products.html', products=all_products, search=search_query)

# Admin Auth routes
@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if session.get('is_admin'):
        return redirect(url_for('admin_dashboard'))
    
    error = None
    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '').strip()
        
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password_hash, password):
            session['is_admin'] = True
            return redirect(url_for('admin_dashboard'))
        else:
            error = 'Invalid credentials'
            
    return render_template('admin/login.html', error=error)

@app.route('/admin/logout')
def admin_logout():
    session.pop('is_admin', None)
    return redirect(url_for('index'))

# Admin CRUD routes
@app.route('/admin/dashboard')
def admin_dashboard():
    check_admin()
    all_products = Product.query.all()
    return render_template('admin/dashboard.html', products=all_products)

@app.route('/admin/add-product', methods=['GET', 'POST'])
def add_product():
    check_admin()
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        description = request.form.get('description', '').strip()
        price_val = request.form.get('price', '0')
        stock_val = request.form.get('stock', '0')
        where_to_get = request.form.get('where_to_get', '').strip()
        instagram_url = request.form.get('instagram_url', '').strip()
        phone = request.form.get('phone', '').strip()
        
        # Parse numeric values safely
        try:
            price = float(price_val)
        except ValueError:
            price = 0.0
        try:
            stock = int(stock_val)
        except ValueError:
            stock = 0
            
        # File upload
        image_filename = None
        file = request.files.get('image')
        if file and file.filename != '' and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            # Add uniqueness to filename if it exists
            base, ext = os.path.splitext(filename)
            counter = 1
            while os.path.exists(os.path.join(app.config['UPLOAD_FOLDER'], filename)):
                filename = f"{base}_{counter}{ext}"
                counter += 1
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            image_filename = filename

        new_prod = Product(
            name=name,
            description=description,
            price=price,
            stock=stock,
            image_filename=image_filename,
            where_to_get=where_to_get,
            instagram_url=instagram_url,
            phone=phone
        )
        db.session.add(new_prod)
        db.session.commit()
        return redirect(url_for('admin_dashboard'))

    return render_template('admin/add_product.html')

@app.route('/admin/edit-product/<int:product_id>', methods=['GET', 'POST'])
def edit_product(product_id):
    check_admin()
    product = Product.query.get_or_404(product_id)
    
    if request.method == 'POST':
        product.name = request.form.get('name', '').strip()
        product.description = request.form.get('description', '').strip()
        product.where_to_get = request.form.get('where_to_get', '').strip()
        product.instagram_url = request.form.get('instagram_url', '').strip()
        product.phone = request.form.get('phone', '').strip()
        
        try:
            product.price = float(request.form.get('price', '0'))
        except ValueError:
            product.price = 0.0
        try:
            product.stock = int(request.form.get('stock', '0'))
        except ValueError:
            product.stock = 0

        # Handle optional new image upload
        file = request.files.get('image')
        if file and file.filename != '' and allowed_file(file.filename):
            # Delete old image file if it exists
            if product.image_filename:
                old_path = os.path.join(app.config['UPLOAD_FOLDER'], product.image_filename)
                if os.path.exists(old_path):
                    try:
                        os.remove(old_path)
                    except OSError:
                        pass # Ignore if failed to delete
            
            filename = secure_filename(file.filename)
            base, ext = os.path.splitext(filename)
            counter = 1
            while os.path.exists(os.path.join(app.config['UPLOAD_FOLDER'], filename)):
                filename = f"{base}_{counter}{ext}"
                counter += 1
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            product.image_filename = filename
            
        db.session.commit()
        return redirect(url_for('admin_dashboard'))

    return render_template('admin/edit_product.html', product=product)

@app.route('/admin/delete-product/<int:product_id>', methods=['POST'])
def delete_product(product_id):
    check_admin()
    product = Product.query.get_or_404(product_id)
    
    # Delete image from uploads
    if product.image_filename:
        img_path = os.path.join(app.config['UPLOAD_FOLDER'], product.image_filename)
        if os.path.exists(img_path):
            try:
                os.remove(img_path)
            except OSError:
                pass
                
    db.session.delete(product)
    db.session.commit()
    return redirect(url_for('admin_dashboard'))

if __name__ == '__main__':
    # ponytail: simple sqlite initialisation in app if not seeded
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)
