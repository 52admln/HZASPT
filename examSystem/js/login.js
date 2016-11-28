/**
 * Created by Wyj on 11/28/16.
 */


/**
 * 表单提交
 *
 * login_type: student / teacher / admin
 */

$("#loginType").on("change", function (e) {
    console.log(e.target.value);
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
jQuery.validator.addMethod("isPhoneNum", function(value, element) {
    var tel = /^1[34578]\d{9}$/;
    return this.optional(element) || (tel.test(value));
}, "请正确填写您的手机号码");


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
    errorPlacement: function(error, element) {
        $( element )
            .parent()
            .append( error );
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
    errorPlacement: function(error, element) {
        $( element )
            .parent()
            .append( error );
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
    errorPlacement: function(error, element) {
        $( element )
            .parent()
            .append( error );
    }
});
