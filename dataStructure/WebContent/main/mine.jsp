<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>个人信息</title>
<link rel="stylesheet" href="../css/mine.css">
<script>
	window.onload=function(){
		let trip=document.getElementById("global_trip");
	    if(trip.innerText!=""){
	        alert(trip.innerText);
	    }
	    var oldName;
	    var nTxt=document.getElementsByClassName("name_txt");
	    //名称input失去焦点后
	    nTxt[0].onblur=function () {
	        console.log(nTxt[0].readOnly);
	        this.readOnly=true;
	        this.style.background="none";
	        this.style.border="none";
	    }
	    
	    
	}
</script>
</head>
<body>
<div class="nav">
	<div class="back">
		<a href="index.jsp">
	  	 	<span style="font: 16px 'Microsoft YaHei UI';color: #5d6778">返回</span>
		</a>
	</div>
	<div class="title">
		个人信息
	</div>
</div>
<div class="container">
	<label id="global_trip" style="display:none">${message}</label>

    <div class="username">
      <div class="photo">
    </div><br/>
      <form action="changeNameAcManageUserAction" method="get" onsubmit="return checkName()">
      	<input class="name_txt" value=${current_user.name} name="newName" readonly>
        <div class="btn_contain">
            <input class="btn" type="button" value="修改" onclick="changeName()">
            <input class="btn" type="submit" value="保存">
      	</div>
      </form>
    </div>
    
    <div class="setting">
        <div class="set_div">
            <a href="changePsd.jsp">修改密码</a>
        </div>
        <div class="set_div">
            <a href="changePhone.jsp">修改手机号</a>
        </div>
        <div class="set_div">
            <a href="cancelLoginAcManageUserAction">退出登录</a>
        </div>
    </div>
</div>
<script src="../js/mine.js"></script>
</body>
</html>