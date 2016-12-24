// jQuery validator 手机号码验证规则
jQuery.validator.addMethod("isPhoneNum", function (value, element) {
    var tel = /^1[34578]\d{9}$/;
    return this.optional(element) || (tel.test(value));
}, "请正确填写您的手机号码");

// 只能包括英文字母和数字
jQuery.validator.addMethod("noSpecialChar", function (value, element) {
    return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
}, "只能包括英文字母和数字");

// 只能包括英文字母
jQuery.validator.addMethod("onlyAZ", function (value, element) {
    return this.optional(element) || /^[a-zA-Z]+$/.test(value);
}, "只能包括英文字母");

// 必须包含一个大写字母
jQuery.validator.addMethod("mustOneAZ", function (value, element) {
    return this.optional(element) || /[A-Z]{1}/.test(value);
}, "必须包含一个大写字母");

// 学号认证
jQuery.validator.addMethod("snumber", function (value, element) {
    return this.optional(element) || /^(2015|2013)+\d{6}$/.test(value);
}, "请输入2015或2013开头的10位学号");

// 手机号码验证
jQuery.validator.addMethod("mobile", function(value, element) {
    var length = value.length;
    var mobile =  /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/
    return this.optional(element) || (length == 11 && mobile.test(value));
}, "手机号码格式错误");

// 只能输入中文
jQuery.validator.addMethod("stringCH", function(value, element) {
    var length = value.length;
    for(var i = 0; i < value.length; i++){
        if(value.charCodeAt(i) > 127){
            length++;
        }
    }
    return this.optional(element) || /[^u4E00-u9FA5]/g.test(value);
}, "只能输入汉字,一个汉字占两具字节");