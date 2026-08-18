document.addEventListener("DOMContentLoaded", () => {
    renderGioHang();
});

function renderGioHang() {
    const cartContent = document.getElementById("Giohang");
    if (!cartContent) return;

    let gioHang = JSON.parse(localStorage.getItem("cart")) || [];

    if (gioHang.length === 0) {
        cartContent.innerHTML = `
            <div class="Giohang_ChuacoSP">
                <p>Giỏ hàng của bạn đang trống.</p>
                <a href="trangdanhsachSP.html">Khám phá sản phẩm ngay</a>
            </div>
        `;
        return;
    }

    let html = `
        <div class="gioHang-layout">
            <div class="Sanpham_daluuquaLocalStorage">
    `;

    let subtotal = 0;

    gioHang.forEach((item, index) => {
        const itemTotal = item.Gia * item.soLuong;
        subtotal += itemTotal;

        html += `
            <div class="GioHang_item">
                <img src="${item.hinhAnh}" alt="${item.Ten}">
                <div class="ThongTinGioHang">
                    <span class="SanPham-name">${item.Ten}</span>
                    <span class="Sanpham-price">${Number(item.Gia).toLocaleString("vi-VN")} đ</span>
                    <div class="O_action">
                        <div class="KiemsoatSL">
                            <button onclick="CapnhatSL(${index}, -1)">-</button>
                            <span>${item.soLuong}</span>
                            <button onclick="CapnhatSL(${index}, 1)">+</button>
                        </div>
                        <button class="XoaSP" onclick="XoakhoiGioHang(${index})">Xóa</button>
                    </div>
                </div>
            </div>
        `;
    });

    html += `
            </div>
            <div class="TongDonHang">
                <h3>Tổng đơn hàng</h3>
                <div class="TamTinh">
                    <span>Tạm tính</span>
                    <span>${Number(subtotal).toLocaleString("vi-VN")} đ</span>
                </div>
                <div class="TamTinh">
                    <span>Phí vận chuyển</span>
                    <span>Miễn phí</span>
                </div>
                <div class="TamTinh total-row">
                    <span>Thành tiền</span>
                    <span>${Number(subtotal).toLocaleString("vi-VN")} đ</span>
                </div>
                <button class="Nut_thanhtoan" onclick="TinhTien()">Thanh toán ngay</button>
            </div>
        </div>
    `;

    cartContent.innerHTML = html;
}

function CapnhatSL(index, change) {
    let gioHang = JSON.parse(localStorage.getItem("cart")) || [];
    gioHang[index].soLuong += change;

    if (gioHang[index].soLuong <= 0) {
        gioHang.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(gioHang));
    renderGioHang();
}

function XoakhoiGioHang(index) {
    let gioHang = JSON.parse(localStorage.getItem("cart")) || [];
    gioHang.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(gioHang));
    renderGioHang();
    if (typeof showToast === "function") {
        showToast("Đã xóa sản phẩm khỏi giỏ hàng", "success");
    }
}

function TinhTien() {
    let gioHang = JSON.parse(localStorage.getItem("cart")) || [];
    if (gioHang.length === 0) return;

    localStorage.removeItem("cart");
    if (typeof showToast === "function") {
        showToast("Đặt hàng thành công! Cảm ơn bạn đã mua sắm.", "success");
    } else {
        alert("Đặt hàng thành công!");
    }
    setTimeout(() => {
        window.location.href = "trangchu.html";
    }, 1500);
}