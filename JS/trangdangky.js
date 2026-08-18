document.addEventListener("DOMContentLoaded", () => {
    const Form_DANGKY = document.getElementById("Form_DANGKY");
    if (Form_DANGKY) {
        Form_DANGKY.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("TenDangKY").value.trim();
            const email = document.getElementById("DangkyUSer_Email").value.trim().toLowerCase();
            const password = document.getElementById("DangkyUSer_Password").value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast("Email không đúng định dạng (vd: example@gmail.com)", "error");
                return;
}
            if (password.length < 6) {
                showToast("Mật khẩu phải có ít nhất 6 ký tự!", "error");
                return;
            }
            let users = JSON.parse(localStorage.getItem("users")) || [];
            const existingUser = users.find(u => u.email === email);
            if (existingUser) {
                showToast("Email này đã được đăng ký!", "error");
                return;
            }
            users.push({ name, email, password });
            localStorage.setItem("users", JSON.stringify(users));
            showToast("Đăng ký tài khoản thành công!", "success");
            setTimeout(() => {
                window.location.href = "trangdangnhap.html";
            }, 1500);
        });
    }
});