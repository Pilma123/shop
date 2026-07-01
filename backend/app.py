import os
import secrets
from datetime import datetime, timedelta
from flask import Flask, render_template, request, redirect, url_for, session, abort
from werkzeug.utils import secure_filename
from werkzeug.security import check_password_hash
from models import db, User, Product, ProductImage, SiteSettings, BlockedIP, LoginAttempt

app = Flask(
    __name__,
    template_folder=os.path.abspath(os.path.join(os.path.dirname(__file__), '../frontend/templates')),
    static_folder=os.path.abspath(os.path.join(os.path.dirname(__file__), '../frontend/static'))
)

# SQLite Config
db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'shop.db'))
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Security Cookies Configuration
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

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

# Helper to retrieve client IP safely
def get_client_ip():
    if request.headers.getlist("X-Forwarded-For"):
        return request.headers.getlist("X-Forwarded-For")[0].split(',')[0].strip()
    return request.remote_addr

# Lockout detection (lock IP for 15 mins after 5 consecutive failures)
def is_ip_locked_out(ip):
    attempts = LoginAttempt.query.filter_by(ip_address=ip).order_by(LoginAttempt.timestamp.desc()).limit(5).all()
    if len(attempts) < 5:
        return False
    if all(not a.success for a in attempts):
        diff = datetime.utcnow() - attempts[-1].timestamp
        if diff.total_seconds() < 900:  # 15 minutes
            return True
    return False

# CSRF Protection middleware
@app.before_request
def csrf_protect():
    # Ensure CSRF token exists
    if 'csrf_token' not in session:
        session['csrf_token'] = secrets.token_hex(32)
    
    # Check POST requests for CSRF validity
    if request.method == 'POST':
        # Don't validate static assets or non-forms if any
        token = request.form.get('csrf_token')
        if not token or token != session.get('csrf_token'):
            abort(400, "CSRF token missing or invalid.")

# Blocked IP filter middleware
@app.before_request
def check_ip_block():
    if request.path.startswith('/admin'):
        ip = get_client_ip()
        if BlockedIP.query.filter_by(ip_address=ip).first():
            abort(403, "Access denied: your IP address has been blocked by the administrator.")

@app.context_processor
def inject_csrf_token():
    return dict(csrf_token=session.get('csrf_token'))


# Upload Config
UPLOAD_FOLDER = os.path.join(app.static_folder, 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def save_file(file):
    filename = secure_filename(file.filename)
    base, ext = os.path.splitext(filename)
    counter = 1
    while os.path.exists(os.path.join(app.config['UPLOAD_FOLDER'], filename)):
        filename = f"{base}_{counter}{ext}"
        counter += 1
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    return filename

# Helper to check if logged in
def check_admin():
    if not session.get('is_admin'):
        abort(403)

# Public routes
@app.route('/')
def index():
    pinned_1 = Product.query.filter_by(category='Pinned 1').first()
    pinned_2 = Product.query.filter_by(category='Pinned 2').first()
    pinned_3 = Product.query.filter_by(category='Pinned 3').first()
    normal_products = Product.query.filter_by(category='Normal').all()
    settings = SiteSettings.query.get(1)
    return render_template('index.html', pinned_1=pinned_1, pinned_2=pinned_2, pinned_3=pinned_3, normal_products=normal_products, settings=settings)


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
    ip = get_client_ip()
    
    if is_ip_locked_out(ip):
        error = 'Too many failed login attempts. Please try again after 15 minutes.'
        return render_template('admin/login.html', error=error)
        
    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '').strip()
        
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password_hash, password):
            # Log successful attempt
            db.session.add(LoginAttempt(ip_address=ip, username=username, success=True))
            db.session.commit()
            
            session['is_admin'] = True
            return redirect(url_for('admin_dashboard'))
        else:
            # Log failed attempt
            db.session.add(LoginAttempt(ip_address=ip, username=username, success=False))
            db.session.commit()
            
            error = 'Invalid credentials'
            if is_ip_locked_out(ip):
                error = 'Too many failed login attempts. This IP address has been temporarily locked out.'
            
    return render_template('admin/login.html', error=error)

@app.route('/admin/logout')
def admin_logout():
    session.pop('is_admin', None)
    return redirect(url_for('index'))

# Admin CRUD routes
@app.route('/admin/dashboard')
def admin_dashboard():
    check_admin()
    filter_val = request.args.get('filter', 'all').strip()
    
    if filter_val == 'pinned':
        dashboard_products = Product.query.filter(Product.category.like('Pinned%')).all()
    elif filter_val == 'normal':
        dashboard_products = Product.query.filter_by(category='Normal').all()
    else:
        dashboard_products = Product.query.all()
        
    pinned_1 = Product.query.filter_by(category='Pinned 1').first()
    pinned_2 = Product.query.filter_by(category='Pinned 2').first()
    pinned_3 = Product.query.filter_by(category='Pinned 3').first()
    
    # Security tracking data
    failed_attempts = LoginAttempt.query.filter_by(success=False).order_by(LoginAttempt.timestamp.desc()).limit(20).all()
    blocked_ips = BlockedIP.query.order_by(BlockedIP.blocked_at.desc()).all()
    
    return render_template(
        'admin/dashboard.html', 
        products=dashboard_products, 
        current_filter=filter_val,
        pinned_1=pinned_1,
        pinned_2=pinned_2,
        pinned_3=pinned_3,
        failed_attempts=failed_attempts,
        blocked_ips=blocked_ips,
        error_msg=request.args.get('error')
    )

