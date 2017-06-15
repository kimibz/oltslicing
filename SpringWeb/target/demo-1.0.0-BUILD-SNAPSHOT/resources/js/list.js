+$(function () {
	// 严格模式
    "use strict";
	
    // =================================== 变量声明 =================================== //
    // 取得ContextPath	
    function getContextPath() {
        var sPathName = document.location.pathname;
        var iIndex = sPathName.substr(1).indexOf("/");
        var sResult = sPathName.substr(0, iIndex+1);
        return sResult;
    }
	var nodeId;
    var sContextPath = getContextPath();
	// =================================== 方法执行 =================================== //
    //table初始化
    function setDeviceTbl(oData) {
        var hHtml = template("device-template", {list: oData});
        $("#device-placeholder").html(hHtml);
        $("#device a[data-click='edit']").bind("click", changeNameBind);
        $("#device a[data-click='delete']").bind("click", deleteDeviceBind);
    }
    //模态框 修改设备名称 确定按钮按下
    $("#myModal a[data-click='add']").click(function(){
    	var newId=$("#new_device_id").val();//获取输入框的值
    	var oAjaxOption = {
                type: "put",
                url: sContextPath + "/rest/deviceData/" + nodeId + ".json",
                contentType: "application/json",
                dataType: "text",
                data:newId,
                success: function(oData, oStatus) {
                	initPage();
                },
                error: function(oData, oStatus, eErrorThrow) {
                },
                complete: function (oXmlHttpRequest, oStatus) {
                }
        };
        $.ajax(oAjaxOption);
    });
    //添加设备按钮绑定
    $("#create_device").click(function() {
    	var start = $("#create_start").val();;
    	var end = $("#create_end").val();;
    	var data = new Object();
    	data.start = start;
    	data.end = end;
    	var jsonData = JSON.stringify(data);
    	var oAjaxOption = {
                type: "put",
                url: sContextPath + "/rest/spawnManyDevice.json",
                contentType: "application/json",
                dataType: "text",
                data:jsonData,
                success: function(oData, oStatus) {
                	initPage();
                },
                error: function(oData, oStatus, eErrorThrow) {
                },
                complete: function (oXmlHttpRequest, oStatus) {
                }
        };
        $.ajax(oAjaxOption);
    });
    //删除设备按钮绑定
    $("#delete_device").click(function() {
    	var start = $("#delete_start").val();;
    	var end = $("#delete_end").val();;
    	var data = new Object();
    	data.start = start;
    	data.end = end;
    	var jsonData = JSON.stringify(data);
    	var oAjaxOption = {
                type: "delete",
                url: sContextPath + "/rest/deleteManyDevices.json",
                contentType: "application/json",
                dataType: "text",
                data:jsonData,
                success: function(oData, oStatus) {
                	initPage();
                },
                error: function(oData, oStatus, eErrorThrow) {
                },
                complete: function (oXmlHttpRequest, oStatus) {
                }
        };
        $.ajax(oAjaxOption);
    });
    //修改设备Id功能
    function changeNameBind(){
    	nodeId = $(this).attr("data-click-data");//获取设备的node_id
    	$("#new_device_id").val("");
    }
    //删除设备
    function deleteDeviceBind(){
    	nodeId = $(this).attr("data-click-data");//获取设备的node_id
    	var oAjaxOption = {
                type: "delete",
                url: sContextPath + "/rest/deleteOneDevice.json",
                contentType: "application/json",
                dataType: "text",
                data:nodeId,
                success: function(oData, oStatus) {
                	initPage();
                },
                error: function(oData, oStatus, eErrorThrow) {
                },
                complete: function (oXmlHttpRequest, oStatus) {
                }
        };
        $.ajax(oAjaxOption);
    }
    // 画面初期化
    function initPage() {
//        // 画面事件绑定及JS插件渲染
//        initPageComponent();
        // 画面数据取得并设定
        var oAjaxOption = {
                type: "get",
                url: sContextPath + "/rest/AlldeviceInfo.json",
                contentType: "application/json",
                dataType: "json",
                success: function(oData, oStatus) {
                        setDeviceTbl(oData);
                },
                error: function(oData, oStatus, eErrorThrow) { 
                },
                complete: function (oXmlHttpRequest, oStatus) {
                }
        };
        $.ajax(oAjaxOption);
    }
    // 画面初期化
    initPage();
    // 每隔2s刷新页面
    setInterval(initPage,2000);
});