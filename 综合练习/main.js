var imgList = $('#liList > li > img'), // 上方商品图片
    shopingList = $('#cartLi'), //下方购物车内容
    cartText = $('#cartText'), // 当前购物车当中的商品数量
    shoppingWarn = $('#shopping-warn'), // 购物车信息提示
    priceAll = $('.tota-priceAll > span'); // 显示总价格


var cart = [], //存放购物车内的商品
    totalPrice = 0, //总价格
    totalGoods = 0; //总商品数量


imgList.on("click", function (e) {
    var target = e.target;
    console.log(target.dataset.name);
    var id = target.dataset.goodsid,
        src = $(target).attr("src"),
        name = target.dataset.name,
        price = target.dataset.price.substr(1);
    add(id, src, name, price, price);
});

$('#cartLi').on("click", function (e) {
    var target = e.target;
    var delPrice = 0; //要删除的商品总价格
    var curtotalNum = 0; //当前商品数目
    var curIndex = 0; //商品的索引位置
    var cursigPrice = 0; //单个商品单价
    var curtotalsigPrice = 0; //单个商品总价格
    if (target.id == "del-btn") {

        delPrice = $(target).parent().parent().find(".total-price").html();
        curtotalNum = $(target).parent().parent().find(".cart-num > input").val().replace("件", "");
        curIndex = cart.indexOf($(target).parent().parent().data("goodsid"));

        totalPrice = totalPrice - delPrice * 1; //总价格
        totalGoods = totalGoods - curtotalNum; //商品总数

        cart.splice(curIndex, 1);

        updateData(totalPrice, totalGoods);
        removeEle($(target).parent().parent());

    }
    if (target.className == "shop-r") {
        curtotalNum = $(target).siblings("input").val().replace("件", "") * 1; //当前商品数目
        cursigPrice = $(target).parent().parent().find(".price").html(); //商品单价
        curtotalNum++;

        totalPrice = totalPrice + cursigPrice * 1; //当前商品总价格
        totalGoods = ++totalGoods; //商品总数

        curtotalsigPrice = cursigPrice * curtotalNum;
        $(target).parent().parent().find(".total-price").html(curtotalsigPrice);
        updateData(totalPrice, totalGoods);

        $(target).siblings("input").val(curtotalNum + "件");
    }
    if (target.className == "shop-l") {
        curtotalNum = $(target).siblings("input").val().replace("件", "") * 1; //当前商品数目
        cursigPrice = $(target).parent().parent().find(".price").html(); //商品单价
        if (curtotalNum > 1) {
            curtotalNum--;

            totalPrice = totalPrice - cursigPrice * 1; //当前商品总价格
            totalGoods = --totalGoods; //商品总数

            curtotalsigPrice = cursigPrice * curtotalNum;
            $(target).parent().parent().find(".total-price").html(curtotalsigPrice);

            updateData(totalPrice, totalGoods);
        } else {
            curtotalNum = 1;
        }
        $(target).siblings("input").val(curtotalNum + "件");
    }
});


function updateData(price, goods) {
    priceAll.html(price); // 总价格
    shoppingWarn.find("code").html(goods); // 商品总数
}

// 移除元素
function removeEle(ele) {
    ele.remove();
}


// 添加购物车内容
function add(id, src, name, price, allPrice) {
    // 如果没有被添加，则append
    if (cart.indexOf(id) == -1) {
        cart.push(id);
        var str = '<li  data-goodsid="' + id + '">' +
            '<div class="checkbox">' +
            '<input type="checkbox" />' +
            '</div>' +
            '<img src = "' + src + '" />' +
            '<div class="title">' + name + '</div>' +
            '<div class="price">' + price + '</div>' +
            '<div class="cart-num">' +
            '<span class="shop-l" id="minus' + id + '"  data-price="' + price + '">-</span>' +
            '<input type="text" value="1件" id="numId' + id + '" />' +
            '<span class="shop-r" id="plus' + id + '"  data-price="' + price + '">+</span>' +
            '</div>' +
            '<div class="total-price">' + allPrice + '</div>' +
            '<div class="del"><span class="glyphicon glyphicon-trash" id="del-btn"></span></div>' +
            '</li>';
        shopingList.append(str);
        totalGoods++;
        totalPrice = totalPrice + price * 1;
    } else {
        // 查找匹配项，更改数据
        for (var i = 0; i < $('#cartLi > li').length; i++) {
            if ($($('#cartLi').find("li")[i]).attr("data-goodsid") == id) {
                var tagLi = $("#cartLi").find("li")[i],
                    inp = $(tagLi).find("input[type='text']").val(),
                    upDateNum = parseInt(inp);
                $(tagLi).find("input[type='text']").val(upDateNum + 1 + "件");
                //总价
                var sigPrice = allPrice,
                    inpV = inp.replace("件", ''),
                    allInp = inpV * 1;
                var allNum = (allInp * sigPrice) + (sigPrice * 1);
                $(tagLi).find(".total-price").html(allNum);
                console.log(sigPrice, allNum);
                break;
            }
        }
        totalGoods++;
        totalPrice = totalPrice + price * 1;
        console.log(cart);
    }
    cartText.html(11);
    shoppingWarn.html('一共 <code>' + totalGoods + '</code> 宝贝');
    priceAll.html(totalPrice);
}
