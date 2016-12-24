

function init() {
    // 登录显示用户名
    //console.log(JSON.parse(sessionStorage.loginuser).username);
    if(!sessionStorage.loginuser) {
        window.location.href = "../index.html";
    }
    var userdata = JSON.parse(sessionStorage.loginuser);
    // 显示当前登录的用户
    $(".js-username").html(userdata.loginType + ":" + userdata.username);

    $(".js-logout").on("click", function () {
        sessionStorage.removeItem("loginuser");
        alert("您已登出");
        window.location.href = "../index.html";
    })

}

init();