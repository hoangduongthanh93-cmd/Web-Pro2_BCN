document.addEventListener("DOMContentLoaded", () => {
    const chiTietSanPham = document.getElementById("chiTietSanPham");
    const khoagiaTri = new URLSearchParams(window.location.search);
    const IdSanPham = khoagiaTri.get("id");
    if (!IdSanPham) {
        chiTietSanPham.innerHTML = `<p class="error-text">Không tìm thấy mã sản phẩm.</p>`;
        return;
    }
    fetch("http://localhost:3000/sanpham")
        .then(response => {
            if (!response.ok) {
                throw new Error("Không thể kết nối đến server.");
            }
            return response.json();
        })
        .then(products => {
            const product = products.find(p => 
                String(p.maSanPham) === String(IdSanPham) || String(p.id) === String(IdSanPham)
            );

            if (product) {
                renderChiTietSP(product);
            } else {
                chiTietSanPham.innerHTML = `<p class="error-text">Sản phẩm không tồn tại.</p>`;
            }
        })
        .catch(error => {
            console.error("Lỗi:", error);
            chiTietSanPham.innerHTML = `<p class="error-text">Không thể kết nối đến json-server.</p>`;
        });
    function renderChiTietSP(product) {
        chiTietSanPham.innerHTML = `
            <div class="bocTheAnh">
                <img src="${product.hinhAnh}" alt="${product.Ten}">
            </div>
            <div class="ThongtinSP">
                <h1 class="TuadeSP">${product.Ten}</h1>
                <p class="GiaSP">${Number(product.Gia).toLocaleString("vi-VN")} đ</p>
                <p class="MotaSP">${product.moTa || "Chất liệu cao cấp thiết kế độc quyền mang lại sự thoải mái và sang trọng cho người mặc."}</p>
                
                <div class="NhomLuachon_kichco">
                    <div class="size-header">
                        <span class="Tuade_Luachon">Kích thước sản phẩm</span>
                        <span class="BanLuachon_kichco">Bảng kích thước</span>
                    </div>
                    <div class="luachonKichco" id="luachon-Kichco">
                        <button class="nut_luachonkichco" data-size="XS">XS</button>
                        <button class="nut_luachonkichco" data-size="S">S</button>
                        <button class="nut_luachonkichco active" data-size="M">M</button>
                        <button class="nut_luachonkichco" data-size="L">L</button>
                        <button class="nut_luachonkichco" data-size="XL">XL</button>
                    </div>
                </div>

                <button class="nut_ThemvaogioHang" id="Them_vaogiohang">Thêm vào giỏ hàng</button>
            </div>
        `;
        const nut_chonSize = document.querySelectorAll(".nut_luachonkichco");
        let selectedSize = "M";
        nut_chonSize.forEach(btn => {
            btn.addEventListener("click", () => {
                nut_chonSize.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                selectedSize = btn.getAttribute("data-size");
            });
        });
        const Them_vaogiohang = document.getElementById("Them_vaogiohang");
        Them_vaogiohang.addEventListener("click", () => {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            
            const itemKey = `${product.maSanPham || product.id}-${selectedSize}`;
            const existing = cart.find(p => p.cartId === itemKey);

            if (existing) {
                existing.soLuong = (existing.soLuong || 1) + 1;
            } else {
                cart.push({
                    ...product,
                    cartId: itemKey,
                    selectedSize: selectedSize,
                    soLuong: 1
                });
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`Đã thêm "${product.Ten}" (Size: ${selectedSize}) vào giỏ hàng thành công!`);
        });
    }
});