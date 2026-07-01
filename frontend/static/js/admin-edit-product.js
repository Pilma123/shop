// Product image delete toggle
var removeProductImageBtn = document.getElementById('btn-remove-product-image');
if (removeProductImageBtn) {
    removeProductImageBtn.addEventListener('click', function () {
        var checkbox = document.getElementById('delete_image');
        var container = document.getElementById('product-image-container');
        checkbox.checked = !checkbox.checked;
        if (checkbox.checked) {
            container.classList.add('marked-delete');
            this.innerHTML = '&#8634;';
            this.title = "Undo remove";
            this.style.background = "rgba(40, 167, 69, 0.85)";
        } else {
            container.classList.remove('marked-delete');
            this.innerHTML = '&times;';
            this.title = "Remove image";
            this.style.background = "rgba(220, 53, 69, 0.85)";
        }
    });
}

// Gallery image deletion via hidden form (avoids nested forms)
document.querySelectorAll('.remove-gallery-btn').forEach(function(btn) {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (confirm('Are you sure you want to remove this gallery image?')) {
            var form = document.getElementById('delete-gallery-form');
            form.action = '/admin/delete-gallery-image/' + this.dataset.imageId;
            form.submit();
        }
    });
});
