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
    $("#login").click(function() {
    	var username = $("#username").val();
    	var password = $("#password").val();
    	var user = new Object();
    	user.username = username;
    	user.password = password;
    	var jsonData = JSON.stringify(user);
    	var oAjaxOption = {
                type: "post",
                url: sContextPath + "/rest/checkLogin.json",
                contentType: "application/json",
                dataType: "text",
                data:jsonData,
                success: function(oData, oStatus) {
                },
                error: function(oData, oStatus, eErrorThrow) {
                },
                complete: function (oXmlHttpRequest, oStatus) {
                }
        };
        $.ajax(oAjaxOption);
    });
});