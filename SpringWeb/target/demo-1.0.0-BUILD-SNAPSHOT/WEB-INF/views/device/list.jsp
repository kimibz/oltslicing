<%@ page language="java" contentType="text/html; charset=utf-8"   pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>  
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>Starter Template for Bootstrap</title>

   <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- 可选的 Bootstrap 主题文件（一般不用引入） -->
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

    <!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
    <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
  </head>

  <body>
        <h3>设备信息 </h3>
  <button type="button" class="btn btn-primary">添加设备</button>
<!-- Modal -->
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">修改设备名称</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
          <label for="exampleInputEmail1">设备名称</label>
          <div class="row">
              <div class="col-md-12">
                  <input onkeyup="value=value.replace(/[^\w\.\/]/ig,'')" type="text" class="form-control" id="new_device_id" placeholder="新设备名称">
              </div>
          </div>
        </div>
        </div>
        <div class="modal-footer">
<!--           <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button> -->
<!--           <button type="button" class="btn btn-primary">保存</button> -->
          <a href="javascript:;" class="btn btn-sm btn-white" data-dismiss="modal">取消</a>
          <a href="javascript:;" id="change-name" class="btn btn-sm btn-primary" data-dismiss="modal" data-click="add" data-action-target="accountInfo">确定</a>
        </div>
      </div>
    </div>
  </div>
<!--   template -->
    <div class="row">
        <div class="col-md-18">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div id="device-placeholder">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <form class="form-inline">
        <div class="form-group">
            <label for="exampleInputName2">初始端口</label>
                 <input onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" type="text" class="form-control" id="create_start" placeholder="start_port">
        </div>
        <div class="form-group">
            <label for="exampleInputEmail2">结束端口</label>
                <input onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" type="text" class="form-control" id="create_end" placeholder="end_port">
        </div>
        <button type="submit" class="btn btn-default" id="create_device">创建设备连接</button>
<!--          创建的设备名称为device+端口号 -->
<!--          <span id="helpBlock" class="help-block">创建的设备名称为device+端口号</span> -->
    </form>
    <form class="form-inline">
        <div class="form-group">
            <label for="exampleInputName2">初始端口</label>
                 <input onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" type="text" class="form-control" id="delete_start" placeholder="start_port">
        </div>
        <div class="form-group">
            <label for="exampleInputEmail2">结束端口</label>
                <input onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" type="text" class="form-control" id="delete_end" placeholder="end_port">
        </div>
        <button type="submit" class="btn btn-default" id="delete_device">删除设备连接</button>
    </form>


     <!-- ================== BEGIN TEMPLATE ================== -->
        <script id="device-template" type="text/html" charset="UTF-8">
                                                     <div class="table-responsive">
                                                         <table id="device" class="table table-hover" cellspacing="0" width="100%">
                                                             <thead>
                                                                 <tr>
                                                                     <td style="width: 10%;">#</td>
                                                                     <td style="width: 30%;">设备名称</td>
                                                                     <td style="width: 30%;"></td>
                                                                     <td style="width: 30%;">设备状态</td>
                                                                 </tr>
                                                             </thead>
                                                             <tbody>
                                                                 {{each list as item,index}}
                                                                 <tr>
                                                                     <td class="email-subject text-ellipsis" title="{{index}}">{{index+1}}</td>
                                                                     <td class="email-subject text-ellipsis" title="{{item.id}}">{{item.id}}</td>
                                                                     <td class="email-select">
                                                                         <a href="javascript:;" button class="btn btn-default" data-toggle="modal" data-click="edit" data-target="#myModal" type="submit" data-click-data="{{item.node_id}}">修改设备名称</a>
                                                                         <a href="javascript:;" button class="btn btn-default"  data-click="delete" type="submit" data-click-data="{{item.node_id}}">删除设备</a>   
                                                                     </td>
                                                                     <td class="email-subject text-ellipsis" title="{{item.state}}">{{item.state}}</td>
                                                                 </tr>
                                                                 {{/each}}
                                                             </tbody>
                                                         </table>
                                                     </div>
        </script>

    <!-- ================== END TEMPLATE ================== -->
    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')</script>
    <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    
    <!--引用本地JS文件 -->
    <script type="text/javascript" src="<c:url value="/resources/js/list.js" />"></script>
    <script type="text/javascript" src="<c:url value="/resources/plugin/artTemplate/template.js" />"></script>
    
    
    
    
  </body>
</html>
