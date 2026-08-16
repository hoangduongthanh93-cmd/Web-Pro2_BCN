document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("productGrid");
    const nutGoiY = document.querySelectorAll("#MucgoiY button");
    const NutSapxep = document.getElementById("NutSapxep");
    const CuonSapxep = document.getElementById("CuonSapxep");
    const sortOptions = document.querySelectorAll("#CuonSapxep > div");
    const filterBtn = document.getElementById("NutLocGiaTien");
    const filterDropdown = document.getElementById("nutLoc-Dropdown");
    const priceRadios = document.querySelectorAll("input[name='GiaTien']");
    let danhSachSanPham = [];
    let currentCategory = "all";
    let currentSort = "MoiNhat";
    let currentPriceRange = "all";
    fetch("http://localhost:3000/sanpham")
        .then(res => res.json())
        .then(data => {
            danhSachSanPham = data;
            renderProducts(danhSachSanPham);
        })
        .catch(err => {
            console.log("Lỗi tải sản phẩm:", err);
            productGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #666;">Không thể tải dữ liệu sản phẩm.</p>`;
        });
    function renderProducts(products) {
        productGrid.innerHTML = "";
        if (products.length === 0) {
            productGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #666; padding: 40px 0;">Không tìm thấy sản phẩm phù hợp.</p>`;
            return;
        }
        products.forEach(item => {
            const productCard = document.createElement("div");
            productCard.classList.add("Item-SP");
            productCard.innerHTML = `
                <div class="product-img-wrapper">
                    <img src="${item.hinhAnh}" alt="${item.Ten}">
                </div>
                <div class="product-info">
                    <p class="product-name">${item.Ten}</p>
                    <p class="product-price">${Number(item.Gia).toLocaleString("vi-VN")} đ</p>
                </div>
            `;
            productCard.addEventListener("click", () => {
                window.location.href = `TrangchitietSP.html?id=${item.maSanPham}`;
            });
            productGrid.appendChild(productCard);
        });
    }
    function filterAndSortProducts() {
        let result = [...danhSachSanPham];
        if (currentCategory !== "all") {
            result = result.filter(item => {
                const tenSP = item.Ten ? item.Ten.toLowerCase() : "";
                const moTa = item.moTa ? item.moTa.toLowerCase() : "";
                const cat = currentCategory.toLowerCase();
                return tenSP.includes(cat) || moTa.includes(cat);
            });
        }
        if (currentPriceRange !== "all") {
            result = result.filter(item => {
                const price = Number(item.Gia);
                if (currentPriceRange === "duoi200") return price < 200000;
                if (currentPriceRange === "200toi500") return price >= 200000 && price <= 500000;
                if (currentPriceRange === "qua500") return price > 500000;
                return true;
            });
        }
        if (currentSort === "giaThaptoiCao") {
            result.sort((a, b) => Number(a.Gia) - Number(b.Gia));
        } else if (currentSort === "giaCaoXuongThap") {
            result.sort((a, b) => Number(b.Gia) - Number(a.Gia));
        } else if (currentSort === "TuAtoiZ") {
            result.sort((a, b) => a.Ten.localeCompare(b.Ten));
        }
        renderProducts(result);
    }

    nutGoiY.forEach(btn => {
        btn.addEventListener("click", () => {
            nutGoiY.forEach(b => {
                b.classList.remove("goiYactive");
                b.classList.add("goiY");
            });
            btn.classList.remove("goiY");
            btn.classList.add("goiYactive");
            currentCategory = btn.getAttribute("data-category");
            filterAndSortProducts();
        });
    });
    NutSapxep.addEventListener("click", (e) => {
        e.stopPropagation();
        CuonSapxep.classList.toggle("active");
        filterDropdown.classList.remove("active");
    });
    sortOptions.forEach(option => {
        option.addEventListener("click", () => {
            sortOptions.forEach(o => {
                o.classList.remove("Luachonsapxepactive");
                o.classList.add("Luachonsapxep");
            });
            option.classList.remove("Luachonsapxep");
            option.classList.add("Luachonsapxepactive");
            currentSort = option.getAttribute("data-value");
            CuonSapxep.classList.remove("active");
            NutSapxep.innerHTML = `${option.textContent} ⌄`;
            filterAndSortProducts();
        });
    });
    filterBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        filterDropdown.classList.toggle("active");
        CuonSapxep.classList.remove("active");
    });
    priceRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            currentPriceRange = e.target.value;
            filterAndSortProducts();
        });
    });
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".Sapxept")) CuonSapxep.classList.remove("active");
        if (!e.target.closest(".divLoc")) filterDropdown.classList.remove("active");
    });
});