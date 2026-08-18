document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    header.innerHTML = `
    <div class="site-header">
        <div class="top-bar">
            <span>Complimentary U.S. No-Rush Shipping on orders of $145 or more.</span>
            <a href="#">Shop Now</a>
        </div>

        <header class="navbar">
            <button class="menu-toggle" id="mobile-menu" aria-label="Toggle Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <a href="../HTML/trangchu.html" class="logo">CEIN.</a>

            <nav class="nav-links">
                <a href="../HTML/trangdanhsachSP.html">Shop</a>
                <a href="../HTML/comingsoon.html">New Arrivals</a>
                <a href="../HTML/comingsoon.html">Sale</a>
                <a href="../HTML/comingsoon.html">Journal</a>
            </nav>

            <div class="nav-icons">
                <div class="thanhtimkiem">
                    <input id="NhapvaoTimkiem" type="text" placeholder="Tìm kiếm sản phẩm...">
                    <button type="submit" class="nutTimKiem">
                        <img src="../img/iconHeader/MagnifyingGlass.svg" alt="icon tìm kiếm">
                    </button>
                    <div id="Ketquatimkiem"></div>
                </div>

                <div class="user-account-area">
                    ${currentUser ? `
                        <div class="user-logged-in">
                            <span class="user-greeting">Hi, ${currentUser.name}</span>
                            <button id="logoutBtn" class="logout-btn" title="Đăng xuất">Đăng xuất</button>
                        </div>
                    ` : `
                        <a href="../HTML/trangdangnhap.html" class="icon-link">
                            <img src="../img/iconHeader/UserCircle.svg" alt="User">
                        </a>
                    `}
                </div>

                <a href="../HTML/tranggioHang.html" class="icon-link cart-icon-wrapper" style="display: ${currentUser ? 'flex' : 'none'};">
                    <img src="../img/iconHeader/Heart.svg" alt="Heart">
                </a>
                <a href="../HTML/tranggioHang.html" class="icon-link cart-icon-wrapper" style="display: ${currentUser ? 'flex' : 'none'};">
                    <img src="../img/iconHeader/Bag.svg" alt="Bag">
                </a>
            </div>
        </header>
    </div>
    `;

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            showToast("Đã đăng xuất thành công!", "success");
            setTimeout(() => {
                window.location.reload();
            }, 1200);
        });
    }

    const footer = document.getElementById("footer");
    if (footer) {
        footer.innerHTML = `
        <footer class="site-footer">
            <div class="footer-container">
                <div class="footer-col brand-col">
                    <span class="footer-logo">CEIN.</span>
                    <p>Timeless fashion crafted for longevity and sustainability.</p>
                </div>

                <div class="footer-col">
                    <h4>Shop</h4>
                    <ul>
                        <li><a href="#">New Arrivals</a></li>
                        <li><a href="#">Best-Sellers</a></li>
                        <li><a href="#">Clothing</a></li>
                        <li><a href="#">Accessories</a></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <h4>Help</h4>
                    <ul>
                        <li><a href="#">Customer Service</a></li>
                        <li><a href="#">Shipping & Returns</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Stores</a></li>
                    </ul>
                </div>

                <div class="footer-col newsletter-col">
                    <h4>Join Us</h4>
                    <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
                    <form class="newsletter-form">
                        <input type="email" placeholder="Enter your email" required>
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2026 CEIN. All rights reserved.</p>
            </div>
        </footer>
        `;
    }

    const nutTimKiem = document.querySelector('.nutTimKiem');
    const thanhTimKiem = document.querySelector('.thanhtimkiem');
    const NhapvaoTimkiem = document.getElementById("NhapvaoTimkiem");
    const Ketquatimkiem = document.getElementById("Ketquatimkiem");
    let danhSachSanPham = [];

    if (nutTimKiem && thanhTimKiem) {
        nutTimKiem.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            thanhTimKiem.classList.toggle('active');
            if (thanhTimKiem.classList.contains('active')) {
                NhapvaoTimkiem.focus();
            } else {
                Ketquatimkiem.style.display = "none";
                NhapvaoTimkiem.value = "";
            }
        });
        thanhTimKiem.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    fetch("http://localhost:3000/sanpham")
        .then(response => response.json())
        .then(data => {
            danhSachSanPham = data;
        })
        .catch(error => {
            console.error("Không tải dữ liệu được", error);
        });

    if (NhapvaoTimkiem) {
        NhapvaoTimkiem.addEventListener("input", (event) => {
            const Tukhoa = event.target.value.toLowerCase().trim();
            if (Tukhoa === "") {
                Ketquatimkiem.innerHTML = "";
                Ketquatimkiem.style.display = "none";
                return;
            }
            const KetquaSP = danhSachSanPham.filter(item => {
                const thongtinSp_Name = item.Ten ? item.Ten.toLowerCase().trim() : "";
                const thongtinSp_Description = item.moTa ? item.moTa.toLowerCase().trim() : "";
                return (thongtinSp_Name.includes(Tukhoa) || thongtinSp_Description.includes(Tukhoa));
            });
            Ketquatimkiem.innerHTML = "";
            
            if (KetquaSP.length === 0) {
                Ketquatimkiem.innerHTML = `<div class="KhongCoThongtinTimKiem"><p>Không tìm thấy sản phẩm</p></div>`;
            } else {
                const TongSoDiv = document.createElement("div");
                TongSoDiv.classList.add("TongSoKetQua");
                TongSoDiv.innerHTML = `
                    <span>${KetquaSP.length} results</span>
                    <a href="trangdanhsachSP.html?tuKhoa=${encodeURIComponent(Tukhoa)}" class="view-all-link">View all</a>
                `;
                Ketquatimkiem.appendChild(TongSoDiv);
                
                const DanhSachNgangDiv = document.createElement("div");
                DanhSachNgangDiv.classList.add("danhsach-ngang");
                KetquaSP.forEach(item => {
                    const ThongTinSP_Datimduoc = document.createElement("div");
                    ThongTinSP_Datimduoc.classList.add("Sanphamtimduoc");
                    ThongTinSP_Datimduoc.innerHTML = `
                        <img src="${item.hinhAnh}" alt="${item.Ten}">
                        <div class="thongTinTimKiem">
                            <span class="TenSPcanTim">${item.Ten}</span>
                            <span class="GiaCuaSP">${Number(item.Gia).toLocaleString("vi-VN")} đ</span>
                        </div>
                    `;
                    ThongTinSP_Datimduoc.addEventListener("click", () => {
                        window.location.href = `TrangchitietSP.html?id=${item.maSanPham}`;
                    });
                    DanhSachNgangDiv.appendChild(ThongTinSP_Datimduoc);
                });
                Ketquatimkiem.appendChild(DanhSachNgangDiv);
            }
            Ketquatimkiem.style.display = "block";
        });
    }

    document.addEventListener("click", (event) => {
        if (thanhTimKiem && !event.target.closest(".thanhtimkiem")) {
            thanhTimKiem.classList.remove('active');
            if (Ketquatimkiem) {
                Ketquatimkiem.style.display = "none";
            }
        }
    });
});

function showToast(message, type = "success") {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}