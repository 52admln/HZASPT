
//data picker
$('.datepicker input').datepicker({
    format: 'yyyy-mm-dd',
    startDate: '-1y',
    endDate: '+1y'
});

$(".js-score").on("click", function () {
    $.ajax({
        url:"http://rap.taobao.org/mockjsdata/12128/getData",
        type: "post",
        dataType: "json",
        success: function (source) {
            console.log(source.data);
            var string = "",
                num = 0;
            $.each(source.data, function (index, item) {
                console.log(item.title);
                string += '<tr>'
                + '<td>'+ num++ +'</td>'
                + '<td>'+item.title +'</td>'
                + '<td>'+ item.score +'</td>'
                + '<td>'+ item.time +'</td>'
                + '</tr>';
            });
            $(".js-score-table").html(string);
        }
    })
});
