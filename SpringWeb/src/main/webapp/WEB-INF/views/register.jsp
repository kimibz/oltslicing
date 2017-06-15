<%@ page language="java" contentType="text/html; charset=utf-8"   pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>  
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %> 
<%
    String url = request.getRequestURL().toString();
    url = url.substring(0, url.indexOf('/', url.indexOf("//") + 2));
    String context = request.getContextPath();
    url += context;
    application.setAttribute("ctx", url);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">  
<html>  
<head>  
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">  
<title>注册</title>  
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="CoreUI Bootstrap 4 Admin Template">
    <meta name="author" content="Lukasz Holeczek">
    <meta name="keyword" content="CoreUI Bootstrap 4 Admin Template">
    <spring:url value="/resources/img/favicon.png" var="shortcut_icon"/>
    <link href="${shortcut_icon}" rel="icon"/>


    <!-- Icons -->
    <spring:url value="/resources/css/font-awesome.min.css" var="font-awesome"/>
    <link href="${font-awesome}" rel="stylesheet" type="text/css" media="screen, projection"/>
    
    <spring:url value="/resources/css/simple-line-icons.css" var="simple-line-icons"/>
    <link href="${simple-line-icons}" rel="stylesheet" type="text/css" media="screen, projection"/>


    <!-- Main styles for this application -->
    <spring:url value="/resources/css/style.css" var="style"/>
    <link href="${style}" rel="stylesheet" type="text/css" media="screen, projection"/>

</head>

<body class="app flex-row align-items-center">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card mx-2">
                    <div class="card-block p-2">
                        <h1>Register</h1>
                        <p class="text-muted">Create your account</p>
                        <form action="${ctx}/registerNewUser.do" method="post">
                        <div class="input-group mb-1">
                            <span class="input-group-addon"><i class="icon-user"></i>
                            </span>
                            <input type="text" class="form-control" id="username" name="username" placeholder="Username">
                        </div>

                        <div class="input-group mb-1">
                            <span class="input-group-addon">@</span>
                            <input type="text" class="form-control" id="email" name="email" placeholder="Email">
                        </div>

                        <div class="input-group mb-1">
                            <span class="input-group-addon"><i class="icon-lock"></i>
                            </span>
                            <input type="password" class="form-control" id="password" name="password" placeholder="Password">
                        </div>

                        <div class="input-group mb-2">
                            <span class="input-group-addon"><i class="icon-lock"></i>
                            </span>
                            <input type="password" class="form-control" placeholder="Repeat password">
                        </div>

                        <button type="submit" class="btn btn-block btn-success">Create Account</button>
                        </form>
                    </div>
                    <div class="card-footer p-2">
                        <div class="row">
                            <div class="col-6">
                                <button class="btn btn-block btn-facebook" type="button">
                                    <span>facebook</span>
                                </button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-block btn-twitter" type="button">
                                    <span>twitter</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap and necessary plugins -->
    <script type="text/javascript" src="<c:url value="resources/js/jquery.js" />"></script>
    <script type="text/javascript" src="<c:url value="resources/plugin/tether_js/js/tether.min.js" />"></script>
    <script type="text/javascript" src="<c:url value="resources/plugin/bootstrap-3.2.0/js/bootstrap.min.js" />"></script>



</body>  
</html> 