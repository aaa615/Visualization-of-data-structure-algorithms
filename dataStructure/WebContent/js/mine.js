/**
 * 
 */

//点击修改按钮后
function changeName() {
	var oldName;
    var nTxt=document.getElementsByClassName("name_txt");
	oldName=document.getElementsByName("newName")[0].value;
//    console.log(oldName);
	
    nTxt[0].readOnly=false;
    nTxt[0].focus();
    console.log(nTxt[0].readOnly);
    nTxt[0].style.backgroundColor="#FFFFFF";
    nTxt[0].style.border="2px solid rgba(160,238,225,1)";
}

//确认是否修改
function makeSure(){
    let flag=true;
    flag=flag && confirm("是否要修改密码？");
    if(flag){
        var password=document.getElementById("newPass");
        //密码正则表达式
        var password_reg=/([0-9]|[a-z]|[A-Z]|_){8,16}/;

        flag=flag && password_reg.test(password.value);

        //密码格式不正确
        if(password_reg.test(password.value)!=true){
            alert("密码为8-16位数字和字母和下划线，不能含有特殊字符");
        }

        //确认密码
        var surePassword=document.getElementById("surePass");
        flag=flag && (surePassword.value==password.value);

        //两次密码不一致
        if(surePassword.value!=password.value){
            alert("两次密码不一致，请检查后重新输入");
        }
    }
    return flag;
}

//用户名格式检查
function checkName(){
	let userName=document.getElementsByName("newName");
//	console.log(oldName);

    //用户名正则表达式
    let userName_reg=/(.){6,18}/ig;
    //用户名不正确
    if(userName_reg.test(userName[0].value)!=true){
    	
    	alert("用户名由6—18位字符组成");
        
        userName[0].value=oldName;
        return false;
    }else{
        return true;
    }
}

//手机号格式检查
function checkPhone(){
	let flag=true;
    flag=flag && confirm("是否要修改手机号？");
	

    if(flag){
        var phonenum=document.getElementById("newPhone");
        //手机号正则表达式
        var phoneNum_reg=/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        flag=flag && phoneNum_reg.test(phonenum.value);

        //手机号格式不正确
        if(phoneNum_reg.test(phonenum.value)!=true){
            alert("手机号格式不正确");
        }

    }
    return flag;
}
