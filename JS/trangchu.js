document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".hero-slider .slide");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;

    // Hàm chuyển slide theo index
    function goToSlide(index) {
        slides[currentIndex].classList.remove("active");
        currentIndex = (index + totalSlides) % totalSlides;
        slides[currentIndex].classList.add("active");
    }

    // Chuyển slide tiếp theo
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    // Chuyển slide trước đó
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Gắn sự kiện cho nút bấm
    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoPlay();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoPlay();
    });

    // Tính năng Auto-play (tự động chạy mỗi 4 giây)
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 4000);
    }

    // Reset lại thời gian auto-play khi người dùng bấm nút thủ công
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Khởi chạy auto-play lần đầu
    startAutoPlay();
});