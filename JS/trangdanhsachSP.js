document.addEventListener("DOMContentLoaded", function () {

    const slides = document.querySelectorAll(".truotanh-slide");
    const nutPrev = document.querySelector(".prev-btn");
    const nutNext = document.querySelector(".next-btn");
    let viTriHienTai = 0;
    slides[viTriHienTai].classList.add("active");
    function hienThiSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove("active");
        });
        slides[index].classList.add("active");
    }
    nutPrev.addEventListener("click", function () {
        viTriHienTai--;
        if (viTriHienTai < 0) {
            viTriHienTai = slides.length - 1;
        }
        hienThiSlide(viTriHienTai);
    });
    nutNext.addEventListener("click", function () {
        viTriHienTai++;
        if (viTriHienTai >= slides.length) {
            viTriHienTai = 0;
        }
        hienThiSlide(viTriHienTai);
    });
    setInterval(function () {
        viTriHienTai++;
        if (viTriHienTai >= slides.length) {
            viTriHienTai = 0;
        }
        hienThiSlide(viTriHienTai);
    }, 5000);
});