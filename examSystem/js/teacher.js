$(function () {
    $('#myTab a:last').tab('show')
});


$('#myStateButton').on('click', function () {
    var $btn = $(this).button('loading');
    $btn.button('reset');
});
$('#typeofchose li').on('click', function (e) {
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
$('.selectBox a').on('click', function (e) {
    console.log(e.target.innerHTML);
    $(e.target).addClass('activeA');
    keywordArr.push(e.target.innerHTML);
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


var storage = {
    "questions": []
    //"questions": [
    //    {
    //        "type": "单选",
    //        "content": "题目内容",
    //        "options": [
    //            "选项1",
    //            "选项2"
    //        ],
    //        "answer": [
    //            "A"
    //        ]
    //    },
    //    {
    //        "type": "多选",
    //        "content": "题目内容",
    //        "options": [
    //            "选项1",
    //            "选项2",
    //            "选项3",
    //            "选项4"
    //        ],
    //        "answer": [
    //            "A",
    //            "B"
    //        ]
    //    },
    //    {
    //        "type": "文本",
    //        "content": "233242",
    //        "isRequired": true
    //    }
    //]
};


$(".js-remove").delegate("button", "click", function () {
    $(this).closest(".form-group").remove();
});

$(".js-additem").on("click", function () {
    var element = '<div class="form-group">'
        + '<div class="row">'
        + '<div class="col-md-10">'
        + '<input type="text" class="form-control js-option">'
        + '</div>'
        + '<div class="col-md-2">'
        + '<button class="btn btn-default"><i class="glyphicon glyphicon-trash"></i></button>'
        + '</div>'
        + '</div>'
        + '</div>';
    $(element).insertBefore($(this));
});

$(".js-single-ques").on("click", function () {
    var cur_storage = {
        //        "type": "单选",
        //        "content": "题目内容",
        //        "options": [
        //            "选项1",
        //            "选项2"
        //        ],
        //        "answer": [
        //            "A"
        //        ]
        //    }
    };
    cur_storage.type = "单选";
    cur_storage.content = $("#single .js-title").val();
    cur_storage.options = [];
    cur_storage.answer = $("#single .js-answer").val();

    $("#single .js-option").each(function (index, item) {
        cur_storage.options.push($(item).val());
    });
    storage.questions.push(cur_storage);

    localstorage.save(storage);
    renderData();

});
$(".js-multi-ques").on("click", function () {
    var cur_storage = {
        //        "type": "单选",
        //        "content": "题目内容",
        //        "options": [
        //            "选项1",
        //            "选项2"
        //        ],
        //        "answer": [
        //            "A"
        //        ]
        //    }
    };
    cur_storage.type = "多选";
    cur_storage.content = $("#multi .js-title").val();
    cur_storage.options = [];
    cur_storage.answer = $("#multi .js-answer").val();

    $("#multi .js-option").each(function (index, item) {
        cur_storage.options.push($(item).val());
    });
    storage.questions.push(cur_storage);


    localstorage.save(storage);
    renderData();
});
$(".js-text-ques").on("click", function () {
    var cur_storage = {
        //        "type": "单选",
        //        "content": "题目内容",
        //        "options": [
        //            "选项1",
        //            "选项2"
        //        ],
        //        "answer": [
        //            "A"
        //        ]
        //    }
    };
    cur_storage.type = "简答";
    cur_storage.content = $("#text .js-title").val();
    cur_storage.required = $("#text .js-require").prop("checked");
    storage.questions.push(cur_storage);

    localstorage.save(storage);
    renderData();

});


var localstorage = {
    save: function (data) {
        window.localStorage.setItem("questions", JSON.stringify(data));
    },
    get: function () {
        return window.localStorage.getItem("questions") || '{"questions":[]}';
    }
};

function renderData() {
    var data = JSON.parse(localstorage.get());
    var text = "",
        multi = "",
        single = "";
    var require = {
        "true": "是",
        "false": "否"
    };
    $.each(data.questions, function (index, item) {
        if (item.type == "简答") {
            text += '<li>'
                + '<h5>' + item.content + '</h5>'
                + '<textarea name="" cols="60" rows="5"></textarea>'
                + '<div class="current-answer">'
                + '是否必填: <code>' + require[item.required] + '</code>'
                + '</div>'
                + '</li>';
        }
        if (item.type == "多选") {
            var _checkbox = "";
            item.options.forEach(function (ele, index) {
                _checkbox += '<li><label>'
                    + '<input type="checkbox" value="' + index + '">'
                    + ele
                    + '</label></li>'
            });
            multi += '<li>'
                + '<h5>' + item.content + '</h5>'
                + '<ul class="chose-item checkbox">'
                + _checkbox
                + '</ul>'
                + '<div class="current-answer">'
                + '正确答案:'
                + item.answer
                + '</div>'
                + '</li>'
        }
        if (item.type == "单选") {
            var _radio = "";
            var num = 0;
            item.options.forEach(function (ele, index) {
                _radio += '<li><label>'
                    + '<input type="radio" name="optionsRadio-' + num + '" value="' + num + '">'
                    + ele
                    + '</label></li>';
            });
            num++;
            single += '<li>'
                + '<h5>' + item.content + '</h5>'
                + '<ul class="chose-item radio">'
                + _radio
                + '</ul>'
                + '<div class="current-answer">'
                + '正确答案:' + item.answer
                + '</div>'
                + '</li>';
        }
    });

    $(".js-text").html(text);
    $(".js-multi").html(multi);
    $(".js-single").html(single);
}

function init() {
    storage = JSON.parse(localstorage.get());
    if (storage.questions) {
        renderData()
    }
}
init();