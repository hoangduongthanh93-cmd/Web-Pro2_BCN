function themHeader() {
    const header = document.getElementById("header")

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

        <a href="#" class="logo">CEIN.</a>

        <nav class="nav-links">
            <a href="../HTML/trangdanhsachSP.html">Shop</a>
            <a href="../HTML/sanphamMoi.html">New Arrivals</a>
            <a href="../HTML/sanphamSale.html">Sale</a>
            <a href="../HTML/trangbaiViet.html">Journal</a>
        </nav>

        <div class="nav-icons">
            <a href="#" class="icon-link"><img src="../img/iconHeader/MagnifyingGlass.svg" alt="Search"></a>
            <a href="#" class="icon-link"><img src="../img/iconHeader/UserCircle.svg" alt="User"></a>
            <a href="" class="icon-link" id="theme-toggle"><img src="../img/iconHeader/Heart.svg" alt="Heart"></a>
            <a href="#" class="icon-link"><img src="../img/iconHeader/Bag.svg" alt="Bag"></a>

        </div>
    </header>
`;
    }