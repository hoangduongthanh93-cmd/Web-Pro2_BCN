document.addEventListener("DOMContentLoaded", () => {
    const Form_DANGNHAP = document.getElementById("Form_DANGNHAP");

    if (Form_DANGNHAP) {
        Form_DANGNHAP.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("DangnhapEmail").value.trim().toLowerCase();
            const password = document.getElementById("DangnhapPassword").value;

            let users = JSON.parse(localStorage.getItem("users")) || [];

            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem("currentUser", JSON.stringify(user));
                showToast(`Đăng nhập thành công! Chào mừng ${user.name}`, "success");
                setTimeout(() => {
                    window.location.href = "trangdanhsachSP.html";
                }, 1500);
            } else {
                showToast("Email hoặc mật khẩu không chính xác!", "error");
            }
        });
    }
});