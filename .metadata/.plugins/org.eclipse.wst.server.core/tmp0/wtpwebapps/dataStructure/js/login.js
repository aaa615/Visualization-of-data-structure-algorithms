function checkForm() {
	let flag=true;
    var phoneNum=document.getElementById("phoneNum");
    //手机号的正则表达式
    var phoneNum_reg=/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    //手机号不符
    if(phoneNum_reg.test(phoneNum.value)!=true){
        var phoneLabel=document.getElementById("phone_trip");
        phoneLabel.innerText="手机号格式错误!";
        console.log("手机号格式错误!");
        flag=false;
    }

    var userName=document.getElementById("userName");
    //用户名正则表达式
    var userName_reg=/(.){6,18}/ig;
    //用户名不正确
    if(userName_reg.test(userName.value)!=true){
        var nameLabel=document.getElementById("name_trip");
        nameLabel.innerText="用户名由6—18位字符组成";
        console.log("用户名由6—18位字符组成");
        flag=false;
    }

    var password=document.getElementById("password");
    //密码正则表达式
    var password_reg=/([0-9]|[a-z]|[A-Z]|_){8,16}/;
    //密码格式不正确
    if(password_reg.test(password.value)!=true){
        var passwordLabel=document.getElementById("password_trip");
        passwordLabel.innerText="密码为8-16位数字和字母和下划线，不能含有特殊字符";
        console.log("密码为8-16位数字和字母和下划线，不能含有特殊字符");
        flag=false;
    }

    //确认密码
    var surePassword=document.getElementById("surePassword");
    //两次密码不一致
    if(surePassword.value!=password.value){
        var surePasswordLabel=document.getElementById("surePassword_trip");
        surePasswordLabel.innerText="两次密码不一致，请检查后重新输入";
        console.log("两次密码不一致，请检查后重新输入");
        flag=false;
    }
    return flag;
}

function clearTrip() {
	var globalLabel=document.getElementById("global_trip");
    globalLabel.innerText="";
	
    var phoneLabel=document.getElementById("phone_trip");
    phoneLabel.innerText="";

    var nameLabel=document.getElementById("name_trip");
    nameLabel.innerText="";

    var passwordLabel=document.getElementById("password_trip");
    passwordLabel.innerText="";

    var surePasswordLabel=document.getElementById("surePassword_trip");
    surePasswordLabel.innerText="";
}