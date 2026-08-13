
    const header = document.getElementById("header");

    header.innerHTML=`    <div class="top-bar">
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
            <a href="../HTML/sanphamMoi.html">New Arrivals</a>
            <a href="../HTML/sanphamSale.html">Sale</a>
            <a href="../HTML/trangbaiViet.html">Journal</a>
        </nav>

        <div class="nav-icons">
            <div class="thanhtimkiem">
            <input id="NhapvaoTimkiem" type="text" placeholder="Tìm kiếm sản phẩm...">
            <button type="submit" class="nutTimKiem">
            <img src="../img/iconHeader/MagnifyingGlass.svg" alt="icon tìm kiếm">
            </button>
            <div id="Ketquatimkiem"></div>
            </div>
            <a href="#" class="icon-link"><img src="../img/iconHeader/UserCircle.svg" alt="User"></a>
            <a href="" class="icon-link" id="theme-toggle"><img src="../img/iconHeader/Heart.svg" alt="Heart"></a>
            <a href="#" class="icon-link"><img src="../img/iconHeader/Bag.svg" alt="Bag"></a>

        </div>
    </header>
`;
const footer = document.getElementById("footer");
footer.innerHTML=`
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
document.addEventListener("DOMContentLoaded", () => {
    const NhapvaoTimkiem = document.getElementById("NhapvaoTimkiem");
    const Ketquatimkiem = document.getElementById("Ketquatimkiem");
    let danhSachSanPham = [];
    fetch("http://localhost:3000/sanpham").then(response => response.json()).then(data => {
            danhSachSanPham = data;
        })
        .catch(error => {
            console.error("không tải dữ liệu được",error );});
            NhapvaoTimkiem.addEventListener("input",(event)=>{
                const Tukhoa=event.target.value.toLowerCase().trim();
                if (Tukhoa === ""){
                    Ketquatimkiem.innerHTML="";
                    Ketquatimkiem.style.display="none";
                    return null;
                }
            
            const KetquaSP = danhSachSanPham.filter(item=>{
                const thongtinSp_Name=item.Ten.toLowerCase().trim();
                const thongtinSp_Description=item.moTa ? item.moTa.toLowerCase().trim() : "";
                return(thongtinSp_Name.includes(Tukhoa) || thongtinSp_Description.includes(Tukhoa));
            });
            Ketquatimkiem.innerHTML="";
            if(KetquaSP.length===0){
                Ketquatimkiem.innerHTML=`<div class="KhongCoThongtinTimKiem"><p>Không tìm thấy sản phẩm</p></div>`;
            }
            else{
                KetquaSP.forEach(item =>{
                    const ThongTinSP_Datimduoc = document.createElement("div");
                    ThongTinSP_Datimduoc.classList.add("Sanphamtimduoc");
                    ThongTinSP_Datimduoc.innerHTML=`
                    <img src="${item.hinhAnh}" alt="${item.Ten}">
                    <div class="thongTinTimKiem">
                    <span class="TenSPcanTim">${item.Ten}</span>
                    <span class ="GiaCuaSP">${Number(item.Gia).toLocaleString("vi-VN")}</span>
                    </div>
                    `;
            item.addEventListener("click", () => {
            window.location.href = `TrangchitietSP.html?id=${sanpham.maSanPham}`;
        });
                    Ketquatimkiem.appendChild(ThongTinSP_Datimduoc);
                });
            }
            Ketquatimkiem.style.display="block";
        });
            document.addEventListener("click",(event)=> {
            if(!event.target.closest(".thanhtimkiem")){
                Ketquatimkiem.style.display="none";}    
            });
            Ketquatimkiem.addEventListener("focus",()=>{
                const Tukhoa = NhapvaoTimkiem.value.trim();
                if(Tukhoa !== ""){
                    Ketquatimkiem.style.display="block";
                }
            });
            
        });
