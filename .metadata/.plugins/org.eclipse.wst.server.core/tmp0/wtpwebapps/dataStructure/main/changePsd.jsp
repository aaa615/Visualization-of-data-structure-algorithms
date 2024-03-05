<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>修改密码</title>
<link rel="stylesheet" href="../css/mine.css">
<script src="../js/mine.js"></script>
<script>
	window.onload=function(){
		let trip=document.getElementById("global_trip");
	    if(trip.innerText!=""){
	        alert(trip.innerText);
	    }
	}
    
</script>
</head>
<body>
<div class="nav">
	<div class="back">
		<a href="mine.jsp">
	  	 	<span style="font: 16px 'Microsoft YaHei UI';color: #5d6778">返回</span>
		</a>
	</div>
	<div class="title">
		修改密码
	</div>
</div>
<div class="container">
	<label id="global_trip" style="display:none">${message}</label>
    <form class="changePass" action="changePasswordAcManageUserAction" method="post" onsubmit="return makeSure()">
        <input type="password" id="oldPass" placeholder="请输入原密码" name="prepassword"><br>
        <input type="password" id="newPass" placeholder="请输入新密码" name="newpassword"><br>
        <input type="password" id="surePass" placeholder=" 确认密码"><br>
        <div class="btn_contain">
        <input class="btn" type="submit" value="提交" name="changesubmition">
        <input class="btn" type="reset" value="取消修改" name="changesubmition">
        </div>
    </form>
</div>
</body>
</html>