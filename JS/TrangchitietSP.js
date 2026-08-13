
document.addEventListener("DOMContentLoaded",function(){
    const params = new URLSearchParams(window.location.search)
    const maSp = params.get("maSanPham")
    const hinhAnh = document.getElementById("HinhAnhSP");
    const tenSP = document.getElementById("TenSP");
    const giaSP = document.getElementById("GiaSP");
    const moTaSP = document.getElementById("ThongTinSP");
    const nutThemGioHang = document.getElementById("themvaoGioHang");
    const nutMuaNgay = document.getElementById("Muangay");
    if (!maSp) {
        console.error("Không có mã sản phẩm trên URL");
        return;
    }
    fetch("http://localhost:3000/sanpham").then(Response=>{
        if(!Response.ok){
            throw new Error("Lỗi kết nối với DataBase");
        }
        return Response.json();
    }).then(data=>{
        const DulieuSp= data.find(item=>item.maSanPham === maSp);
        if(!DulieuSp){
            console.error("Không tìm thấy Sản phẩm");
            return;
        }
        hinhAnh.src = DulieuSp.hinhAnh;
        hinhAnh.alt = DulieuSp.Ten;
        tenSP.textContent = DulieuSp.Ten;
        giaSP.textContent =Number(DulieuSp.Gia).toLocaleString("vi-VN") + "đ";
        moTaSP.textContent = DulieuSp.moTa;
        nutThemGioHang.addEventListener("click",function(){
            let gioHang = JSON.parse(localStorage.getItem("gioHang")) || [];
            const SPtrongGioHang=gioHang.find(item=>item.maSanPham === DulieuSp.maSanPham);
        if (SPtrongGioHang) {
            SPtrongGioHang.soLuong++;
        } else {
            gioHang.push({
                maSanPham: DulieuSp.maSanPham,
                Ten: DulieuSp.Ten,
                Gia: DulieuSp.Gia,
                hinhAnh: DulieuSp.hinhAnh,
                soLuong: 1
            });
                alert("Đã thêm vào giỏ hàng");
            }
            localStorage.setItem("gioHang",JSON.stringify(gioHang));

        });
        nutMuaNgay.addEventListener("click",function(){
            localStorage.removeItem("gioHang");
            const gioHang=[{
                        maSanPham: DulieuSp.maSanPham,
                        Ten: DulieuSp.Ten,
                        Gia: DulieuSp.Gia,
                        hinhAnh: DulieuSp.hinhAnh,
                        soLuong: 1
            }];
        localStorage.setItem("gioHang",JSON.stringify(gioHang));
        window.location.href = "gioHang.html";
            });
            .catch(error => {
            console.error("Không thể tải dữ liệu sản phẩm:",error);
        });
    })});
