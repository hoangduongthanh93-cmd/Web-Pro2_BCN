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

// JS và JSON cho phần sản phẩm
document.addEventListener("DOMContentLoaded", function () {
    const productGrid = document.querySelector(".product-grid"); // Chọn đúng class khung chứa sản phẩm của bạn

    if (!productGrid) return;

    // Gọi API (GET) từ json-server với endpoint "sanpham"
    fetch("http://localhost:3000/sanpham")
        .then(response => {
            if (!response.ok) {
                throw new Error("Lỗi kết nối tới server!");
            }
            return response.json();
        })
        .then(data => {
            // Xóa nội dung mẫu tĩnh cũ (nếu có)
            productGrid.innerHTML = "";

            // Duyệt mảng sản phẩm từ JSON và tạo thẻ HTML tương ứng
            data.forEach(item => {
                const card = document.createElement("div");
                card.className = "product-card";

                // Gắn sự kiện click chuyển sang trang chi tiết kèm theo mã sản phẩm (ID)
                card.addEventListener("click", () => {
                    window.location.href = `product-detail.html?id=${item.maSanPham}`;
                });

card.innerHTML = `
    <div class="product-img">
        <img src="${item.hinhAnh}" alt="${item.Ten}">
        <button class="quick-add" onclick="event.stopPropagation()">+</button>
    </div>
    <div class="product-details">
        <h4 class="product-name">${item.Ten}</h4>
        <span class="product-price">${Number(item.Gia).toLocaleString('vi-VN')}đ</span>
    </div>
`;

                productGrid.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Không thể tải dữ liệu sản phẩm:", error);
        });
});