document.addEventListener("DOMContentLoaded", () => {
    const Form_DANGNHAP = document.getElementById("Form_DANGNHAP");

    Form_DANGNHAP.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("DangnhapEmail").value.trim().toLowerCase();
        const password = document.getElementById("DangnhapPassword").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            alert(`Đăng nhập thành công! Chào mừng ${user.name}`);
            window.location.href = "trangdanhsachSP.html";
        } else {
            alert("Email hoặc mật khẩu không chính xác!");
        }
    });
});