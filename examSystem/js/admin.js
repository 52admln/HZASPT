// 日历选择器
$('#datepicker').datepicker({
    format: 'yyyy-mm-dd',
    startDate: '-1y',
    endDate: '+1y'
});

// 添加教师表单验证
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
// 添加学生表单验证
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
// 学生列表删除按钮
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
//初始化,渲染列表
function init() {
    renderTeaacher();
    renderStudent();
}
init();


$(function () {
    $('#myTab a:last').tab('show')
});
$('.test-title').blur(function () {
    var testtitle = $('.test-title').val();
    console.log(testtitle);
    if (testtitle == "") {
        swal("不能为空!", "请填写好考试标题", "error")
    }
});

$('#myStateButton').on('click', function () {
    var $btn = $(this).button('loading');
    $btn.button('reset');
});

// 关键字筛选
var keywordArr = [], keywordObj = {};
$('.selectBox a').on('click', function (e) {

    var value = e.target.innerHTML;

        if (!$(e.target).hasClass("activeA")) {
            $(e.target).addClass('activeA');
            if (!keywordObj[value]) {
                keywordObj[value] = true;
                keywordArr.push(value);
            }
        } else {
            $(e.target).removeClass('activeA');
            keywordArr.filter(function (ele, index) {
                if(ele == value){
                keywordArr.splice(index, 1);
                }
            });
            keywordObj[value] = false;
        }
    var newArr = keywordArr.join('、');
    console.log(keywordArr);
    $('#addkeyword').html(newArr);
});

$('.retrievalResult .btn-warning').on('click', function (e) {
    this.parentNode.parentNode.parentNode.remove();
});
$('#tbody a').on('click', function (e) {
    console.log(e.target.innerHTML);
    switch (e.target.innerHTML) {
        case "修改":
            $('.score').removeAttr('disabled');
            break;
        case "删除":
            console.log(this.parentNode.parentNode.parentNode);
            this.parentNode.parentNode.parentNode.remove();
            break;
        default:
            break;
    }
});

function creatBox(e) {
    var arr1 = ['单选题试卷来源：第一套试卷', '单选题试卷来源：第二套试卷', '单选题试卷来源：第三套试卷', '单选题试卷来源：第四套试卷'];
    var arr2 = ['多选题试卷来源：第一套试卷', '多选题试卷来源：第二套试卷', '多选题试卷来源：第三套试卷', '多选题试卷来源：第四套试卷'];
    var arr3 = ['判断题试卷来源：第一套试卷', '判断题试卷来源：第二套试卷', '判断题试卷来源：第三套试卷', '判断题试卷来源：第四套试卷'];
    var arr4 = ['操作题试卷来源：第一套试卷', '操作题试卷来源：第二套试卷', '操作题试卷来源：第三套试卷', '操作题试卷来源：第四套试卷'];
    Array.prototype.getRandomItem = function () {
        return this[Math.floor(Math.random() * this.length)]
    }
    var a = arr1.getRandomItem();
    var b = arr2.getRandomItem();
    var c = arr3.getRandomItem();
    var d = arr4.getRandomItem();
    str = '<div class="retrivealBox clearfix">' +
        '<ul class="retrievalResult pull-left">' +
        '<li>' + a + '&nbsp&nbsp&nbsp&nbsp' + b + '</li>' +
        '<li>' + c + '&nbsp&nbsp&nbsp&nbsp' + d + '</li>' +
        '</ul>' +
        '<ul class="retrievalResult clearfix pull-right btngroup">' +
        '<li class="pull-left">' +
        '<button type="button" class="btn btn-primary successMessage " onclick="successMessage()">' + '发布试卷' + '</button>' +
        '</li>' +
        '</ul>' +
        '</div>';
    document.getElementById("creatbox").innerHTML += str;
};

function successMessage(e) {
    $('#myModal').modal('show');
};

function successMessage1(e) {
    $('#myModa2').modal('show');
};

function DIYchoose() {
    var danxuanti = $(".form-control").eq(0).find("option:selected").text();
    var duoxuanti = $(".form-control").eq(1).find("option:selected").text();
    var panduanti = $(".form-control").eq(2).find("option:selected").text();
    var caozuoti = $(".form-control").eq(3).find("option:selected").text();
    console.log(danxuanti + duoxuanti + panduanti + caozuoti);
    str = '<div class="retrivealBox clearfix">' +
        '<ul class="retrievalResult pull-left">' +
        '<li>' + '单选题试卷来源' + danxuanti + '&nbsp&nbsp&nbsp&nbsp' + '多选题试卷来源' + duoxuanti + '</li>' +
        '<li>' + '判断题试卷来源' + panduanti + '&nbsp&nbsp&nbsp&nbsp' + '操作题试卷来源' + caozuoti + '</li>' +
        '</ul>' +
        '<ul class="retrievalResult clearfix pull-right btngroup">' +
        '<li class="pull-left">' +
        '<button type="button" class="btn btn-primary successMessage " onclick="successMessage1()">' + '发布试卷' + '</button>' +
        '</li>' +
        '</ul>' +
        '</div>';
    document.getElementById('diybox').innerHTML += str;
};