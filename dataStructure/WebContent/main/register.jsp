<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>注册</title>
<link rel="stylesheet" type="text/css" href="../css/login.css">
</head>
<body>
<div id="loginDiv">
    <form action="registerAcManageUserAction.action" method="post" onsubmit="return checkForm()">
        <h1>注册</h1>
        <p><label id="global_trip">${message}</label></p>
        <p>手机号:&nbsp;<input id="phoneNum" name="u.phonenum" required ><br>
            <label id="phone_trip"></label>
        </p>

        <p>用户姓名:<input id="userName" type="text" name="u.name" autofocus required><br>
            <label id="name_trip"></label>
        </p>

        <p>用户密码:<input id="password" type="password" name="u.password" required><br>
            <label id="password_trip"></label>
        </p>

        <p>确认密码:<input id="surePassword" type="password" required><br>
            <label id="surePassword_trip"></label>
        </p>
        <div class="sexDiv">
            用户性别:
            <input class="userSex" name="u.sex" value="男" type="radio">男
            <input class="userSex" name="u.sex" value="女" type="radio">女
            <br>
            <label id="sex_trip"></label>
        </div>

        <p style="text-align: center;">
            <input type="submit" class="button" value="提交">
            <input type="reset" class="button" onmouseup="clearTrip()" value="重置">
        </p>
    </form>
</div>
<script type="text/javascript" src="../js/login.js"></script>
</body>
</html>