<%@ page language="java" contentType="text/html; charset=utf-8"   pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>  
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="keyword" content="Bootstrap,Admin,Template,Open,Source,AngularJS,Angular,Angular2,jQuery,CSS,HTML,RWD,Dashboard">

    <spring:url value="/resources/img/favicon.png" var="shortcut_icon"/>

    <link href="${shortcut_icon}" rel="icon"/>
    
    <title>createdBy-西瓜不甜</title>
    <!-- CSS -->
    
    <!-- Icons -->
    <spring:url value="/resources/css/font-awesome.min.css" var="font_awesome"/>
    <link href="${font_awesome}" rel="stylesheet" type="text/css"  media="screen, projection" />
    
    <spring:url value="/resources/css/simple-line-icons.css" var="simple_line_icons"/>
    <link href="${simple_line_icons}" rel="stylesheet" type="text/css" media="screen, projection"/>
    
    <!-- Main styles for this application -->
    
    <spring:url value="/resources/css/style.css" var="style"/>
    <link href="${style}" rel="stylesheet" type="text/css" media="screen, projection"/>
    
     

    
</head>
<body class="app flex-row align-items-center">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="clearfix">
                    <h1 class="float-left display-3 mr-2">404</h1>
                    <h4 class="pt-1">Oops! You're lost.</h4>
                    <p class="text-muted">The page you are looking for was not found.</p>
                </div>
                <div class="input-prepend input-group">
                    <span class="input-group-addon"><i class="fa fa-search"></i>
                    </span>
                    <input id="prependedInput" class="form-control" size="16" type="text" placeholder="What are you looking for?">
                    <span class="input-group-btn">
                        <button class="btn btn-info" type="button">Search</button>
                    </span>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="<c:url value="resources/js/jquery.js" />"></script>
    <script type="text/javascript" src="<c:url value="resources/plugin/tether_js/js/tether.min.js" />"></script>
    <script type="text/javascript" src="<c:url value="resources/plugin/bootstrap-3.2.0/js/bootstrap.min.js" />"></script>
</body>
</html>