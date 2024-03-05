<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>登录</title>

<!-- http://localhost:8080/dataStructure/main/login.jsp -->


<link rel="stylesheet" type="text/css" href="../css/login.css">
</head>
<body>
<div id="loginDiv">
        <form action="loginAcManageUserAction.action" id="loginForm" method="post">
            <h1 style="text-align: center;color: aliceblue;">登陆</h1>
            <p><label id="global_trip">${message}</label></p>
             <p>手机号:<input id="phonenum" type="text" name="u.phonenum" value="13023336666"></p>
            
            <p>用户名:<input id="username" type="text" name="u.name" value="zhangsan"></p>
 
            <p>密码:&nbsp;<input id="password" type="password" name="u.password" value="mic123456"></p>
 
 			<p><a href="register.jsp">注册>>></a></p>
 			
            <div style="text-align: center;margin-top: 30px;">
                <input type="submit" class="button" value="登陆">
                <input type="reset" class="button" value="重置" onmouseup="clearTrip()">
            </div>
        </form>
    </div>
    <script type="text/javascript">

    function clearTrip(){
    	var globalLabel=document.getElementById("global_trip");
    	globalLabel.innerText="";
    }
    </script>
</body>
</html>