@app.route('/admin/block-ip', methods=['POST'])
def block_ip():
    check_admin()
    ip_to_block = request.form.get('ip_address', '').strip()
    if ip_to_block:
        if ip_to_block == get_client_ip():
            return redirect(url_for('admin_dashboard', error="You cannot block your own current IP address!"))
        
        existing = BlockedIP.query.filter_by(ip_address=ip_to_block).first()
        if not existing:
            db.session.add(BlockedIP(ip_address=ip_to_block))
            db.session.commit()
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/unblock-ip', methods=['POST'])
def unblock_ip():
    check_admin()
    ip_to_unblock = request.form.get('ip_address', '').strip()
    if ip_to_unblock:
        blocked = BlockedIP.query.filter_by(ip_address=ip_to_unblock).first()
        if blocked:
            db.session.delete(blocked)
            db.session.commit()
    return redirect(url_for('admin_dashboard'))


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
        category = request.form.get('category', 'Normal').strip()
        
        # Parse numeric values safely
        try:
            price = float(price_val)
        except ValueError:
            price = 0.0
        try:
            stock = int(stock_val)
        except ValueError:
            stock = 0
            
        # Primary image upload
        image_filename = None
        file = request.files.get('image')
        if file and file.filename != '' and allowed_file(file.filename):
            image_filename = save_file(file)

        # ponytail: swap logic - demote previous product in the same slot to 'Normal'
        if category in ['Pinned 1', 'Pinned 2', 'Pinned 3']:
            existing = Product.query.filter_by(category=category).first()
            if existing:
                existing.category = 'Normal'

        new_prod = Product(
            name=name,
            description=description,
            price=price,
            stock=stock,
            image_filename=image_filename,
            where_to_get=where_to_get,
            instagram_url=instagram_url,
            phone=phone,
            category=category
        )
        db.session.add(new_prod)
        db.session.flush()

        # Gallery images
        for gfile in request.files.getlist('gallery_images'):
            if gfile and gfile.filename != '' and allowed_file(gfile.filename):
                gname = save_file(gfile)
                db.session.add(ProductImage(product_id=new_prod.id, filename=gname))

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
        category = request.form.get('category', 'Normal').strip()
        
        # ponytail: swap logic - demote previous product in the same slot to 'Normal'
        if category in ['Pinned 1', 'Pinned 2', 'Pinned 3']:
            existing = Product.query.filter_by(category=category).first()
            if existing and existing.id != product.id:
                existing.category = 'Normal'
        product.category = category
        
        try:
            product.price = float(request.form.get('price', '0'))
        except ValueError:
            product.price = 0.0
        try:
            product.stock = int(request.form.get('stock', '0'))
        except ValueError:
            product.stock = 0

        # Handle optional image deletion
        if request.form.get('delete_image') == '1':
            if product.image_filename:
                old_path = os.path.join(app.config['UPLOAD_FOLDER'], product.image_filename)
                if os.path.exists(old_path):
                    try:
                        os.remove(old_path)
                    except OSError:
                        pass
                product.image_filename = None

        # Handle optional new primary image upload
        file = request.files.get('image')
        if file and file.filename != '' and allowed_file(file.filename):
            if product.image_filename:
                old_path = os.path.join(app.config['UPLOAD_FOLDER'], product.image_filename)
                if os.path.exists(old_path):
                    try:
                        os.remove(old_path)
                    except OSError:
                        pass
            product.image_filename = save_file(file)

        # Gallery images — add new ones
        for gfile in request.files.getlist('gallery_images'):
            if gfile and gfile.filename != '' and allowed_file(gfile.filename):
                gname = save_file(gfile)
                db.session.add(ProductImage(product_id=product.id, filename=gname))

        db.session.commit()
        return redirect(url_for('admin_dashboard'))

    return render_template('admin/edit_product.html', product=product)

@app.route('/admin/delete-product/<int:product_id>', methods=['POST'])
def delete_product(product_id):
    check_admin()
    product = Product.query.get_or_404(product_id)

    for filename in product.all_filenames:
        path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        if os.path.exists(path):
            try:
                os.remove(path)
            except OSError:
                pass

    db.session.delete(product)
    db.session.commit()
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/delete-gallery-image/<int:image_id>', methods=['POST'])
def delete_gallery_image(image_id):
    check_admin()
    img = ProductImage.query.get_or_404(image_id)
    product_id = img.product_id
    path = os.path.join(app.config['UPLOAD_FOLDER'], img.filename)
    if os.path.exists(path):
        try:
            os.remove(path)
        except OSError:
            pass
    db.session.delete(img)
    db.session.commit()
    return redirect(url_for('edit_product', product_id=product_id))

@app.route('/admin/settings', methods=['GET', 'POST'])
def admin_settings():
    check_admin()
    settings = SiteSettings.query.get(1)
    if not settings:
        settings = SiteSettings(id=1)
        db.session.add(settings)
        db.session.commit()

    if request.method == 'POST':
        settings.phone = request.form.get('phone', '').strip() or None
        settings.instagram_url = request.form.get('instagram_url', '').strip() or None
        settings.facebook_url = request.form.get('facebook_url', '').strip() or None
        settings.email = request.form.get('email', '').strip() or None
        db.session.commit()
        return redirect(url_for('admin_settings'))

    return render_template('admin/settings.html', settings=settings)

if __name__ == '__main__':
    # ponytail: simple sqlite initialisation in app if not seeded
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)
