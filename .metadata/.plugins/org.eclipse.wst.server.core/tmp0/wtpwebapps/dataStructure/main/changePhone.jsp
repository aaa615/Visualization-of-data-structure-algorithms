<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>修改手机号</title>
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
		修改手机号
	</div>
</div>
<div class="container">
	<label id="global_trip" style="display:none">${message}</label>
    <form class="changePass" action="changePhoneAcManageUserAction" method="post" onsubmit="return checkPhone()">
        <input type="text" id="oldPhone" name="prephone" value=${current_user.phonenum} readonly><br>
        <input type="text" id="newPhone" placeholder="请输入新手机号" name="newphone"><br>
        <div class="btn_contain">
        <input class="btn" type="submit" value="提交" name="changesubmition">
        <input class="btn" type="reset" value="取消修改" name="changesubmition">
        </div>
    </form>
</div>
</body>
</html>