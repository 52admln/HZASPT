
/**
 * 表单提交
 * login_type: student / teacher / admin
 */

$("#loginType").on("change", function (e) {
    console.log("login-type: " + e.target.value);
    switch (e.target.value) {
        case "student" :
            _showCurrent(0);
            break;
        case "teacher" :
            _showCurrent(1);
            break;
        case "admin" :
            _showCurrent(2);
            break;
    }

    function _showCurrent(index) {
        $(".sourceTab").eq(index).removeClass("hidden").siblings(".sourceTab").addClass("hidden");
    }
});

// 验证码
$("#getVerifyCode").click(function () {
    var num = 60;
    var timer = null;
    $(this).attr("disabled", "disabled");
    (function (that) {
        timer = setInterval(function () {
            if (num > 0) {
                $(that).html(num + "秒后重发");
                num--;
            } else {
                clearInterval(timer);
                num = 60;
                $(that).html("获取验证码").removeAttr("disabled");
            }
        }, 1000)
    })(this);
});


// jQuery validator 手机号码验证规则
jQuery.validator.addMethod("isPhoneNum", function (value, element) {
    var tel = /^1[34578]\d{9}$/;
    return this.optional(element) || (tel.test(value));
}, "请正确填写您的手机号码");

// 表单验证
$("#studentForm").validate({
    rules: {
        student_tel: {
            required: true,
            isPhoneNum: true
        },
        student_code: {
            required: true
        }
    },
    messages: {
        student_tel: {
            required: "请输入手机号码"
        },
        student_code: {
            required: "请输入验证码"
        }
    },
    errorClass: "validate-tip",
    errorElement: "label",
    errorPlacement: function (error, element) {
        $(element)
            .parent()
            .append(error);
    },
    submitHandler: function (form) {
        var e = event || window.event;
        e.preventDefault();
        var data = $(form).serializeArray();
        console.log(data);
        // console.log(data[0].name, data[0].value); // tel
        // console.log(data[1].name, data[1].value); // code
        // console.log(data[2].name, data[2].value); // type
        loginSession( data[0].value, data[2].value);
    }
});

$("#teacherForm").validate({
    rules: {
        user: {
            required: true
        },
        pwd: {
            required: true
        }
    },
    messages: {
        user: {
            required: "请输入用户名"
        },
        pwd: {
            required: "请输入密码"
        }
    },

    errorClass: "validate-tip",
    errorElement: "label",
    errorPlacement: function (error, element) {
        $(element)
            .parent()
            .append(error);
    },
    submitHandler: function (form) {
        var e = event || window.event;
        e.preventDefault();
        var data = $(form).serializeArray();
        //
        // console.log(data[0].name, data[0].value); // name
        // console.log(data[1].name, data[1].value); // pwd
        // console.log(data[2].name, data[2].value); // type
        loginSession(data[0].value, data[2].value);
    }
});


$("#adminForm").validate({
    rules: {
        user: {
            required: true
        },
        pwd: {
            required: true
        }
    },
    messages: {
        user: {
            required: "请输入用户名"
        },
        pwd: {
            required: "请输入密码"
        }
    },

    errorClass: "validate-tip",
    errorElement: "label",
    errorPlacement: function (error, element) {
        $(element)
            .parent()
            .append(error);
    },
    submitHandler: function (form) {
        var e = event || window.event;
        e.preventDefault();
        var data = $(form).serializeArray();
        // console.log(data[0].name, data[0].value); // name
        // console.log(data[1].name, data[1].value); // pwd
        // console.log(data[2].name, data[2].value); // type
        loginSession(data[0].value, data[2].value);
    }
});

// 登录session存储
function loginSession(username, usertype) {
    // 权限类型
    var types = {
        "teacher": "教师",
        "student": "学生",
        "admin": "管理员"
    };
    var loginuser = {};
    loginuser.username = username;
    loginuser.loginType = types[usertype];

    //alert(JSON.parse(sessionStorage.clickcount).name);
    //sessionStorage.setItem("clickcount", '{"name":"wang", "type": "teacher"}');

    if (typeof (Storage) !== "undefined") {
        if (!sessionStorage.loginuser) {
            sessionStorage.setItem("loginuser", JSON.stringify(loginuser));
        }
    } else {
        alert("您当前浏览器不支持 LocalStorage")
    }
    window.location.href = "./student/index.html";
}