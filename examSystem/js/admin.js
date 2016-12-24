// 表单验证
$("#addTeacher").validate({
    rules: {
        t_number: {
            required: true,
            onlyAZ: true,
            minlength: 3
        },
        t_name: {
            required: true
        },
        t_password: {
            required: true,
            minlength: 6,
            maxlength: 16,
            noSpecialChar: true, // 没有特殊字符
            mustOneAZ: true // 必须有一个大写字母
        }
    },
    messages: {
        t_name: {
            required: "请输入用户名",
            minlength: "用户名必需由三个字母组成"
        },
        t_password: {
            required: "请输入密码",
            minlength: "密码长度不能小于 6 个字母",
            maxlength: "密码长度不能大于 16 个字母"
        },
        t_number: {
            required: "请输入帐号",
            minlength: "帐号长度不能小于 3 个字母"
        },
        t_class: {
            required: "请选择班级"
        }
    },
    submitHandler: function () {
        swal("成功", "添加教师用户成功!", "success");
        $(this).reset();
    },
    errorClass: "error",
    errorLabelContainer: "strong"
});

$("#addStudent").validate({
    rules: {
        s_number: {
            required: true,
            snumber: true
        },
        s_tel: {
            required: true,
            mobile: true
        },
        s_name: {
            required: true,
            stringCH: true
        }
    },
    messages: {
        s_number: {
            required: "请输入学号"
        },
        s_tel: {
            required: "请输入手机号码"
        },
        s_name: {
            required: "请输入姓名"
        }
    },
    submitHandler: function () {
        swal("成功", "添加学生用户成功!", "success");
        $(this).reset();
    },
    errorClass: "error",
    errorLabelContainer: "strong"
});

// 教师用户删除
$(".js-teachers").on("click", function (e) {
    if (e.target && e.target.nodeName.toLowerCase() === "button") {
        swal({
                title: "确定?",
                text: "删除用户后将不可恢复!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                cancelButtonText: "取消",
                confirmButtonText: "确认删除",
                closeOnConfirm: false
            },
            function () {
                swal("成功", "该用户已被删除", "success");
                e.target.parentNode.parentNode.remove();
            });
    }
})
$(".js-students").on("click", function (e) {
    if (e.target && e.target.nodeName.toLowerCase() === "button") {
        swal({
                title: "确定?",
                text: "删除用户后将不可恢复!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                cancelButtonText: "取消",
                confirmButtonText: "确认删除",
                closeOnConfirm: false
            },
            function () {
                swal("成功", "该用户已被删除", "success");
                e.target.parentNode.parentNode.remove();
            });
    }
})
// 渲染教师数据
function renderTeaacher() {
    $.ajax({
        url: "http://rap.taobao.org/mockjsdata/12128/getTeacher",
        type: "post",
        dataType: "json",
        success: function (source) {
            // console.log(source.data);
            var string = "";
            $.each(source.data, function (index, item) {
                string += '<tr>'
                    + '<td>' + item.user + '</td>'
                    + '<td>' + item.name + '</td>'
                    + '<td>' + item.class + '</td>'
                    + '<td><button type="button" class="btn btn-danger btn-xs ">删除</button></td>'
                    + '</tr>';
            });
            $(".js-teachers").html(string);
        }
    })
}
// 渲染学生数据
function renderStudent() {
    $.ajax({
        url: "http://rap.taobao.org/mockjsdata/12128/getStudent",
        type: "post",
        dataType: "json",
        success: function (source) {
            // console.log(source.data);
            var string = "";
            $.each(source.data, function (index, item) {
                string += '<tr>'
                    + '<td>' + item.number + '</td>'
                    + '<td>' + item.tel + '</td>'
                    + '<td>' + item.name + '</td>'
                    + '<td>' + item.class + '</td>'
                    + '<td><button type="button" class="btn btn-danger btn-xs ">删除</button></td>'
                    + '</tr>';
            });
            $(".js-students").html(string);
        }
    })
}

function init() {
    renderTeaacher();
    renderStudent();
}
init();