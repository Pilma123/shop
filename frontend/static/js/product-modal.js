// Mobile menu toggle
var mobileMenuBtn = document.getElementById('mobile-menu-btn');
var mobileNavMenu = document.getElementById('mobile-nav-menu');
mobileMenuBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    mobileNavMenu.classList.toggle('open');
});
document.addEventListener('click', function(e) {
    if (!mobileNavMenu.contains(e.target) && e.target !== mobileMenuBtn) {
        mobileNavMenu.classList.remove('open');
    }
});

// Carousel state
var carouselImgs = [];
var carouselIdx = 0;

function goTo(idx) {
    var imgs = document.querySelectorAll('#modal-carousel .carousel-img');
    var dots = document.querySelectorAll('#carousel-dots .carousel-dot');
    if (!imgs.length) return;
    imgs[carouselIdx].classList.remove('active');
    if (dots[carouselIdx]) dots[carouselIdx].classList.remove('active');
    carouselIdx = ((idx % carouselImgs.length) + carouselImgs.length) % carouselImgs.length;
    imgs[carouselIdx].classList.add('active');
    if (dots[carouselIdx]) dots[carouselIdx].classList.add('active');
}

document.getElementById('carousel-prev').addEventListener('click', function(e) {
    e.stopPropagation();
    goTo(carouselIdx - 1);
});
document.getElementById('carousel-next').addEventListener('click', function(e) {
    e.stopPropagation();
    goTo(carouselIdx + 1);
});

// Modal logic
var modal = document.getElementById('product-modal');
var overlay = document.getElementById('modal-overlay');
var closeBtn = document.getElementById('modal-close');
var carousel = document.getElementById('modal-carousel');
var dotsEl = document.getElementById('carousel-dots');
var noImgEl = document.getElementById('modal-no-image');
var prevBtn = document.getElementById('carousel-prev');
var nextBtn = document.getElementById('carousel-next');

document.querySelectorAll('.product-clickable').forEach(function(card) {
    card.addEventListener('click', function() {
        var d = card.dataset;

        document.getElementById('modal-name').textContent = d.name || '';
        document.getElementById('modal-price').textContent = d.price ? '$' + d.price : '';
        document.getElementById('modal-desc').textContent = d.description || '';
        var whereEl = document.getElementById('modal-where');
        whereEl.textContent = d.where ? 'Available at: ' + d.where : '';
        whereEl.style.display = d.where ? '' : 'none';

        var actionsEl = document.getElementById('modal-actions');
        actionsEl.innerHTML = '';
        if (d.instagram) {
            var ig = document.createElement('a');
            ig.href = d.instagram; ig.target = '_blank';
            ig.className = 'modal-btn modal-btn-ig';
            ig.textContent = 'Instagram';
            actionsEl.appendChild(ig);
        }
        if (d.phone) {
            var ph = document.createElement('a');
            ph.href = 'tel:' + d.phone;
            ph.className = 'modal-btn modal-btn-order';
            ph.textContent = 'Order';
            actionsEl.appendChild(ph);
        }

        var gallery = [];
        try { gallery = JSON.parse(d.gallery || '[]'); } catch(e) {}
        carouselImgs = gallery;
        carouselIdx = 0;
        carousel.innerHTML = '';
        dotsEl.innerHTML = '';

        if (gallery.length === 0) {
            noImgEl.style.display = 'flex';
            carousel.style.display = 'none';
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            dotsEl.style.display = 'none';
        } else {
            noImgEl.style.display = 'none';
            carousel.style.display = 'block';
            var showNav = gallery.length > 1;
            prevBtn.style.display = showNav ? '' : 'none';
            nextBtn.style.display = showNav ? '' : 'none';
            dotsEl.style.display = showNav ? '' : 'none';

            gallery.forEach(function(url, i) {
                var img = document.createElement('img');
                img.src = url;
                img.className = 'carousel-img' + (i === 0 ? ' active' : '');
                carousel.appendChild(img);

                if (showNav) {
                    var dot = document.createElement('span');
                    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
                    dot.addEventListener('click', function(e) { e.stopPropagation(); goTo(i); });
                    dotsEl.appendChild(dot);
                }
            });
        }

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
}
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Lightbox
var lightbox = document.getElementById('image-lightbox');
var lightboxImg = document.getElementById('lightbox-img');
var lightboxCounter = document.getElementById('lightbox-counter');
var lightboxIdx = 0;

function updateLightbox() {
    lightboxImg.src = carouselImgs[lightboxIdx];
    lightboxCounter.textContent = carouselImgs.length > 1 ? (lightboxIdx + 1) + ' / ' + carouselImgs.length : '';
    document.getElementById('lightbox-prev').style.display = carouselImgs.length > 1 ? '' : 'none';
    document.getElementById('lightbox-next').style.display = carouselImgs.length > 1 ? '' : 'none';
}

function openLightbox() {
    if (!carouselImgs.length) return;
    lightboxIdx = carouselIdx;
    updateLightbox();
    lightbox.classList.add('open');
}

function closeLightbox() {
    lightbox.classList.remove('open');
}

document.querySelector('.modal-image-side').addEventListener('click', function(e) {
    if (!e.target.closest('.carousel-btn') && !e.target.closest('.carousel-dots')) {
        openLightbox();
    }
});

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
});
document.getElementById('lightbox-prev').addEventListener('click', function(e) {
    e.stopPropagation();
    lightboxIdx = ((lightboxIdx - 1 + carouselImgs.length) % carouselImgs.length);
    updateLightbox();
});
document.getElementById('lightbox-next').addEventListener('click', function(e) {
    e.stopPropagation();
    lightboxIdx = ((lightboxIdx + 1) % carouselImgs.length);
    updateLightbox();
});

document.addEventListener('keydown', function(e) {
    if (lightbox.classList.contains('open')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') { lightboxIdx = ((lightboxIdx - 1 + carouselImgs.length) % carouselImgs.length); updateLightbox(); }
        if (e.key === 'ArrowRight') { lightboxIdx = ((lightboxIdx + 1) % carouselImgs.length); updateLightbox(); }
        return;
    }
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft' && modal.classList.contains('open')) goTo(carouselIdx - 1);
    if (e.key === 'ArrowRight' && modal.classList.contains('open')) goTo(carouselIdx + 1);
});
