$(function() {
    $('#myTab a:last').tab('show')
});


$('#myStateButton').on('click', function() {
    var $btn = $(this).button('loading');
    $btn.button('reset');
});
$('#typeofchose li').on('click', function(e) {
    console.log(e.target.innerHTML);
    $(this).addClass('active').siblings().removeClass('active');
    switch (e.target.innerHTML) {
        case "题目管理":
            _showCurrent(0);
            break;
        case "成绩管理":
            _showCurrent(1);
            break
    }
    function _showCurrent(index) {
        $(".showbox").eq(index).removeClass("hidden").siblings(".showbox").addClass("hidden");
    }
});

var keywordArr = [];
$('.selectBox a').on('click', function(e) {
    console.log(e.target.innerHTML);
    $(e.target).addClass('activeA');
    keywordArr.push(e.target.innerHTML);
    var newArr = keywordArr.join('、');
    console.log(keywordArr);
    $('#addkeyword').html(newArr);
});

$('.retrievalResult .btn-warning').on('click', function(e) {
    this.parentNode.parentNode.parentNode.remove();
});
$('#tbody a').on('click', function(e) {
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
    Array.prototype.getRandomItem = function() {
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