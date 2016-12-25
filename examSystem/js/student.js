// show score
$('#myAffix').affix({
    offset: {
        top: 100
    }
});


var TIME = "7200"; //  second / 2 hour of default
var answers = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"]; // 答案显示
var timer = null; // 计时器

// Event bind

// 多选题显示选择答案
$(".js-single-question").on("click", function (e) {
    if (e.target && e.target.nodeName.toLowerCase() === "input") {
        console.log(e.target.value);
        $(e.target).closest("ul").next(".current-answer").html("当前选择的答案是:<strong> " + answers[Number(e.target.value) - 1] + "</strong>");
    }
});
// 多选题显示选择答案
$(".js-multi-question").on("click", function (e) {
    if (e.target && e.target.nodeName.toLowerCase() === "input") {
        var mutlAnswer = "";
        $("input[type=checkbox]:checked").each(function (index, item) {
            mutlAnswer += answers[$(item).val() - 1];
        });
        $(e.target).closest("ul").next(".current-answer").html("当前选择的答案是:<strong> " + mutlAnswer + "</strong>");
    }
});
// 防止用户意外关闭窗口
$(window).on('beforeunload', function () {
    if (sessionStorage.lefttime) {
        return '离开后,您的考试成绩将作废,确认离开吗?'
    }
});
// 开始考试
$(".js-start").on("click", function () {
    $(".on-start").removeClass("hidden");
    $(".before-start").addClass("hidden");
    countDown(TIME);
});
// 提交试卷
$(".js-submit").on("click", function () {
    // TODO 验证是否所有题目都已经完成
    // if(isFinished()){

    swal({
            title: "确认提交?",
            text: "提交成功后将上传成绩",
            type: "warning",
            showCancelButton: true,
            cancelButtonText: "关闭",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确认",
            closeOnConfirm: false
        },
        function () {
            swal("提交成功!", "你的成绩已经成功上传至服务器", "success");
            $(".on-start").addClass("hidden");
            $(".before-start").removeClass("hidden");
            clearInterval(timer);
            console.log(1);
            sessionStorage.removeItem("lefttime");
        });
    // }

});

function isFinished() {

}
/**
 * 考试倒计时
 * @param time
 */
function countDown(time) {
    var curTime = time;
    clearInterval(timer);
    timer = setInterval(function () {
        curTime--;
        console.log(curTime);
        $(".js-time").html(dateFormat(curTime));
        sessionStorage.setItem("lefttime", curTime);
        if (curTime === 0) {
            clearInterval(timer);
        }
    }, 1000);
}


/**
 * 秒转化成dd hh:mm:ss
 * @param second
 * @returns {string}
 */
function dateFormat(second) {
    var dd, hh, mm, ss;
    second = typeof second === 'string' ? parseInt(second) : second;
    if (!second || second < 0) {
        return;
    }
    //天
    dd = second / (24 * 3600) | 0;
    second = Math.round(second) - dd * 24 * 3600;
    //小时
    hh = second / 3600 | 0;
    second = Math.round(second) - hh * 3600;
    //分
    mm = second / 60 | 0;
    //秒
    ss = Math.round(second) - mm * 60;
    if (Math.round(dd) < 10) {
        dd = dd > 0 ? '0' + dd : '';
    }
    if (Math.round(hh) < 10) {
        hh = '0' + hh;
    }
    if (Math.round(mm) < 10) {
        mm = '0' + mm;
    }
    if (Math.round(ss) < 10) {
        ss = '0' + ss;
    }
    return dd + ' ' + hh + ' : ' + mm + ' : ' + ss;
}

function init() {
    // 通过sessionstorage中的 lefttime Key判断是否已经开始考试
    if (sessionStorage.lefttime) {
        $(".on-start").removeClass("hidden");
        $(".before-start").addClass("hidden");
        countDown(sessionStorage.lefttime);
    }
}

init();



