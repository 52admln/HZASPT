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
//单选题
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
//多选题
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
//简答题
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
// 存入localstorage
var localstorage = {
    save: function (data) {
        window.localStorage.setItem("questions", JSON.stringify(data));
    },
    get: function () {
        return window.localStorage.getItem("questions") || '{"questions":[]}';
    }
};
//渲染数据
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
// 初始化,有数据则渲染
function init() {
    storage = JSON.parse(localstorage.get());
    if (storage.questions) {
        renderData()
    }
}
init();




//导出Excel文件

var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template =
            '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64 = function (s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        },
        format = function (s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) {
                return c[p];
            })
        }
    return function (table, name, filename) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = {
            worksheet: name || 'Worksheet',
            table: table.innerHTML
        }

        document.getElementById("dlink").href = uri + base64(format(template, ctx));
        document.getElementById("dlink").download = filename;
        document.getElementById("dlink").click();

    }
})();

var idTmr;

function getExplorer() {
    var explorer = window.navigator.userAgent;
    //ie
    if (explorer.indexOf("MSIE") >= 0) {
        return 'ie';
    }
    //firefox
    else if (explorer.indexOf("Firefox") >= 0) {
        return 'Firefox';
    }
    //Chrome
    else if (explorer.indexOf("Chrome") >= 0) {
        return 'Chrome';
    }
    //Opera
    else if (explorer.indexOf("Opera") >= 0) {
        return 'Opera';
    }
    //Safari
    else if (explorer.indexOf("Safari") >= 0) {
        return 'Safari';
    }
}

function method5(tableid) {
    if (getExplorer() == 'ie') {
        var curTbl = document.getElementById(tableid);
        var oXL = new ActiveXObject("Excel.Application");
        var oWB = oXL.Workbooks.Add();
        var xlsheet = oWB.Worksheets(1);
        var sel = document.body.createTextRange();
        sel.moveToElementText(curTbl);
        sel.select();
        sel.execCommand("Copy");
        xlsheet.Paste();
        oXL.Visible = true;

        try {
            var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
        } catch (e) {
            print("Nested catch caught " + e);
        } finally {
            oWB.SaveAs(fname);
            oWB.Close(savechanges = false);
            oXL.Quit();
            oXL = null;
            idTmr = window.setInterval("Cleanup();", 1);
        }

    } else {
        tableToExcel(tableid)
    }
}

function Cleanup() {
    window.clearInterval(idTmr);
    CollectGarbage();
}
var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',
        base64 = function (s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        },
        format = function (s, c) {
            return s.replace(/{(\w+)}/g,
                function (m, p) {
                    return c[p];
                })
        }
    return function (table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = {
            worksheet: name || 'Worksheet',
            table: table.innerHTML
        }
        window.location.href = uri + base64(format(template, ctx))
    }
})();


// 右侧内容显示

$('#typeofchose li').on('click', function(e) {
    console.log(e.target.innerHTML);
    $(this).addClass('active').siblings().removeClass('active');
    switch (e.target.innerHTML) {
        case "题目管理":
            _showCurrent(0);
            break;
        default:
            _showCurrent(1);
            break
    }

    function _showCurrent(index) {
        $(".showbox").eq(index).removeClass("hidden").siblings(".showbox").addClass("hidden");
    }
});

// 删除成绩
$('#tbody a').on('click',function (e) {
    console.log(e.target.innerHTML);
    switch(e.target.innerHTML)
    {
        case "修改":
            $(this).closest("td").prev().find("input").removeAttr('disabled');
            break;
        case "删除":
            console.log(this.parentNode.parentNode.parentNode);
            this.parentNode.parentNode.parentNode.remove();
            break;
        default:


            break;
    }
});