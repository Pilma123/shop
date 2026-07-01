(function () {
    var fileInput = document.getElementById('image');
    var editor = document.getElementById('image-editor');
    var canvas = document.getElementById('preview-canvas');
    var ctx = canvas.getContext('2d');
    var wInput = document.getElementById('resize-width');
    var hInput = document.getElementById('resize-height');
    var lockCb = document.getElementById('lock-ratio');
    var form = document.getElementById('product-form');

    var originalImg = null;
    var ratio = 1;

    fileInput.addEventListener('change', function () {
        var file = this.files[0];
        if (!file) { editor.style.display = 'none'; return; }
        var reader = new FileReader();
        reader.onload = function (e) {
            originalImg = new Image();
            originalImg.onload = function () {
                ratio = originalImg.naturalWidth / originalImg.naturalHeight;
                wInput.value = originalImg.naturalWidth;
                hInput.value = originalImg.naturalHeight;
                drawCanvas(originalImg.naturalWidth, originalImg.naturalHeight);
                editor.style.display = 'block';
            };
            originalImg.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });

    wInput.addEventListener('input', function () {
        if (lockCb.checked) hInput.value = Math.round(this.value / ratio);
        drawCanvas(parseInt(wInput.value) || 1, parseInt(hInput.value) || 1);
    });

    hInput.addEventListener('input', function () {
        if (lockCb.checked) wInput.value = Math.round(this.value * ratio);
        drawCanvas(parseInt(wInput.value) || 1, parseInt(hInput.value) || 1);
    });

    function drawCanvas(w, h) {
        if (!originalImg) return;
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(originalImg, 0, 0, w, h);
    }

    form.addEventListener('submit', function (e) {
        if (!originalImg || !fileInput.files.length) return;
        e.preventDefault();
        var w = parseInt(wInput.value) || originalImg.naturalWidth;
        var h = parseInt(hInput.value) || originalImg.naturalHeight;
        var offscreen = document.createElement('canvas');
        offscreen.width = w;
        offscreen.height = h;
        offscreen.getContext('2d').drawImage(originalImg, 0, 0, w, h);
        offscreen.toBlob(function (blob) {
            var resizedFile = new File([blob], 'product_image.jpg', { type: 'image/jpeg' });
            var dt = new DataTransfer();
            dt.items.add(resizedFile);
            fileInput.files = dt.files;
            form.submit();
        }, 'image/jpeg', 0.92);
    });
})();

// Gallery preview
document.getElementById('gallery_images').addEventListener('change', function () {
    var preview = document.getElementById('gallery-preview');
    preview.innerHTML = '';
    Array.from(this.files).forEach(function (file) {
        var img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.style.cssText = 'width:80px;height:80px;object-fit:cover;border-radius:4px;border:1px solid #ccc;';
        preview.appendChild(img);
    });
});
