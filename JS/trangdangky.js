document.addEventListener("DOMContentLoaded", () => {
    const Form_DANGKY = document.getElementById("Form_DANGKY");

    Form_DANGKY.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("TenDangKY").value.trim();
        const email = document.getElementById("DangkyUSer_Email").value.trim().toLowerCase();
        const password = document.getElementById("DangkyUSer_Password").value;

        if (password.length < 6) {
            alert("Mật khẩu phải có ít nhất 6 ký tự!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            alert("Email này đã được đăng ký!");
            return;
        }

        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Đăng ký tài khoản thành công!");
        window.location.href = "trangdangnhap.html";
    });
});