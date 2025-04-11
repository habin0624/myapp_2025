document.addEventListener("DOMContentLoaded", function () {
    const idBox = document.querySelector(".id_box");
    const passBox = document.querySelector(".pass_box");
    const loginBtn = document.querySelector(".login_btn");

    function toggleLoginButton() {
        if (idBox.value.trim() !== "" && passBox.value.trim() !== "") {
            loginBtn.style.backgroundColor = "#5E26B8"; // 활성화 색상
        } else {
            loginBtn.style.backgroundColor = "#9d9d9d"; // 기본 색상
        }
    }
    idBox.addEventListener("input", toggleLoginButton);
    passBox.addEventListener("input", toggleLoginButton);
});



