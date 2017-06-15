<%@ page language="java" contentType="text/html; charset=utf-8"   pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>  
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>跳转中</title>
</head>
<body>  
    <form id="form1" runat="server">  
        <div id='div1'> 
             
        </div>  
    </form>  
</body>  
</html>  
  
  
    <script type="text/javascript">  
    //设定倒数秒数  
    var t = 3;  
    //显示倒数秒数  
    function showTime(){  
        t -= 1;  
        document.getElementById('div1').innerHTML= "跳转中，还剩"+t+"s";  
        if(t==0){  
            location.href='http://localhost:8081/demo/login';  
             }  
        //每秒执行一次,showTime()  
        setTimeout("showTime()",1000);  
        }  
  
  
    //执行showTime()  
    showTime();  
    </script> 