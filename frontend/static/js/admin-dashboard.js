document.querySelectorAll('.delete-product-form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
        if (!confirm('Are you sure you want to delete this product?')) {
            e.preventDefault();
        }
    });
});

document.querySelectorAll('.block-ip-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        if (!confirm('Block all admin access for IP ' + this.dataset.ip + '?')) {
            e.preventDefault();
        }
    });
});
