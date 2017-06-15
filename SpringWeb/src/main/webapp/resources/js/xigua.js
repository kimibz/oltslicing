//========== Dayspring 模块 ==========//
;var dayspring;

if (dayspring) {
    throw new Error("Dayspring can not be loaded, it already exists.");
} else {
    dayspring = {};
}
if ("undefined" === typeof jQuery) { 
    throw new Error("Dayspring\'s javaScript requires jQuery.");
}
if ("undefined" === typeof dayspring_local ) {
     throw new Error("Dayspring\'s javaScript requires i18n file.");
}

(function(namespace) {
    "use strict";

    // 函数：重置Parsley的显示效果
    function resetParsley(parsleyFormInstance, parsleyId) {

        // 妥当性验证
        if (null == parsleyFormInstance || null == parsleyFormInstance.fields || null == window.ParsleyUI) {
            return false;
        }

        if (null == parsleyId || "string" != typeof parsleyId) {
            for (var i = 0; i < parsleyFormInstance.fields.length; i++) {
                resetParsleyField(parsleyFormInstance.fields[i]);
            }
        } else {
            resetParsleyField(parsleyFormInstance.fieldsMappedById["ParsleyField-" + parsleyId] || parsleyFormInstance.fieldsMappedById["ParsleyFieldMultiple-" + parsleyId]);
        }
    }

    // 函数：重置ParsleyField
    function resetParsleyField(parsleyField) {

        // 妥当性验证
        if (null == window.ParsleyUI || null == parsleyField || null == parsleyField._ui || null == parsleyField._ui.$errorsWrapper) {
            return false;
        }

        // 验证类型列表
        var validatorsList = ["email", "url", "number", "integer", "digits", "alphanum", "notblank", "required", "pattern", "min", "max", "range", "minlength", "maxlength", "length", "mincheck", "maxcheck", "check", "equalto"];

        // 删除错误
        for (var key in validatorsList) {
            window.ParsleyUI.removeError(parsleyField, validatorsList[key], true);
        }
        // 删除样式
        parsleyField._ui.$errorClassHandler.removeClass(
                parsleyField.options.successClass).removeClass(parsleyField.options.errorClass);
        // 删除状态
        parsleyField._ui.validatedOnce = false;
        parsleyField._ui.lastValidationResult = [];
        parsleyField._ui.validationInformationVisible = false;
    }

    // 函数：获取FileInput的默认选项
    function getFileInputOption() {
        var option = {
                browseLabel: '浏览 &hellip;',
                removeLabel: '移除',
                uploadLabel: '上传',
                maxFileSize: 10240,
                maxFileCount: 1,
                browseClass: 'btn btn-success',
                uploadClass: 'btn btn-default',
                allowedFileExtensions: ['jpg', 'jpeg', 'gif', 'png', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'rar', 'zip'],
                showUpload: false,
                msgSizeTooLarge: '文件 "{name}" (<b>{size} KB</b>) 的容量已超过上传上限 (<b>{maxSize} KB</b>)。请重新选择。',
                msgFilesTooMany: '上传文件的数量 (<b>({n})</b>) 已超过上传上限 (<b>{m}</b>)。请重新选择。',
                msgFileNotFound: '文件 "{name}" 未找到。',
                msgFileNotReadable: '文件 "{name}" 无法读取。',
                msgFilePreviewAborted: '"{name}"的预览。',
                msgFilePreviewError: '读取文件 "{name}" 时发生错误。',
                msgInvalidFileType: '无效的文件类型 "{name}"。仅支持 "{types}" 类型的文件。',
                msgInvalidFileExtension: '无效的文件类型 "{name}"。仅支持文件扩展名为 "{extensions}" 的文件。',
                msgValidationError: '<span class="text-danger"><i class="glyphicon glyphicon-exclamation-sign"></i> 文件上传错误 </span>',
                msgLoading: '正在读取文件 &hellip;',
                msgProgress: '读取文件 {index} / {files} - {name} - 已完成 {percent}% 。',
                msgSelected: '已选择 {n} 个文件。',
                previewFileType:'any',
                showPreview:false
        };
        return option;
    }

    // 函数：获取DataTable的默认选项
    function getDataTableOption(serverSide) {
        var option = {
                sDom: "<'row'<'col-md-8 col-sm-8'pi><'col-md-4 col-sm-4'f>r>t",
                sPaginationType: "full",
                aLengthMenu: [ 20, 50, 100 ],
                iDisplayLength: 20,
                bAutoWidth: false,
                oLanguage: {
                    oPaginate: {
                        sFirst: "<i class='fa fa-angle-double-left'></i>",
                        sLast: "<i class='fa fa-angle-double-right'></i>",
                        sNext: "<i class='fa fa-angle-right'></i>",
                        sPrevious: "<i class='fa fa-angle-left'></i>"
                    },
                    sEmptyTable: "表中没有可用的数据",
                    sInfo: "第 _START_ - _END_ 条记录（共 _TOTAL_ 条记录）",
                    sInfoEmpty: "显示 0 条记录",
                    sInfoFiltered: "（从 _MAX_ 条记录中过滤）",
                    sLengthMenu: "显示 _MENU_ 条记录",
                    sLoadingRecords: "正在读取……",
                    sProcessing: "",
                    sSearch: "",
                    sSearchPlaceholder: "输入关键字可快速查找",
                    sZeroRecords: "未匹配到符合条件的记录"
                }
        };
        if (serverSide) {
            option.bProcessing = true;
            option.bServerSide = true;
            option.searchDelay = 1000;
        }
        return option;
    }

    // 函数：获取Wizard的默认选项
    function getWizardOption() {
        var option = {
                backBtnText: "&larr; 上一步",
                nextBtnText: "下一步 &rarr;"
        };
        return option;
    }

    //  函数：获取Select2的默认选项
    function getSelect2Option() {
        var option = {
                formatMatches: function (matches) { return "有 " + matches + " 条可用结果，请使用上下箭头进行导航"; },
                formatNoMatches: function () { return "未匹配到符合条件的记录"; },
                formatInputTooShort: function (input, min) { var n = min - input.length; return "请输入 " + n + " 个或更多字符"; },
                formatInputTooLong: function (input, max) { var n = input.length - max; return "请删除 " + n + " 个字符"; },
                formatSelectionTooBig: function (limit) { return "您仅能选择 " + limit + " 个选项"; },
                formatLoadMore: function (pageNumber) { return "正在读取更多结果……"; },
                formatSearching: function () { return "正在查询……"; },
        };
        return option;
    }

    // 函数：获取DatePicker的默认选项
    function getDatePickerOption() {
        var option = {
                format: "yyyy-mm-dd",
                autoclose: true,
                todayHighlight: true,
                language: "zh-CN",
                startDate: "1900-01-01"
        };
        return option;
    }

    // 函数：获取blockUI的默认选项
    function getBlockOption() {
        var imgUrl = getContextPath() + "/resources/img/cycle.jpg";
        var option = {
                message: '<img src="' + imgUrl + '" />',
                css: { backgroundColor: "transparent", border: "0px" },
                baseZ: 100000
        };
        return option;
    }

    // 函数：获取Dialog的默认选项
    function getDialogOption() {
        var option = {
                title: "系统提示",
                contentTitle: "<i class='fa fa-exclamation-triangle'></i> 提示",
                contentStyle: "alert alert-danger m-b-0",
                showTimesButton: false,
                showCloseButton: false,
                otherButtons: ["取消","确认"],
                otherButtonStyles: ["btn-sm btn-white", "btn-sm btn-danger"],
                bootstrapModalOption: { backdrop: "static" }
        };
        return option;
    }

    // 函数：获取intlTelInput的默认选项
    function getIntlTelInputOption() {
        var option = {
                defaultCountry: "cn",
                numberType: "FIXED_LINE",
                preferredCountries: ["cn", "hk", "mo", "tw", "us"],
                utilsScript: getContextPath() + "/resources/plugins/intl-tel-input/js/utils.js"
        };
        return option;
    }

    // 函数：获取ECharts的主题
    function getEChartsTheme() {
        var theme = {
                backgroundColor: "#fff",
                // 默认色板
                color: [
                    '#1790cf','#1bb2d8','#99d2dd','#88b0bb',
                    '#1c7099','#038cc4','#75abd0','#afd6dd'
                ],
                // 图表标题
                title: {
                    textStyle: {
                        fontWeight: 'normal',
                        color: '#1790cf'
                    }
                },
                // 值域
                dataRange: {
                    color:['#1178ad','#72bbd0']
                },
                // 工具箱
                toolbox: {
                    color : ['#1790cf','#1790cf','#1790cf','#1790cf']
                },
                // 提示框
                tooltip: {
                    trigger: "axis",
                    backgroundColor : "rgba(255,255,255,0.8)",
                    borderColor : "rgba(230,230,230,0.8)",
                    borderRadius : 10,
                    borderWidth: 2,
                    axisPointer: {
                        type: "none"
                    },
                    textStyle: {
                        color: "#666",
                        fontFamily: "arial, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', '宋体', Tahoma, Arial, Helvetica, STHeiti;",
                        fontSize: 12
                    }
                },
                calculable : false,
                // 区域缩放控制器
                dataZoom: {
                    dataBackgroundColor: '#eee',            // 数据背景颜色
                    fillerColor: 'rgba(144,197,237,0.2)',   // 填充颜色
                    handleColor: '#1790cf'     // 手柄颜色
                },
                // 网格
                grid: {
                    borderWidth: 0
                },
                // 类目轴
                categoryAxis: {
                    axisLine: {            // 坐标轴线
                        show: true,
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: '#1790cf'
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        show: false
                    },
                    splitLine: {           // 分隔线
                        show: false,
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            color: ['#eee']
                        }
                    }
                },
                // 数值型坐标轴默认参数
                valueAxis: {
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: '#1790cf'
                        }
                    },
                    splitArea : {
                        show : true,
                        areaStyle : {
                            color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.1)']
                        }
                    },
                    splitLine: {           // 分隔线
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            color: ['#eee']
                        }
                    }
                },
                timeline : {
                    lineStyle : {
                        color : '#1790cf'
                    },
                    controlStyle : {
                        normal : { color : '#1790cf'},
                        emphasis : { color : '#1790cf'}
                    }
                },
                pie: {
                    clockWise:true,
                    startAngle: 135,
                    radius : ['50%', '80%'],
                    itemStyle: {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                position : 'center',
                                formatter : "{b}\n{d}%",
                                textStyle : {
                                    color : '#000000',
                                    fontSize : '15',
                                    fontFamily : '微软雅黑',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    }
                },
                // K线图默认参数
                k: {
                    itemStyle: {
                        normal: {
                            color: '#1bb2d8',          // 阳线填充颜色
                            color0: '#99d2dd',      // 阴线填充颜色
                            lineStyle: {
                                width: 1,
                                color: '#1c7099',   // 阳线边框颜色
                                color0: '#88b0bb'   // 阴线边框颜色
                            }
                        }
                    }
                },
                map: {
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                color: '#ddd'
                            },
                            label: {
                                textStyle: {
                                    color: '#c12e34'
                                }
                            }
                        },
                        emphasis: {                 // 也是选中样式
                            areaStyle: {
                                color: '#99d2dd'
                            },
                            label: {
                                textStyle: {
                                    color: '#c12e34'
                                }
                            }
                        }
                    }
                },
                force : {
                    itemStyle: {
                        normal: {
                            linkStyle : {
                                color : '#1790cf'
                            }
                        }
                    }
                },
                chord : {
                    padding : 4,
                    itemStyle : {
                        normal : {
                            borderWidth: 1,
                            borderColor: 'rgba(128, 128, 128, 0.5)',
                            chordStyle : {
                                lineStyle : {
                                    color : 'rgba(128, 128, 128, 0.5)'
                                }
                            }
                        },
                        emphasis : {
                            borderWidth: 1,
                            borderColor: 'rgba(128, 128, 128, 0.5)',
                            chordStyle : {
                                lineStyle : {
                                    color : 'rgba(128, 128, 128, 0.5)'
                                }
                            }
                        }
                    }
                },
                gauge : {
                    axisLine: {            // 坐标轴线
                        show: true,        // 默认显示，属性show控制显示与否
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: [[0.2, '#1bb2d8'],[0.8, '#1790cf'],[1, '#1c7099']], 
                            width: 8
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        splitNumber: 10,   // 每份split细分多少段
                        length :12,        // 属性length控制线长
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: 'auto'
                        }
                    },
                    axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            color: 'auto'
                        }
                    },
                    splitLine: {           // 分隔线
                        length : 18,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            color: 'auto'
                        }
                    },
                    pointer : {
                        length : '90%',
                        color : 'auto'
                    },
                    title : {
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            color: '#333'
                        }
                    },
                    detail : {
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            color: 'auto'
                        }
                    }
                },
                textStyle: {
                    fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
                }
            };
            return theme;
    }

    // 函数：获取jQuery版本号
    function getJQueryVersion() {
        return $.fn.jquery;
    }

    // 函数：判断浏览器是否为MSIE
    // 说明：1. 不使用$.browser.msie进行判断，因为从jQuery 1.9之后，jQuery不再支持该属性，改为使用$.support
    //          2. 不使用navigator.userAgent进行判断，因为从IE11起，IE的userAgent不再包含"MSIE"文字
    function isMSIE() {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            return true;
        } else {
            return false; 
        }
    }

    // 函数：提醒信息
    function notifyMessage(status, sticky) {
        if (status == null || status.statusType == null) {
            status = {
                    statusType: "fail",
                    messages: ["未知错误。"]
            };
        }
        if (status.messages == null || $.isArray(status.messages) == false) {
            status.messages = [];
        }
        if ($.gritter == null) {
            alert(status.messages.join(""));
        }
        var clazz;
        var title;
        var image = getContextPath() + "/resources/img/";
        var statusType = status.statusType.toLowerCase();
        if ("success" == statusType) {
            clazz = "gritter-success";
            title = "信息";
            image += "success.png";
        } else if ("info" == statusType) {
            clazz = "gritter-info";
            title = "信息";
            image += "info.png";
        } else if ("warning" == statusType) {
            clazz = "gritter-warning";
            title = "警告";
            image += "warning.png";
        } else {
            clazz = "gritter-danger";
            title = "错误";
            image += "danger.png";
        }
        var messages = status.messages.join("<br/>");
        $.gritter.add({
            title: title,
            text: messages,
            image: image,
            sticky: sticky,
            time: '',
            class_name: clazz
        });
    }

    // 函数：显示信息（指定位置显示）
    function showMessageAt($element, status) {
        if (status == null || status.statusType == null) {
            status = {
                    statusType: "fail",
                    messages: ["未知错误。"]
            };
        }
        if (status.messages == null || $.isArray(status.messages) == false) {
            status.messages = [];
        }
        var clazz;
        var statusType = status.statusType.toLowerCase();
        if ("success" == statusType) {
            clazz = "alert-success";
        } else if ("info" == statusType) {
            clazz = "alert-info";
        } else if ("warning" == statusType) {
            clazz = "alert-warning";
        } else {
            clazz = "alert-danger";
        }
        var messages = "";
        for (var key in status.messages) {
            messages += (status.messages[key] + "<br>");
        }
        $element.empty().html("<div class='alert fade m-b-0'><button type='button' class='close' data-dismiss='alert'>&times;</button></div>");
        $element.find("button").after(messages);
        $element.find("div").addClass(clazz).addClass("in");
    }

    // 函数：显示信息（默认位置显示）
    function showMessage(status) {

        // gritter存在的场合，使用gritter向用户提示信息；不存在的场合，使用messageBar向用户提示信息
        if ($.gritter != null) {
            notifyMessage(status, false);
        } else {
            // 取得默认信息显示位置
            var $messageBar = $("#messagebar-placeholder");
            showMessageAt($messageBar, status);
        }
    }

    // 函数：显示警告对话框
    function showWarningDialog(message, buttons, callbacks, sender) {
        if (callbacks == null
                || $.isArray(callbacks) == false
                || callbacks.length < 1
                || $.fn.teninedialog == null
                || typeof($.fn.teninedialog) != "function") {
            return;
        }
        if (message == null) {
            message = "您确定要执行此项操作吗？";
        }
        var option = getDialogOption();
        option.content = message;
        if(buttons != null){
            option.otherButtons = buttons.split(",");
        }
        option.clickButton = function(dialogClickBtn,modal,index) {
            if (index == 1) {
                for (var i = 0; i < callbacks.length; i++) {
                    callbacks[i].call(sender);
                }
            }
            $(this).closeDialog(modal);
        };
        $.teninedialog(option);
    }

    // 函数：处理WizardSteps
    function handleWizardSteps(data) {

        // 取得当前流程进度
        if (data == null) {
            return;
        }
        var currentStep = data.applCurrentStep;
        if (currentStep == null) {
            return;
        }

        // 获取WizardSteps
        var $wizardSteps = $("ol.bwizard-steps");
        var tempHtml = "<li class='inactive' data-step='{step}' data-toggle='tooltip' data-container='body' data-original-title='{tooltip}'>";
        tempHtml += "<span class='label badge-inverse'>{index}</span>";
        tempHtml += "<a href='javascript:;' class='hidden-phone'>{content}</a>";
        tempHtml += "</li>";

        // 获取审批流程
        var needApproval = data.applNeedRc == "1" ? data.applNeedRc : data.applNeedRm == "1" ? data.applNeedRm : data.applNeedMt;
        data.applNeedAp = needApproval;

        // 客户发起或经办阶段的场合
        if (currentStep == "0" || currentStep == "1") {

            // 有审批流程的场合
            if (needApproval == "1") {
                $wizardSteps.find("li:last").tooltip("destroy").attr("data-original-title", "进入审批").tooltip().find("a").text("进入审批");
            }

            // 有执行流程的场合
            if (data.applNeedEx == "1") {
                if (needApproval == "1") {
                    var stepIndex = parseInt($wizardSteps.find("li:last span").text()) + 1;
                    $(tempHtml.replace(/{step}/g, "5").replace(/{tooltip}/g, "执行").replace(/{index}/g, stepIndex).replace(/{content}/g, "执行")).insertAfter($wizardSteps.find("li:last")).tooltip();
                } else {
                    $wizardSteps.find("li:last").tooltip("destroy").attr("data-original-title", "执行").tooltip().find("a").text("执行");
                }
            }

        // 审批阶段（业务复核、风控审核或领导审批）的场合
        } else {

            // 获取相关参数
            var stepsArray = null;
            var stepHtml = null;
            var stepIndex = 2;
            var stepDef = null;

            if (currentStep == "5") {
                stepsArray = [
                              { stepName: "applNeedAp", stepCode: "", stepToolTip: "审批", stepContent: "审批"},
                              { stepName: "applNeedEx", stepCode: "5", stepToolTip: "执行", stepContent: "执行"}
                       ];
                if (needApproval != "1") {
                    stepsArray.pop();
                }
            } else {
                stepsArray = [
                              { stepName: "applNeedRc", stepCode: "2", stepToolTip: "对业务进行业务复核", stepContent: "业务复核"},
                              { stepName: "applNeedRm", stepCode: "3", stepToolTip: "对业务进行风控审查", stepContent: "风控审查"},
                              { stepName: "applNeedMt", stepCode: "4", stepToolTip: "对业务进行领导审批", stepContent: "领导审批"}
                       ];
                if (data.applNeedEx == "1") {
                    stepsArray.push({ stepName: "applNeedEx", stepCode: "5", stepToolTip: "执行", stepContent: "执行"});
                }
            }

            for (var i = 0; i < stepsArray.length; i++) {
                stepDef = stepsArray[i];
                if (data[stepDef.stepName] == "1") {
                    stepHtml = tempHtml.replace(/{step}/g, stepDef.stepCode).replace(/{tooltip}/g, stepDef.stepToolTip).replace(/{index}/g, stepIndex++).replace(/{content}/g, stepDef.stepContent);
                    $wizardSteps.find("li:last").after(stepHtml);
                }
            }
            $wizardSteps.find("li:not(:first)").tooltip();
            $wizardSteps.find("li[data-step='" + currentStep + "']").removeClass("inactive").addClass("active");
        }
    }

    // 函数：处理Ajax异常
    function handleAjaxError(data, status, errorThrow) {
        var defaultStatus = {
                statusType : "fail",
                messages: ["远程通信失败。"]
        };
        if (data == null || data.status == null) {
            showMessage(defaultStatus);
            return;
        }

        var statusDescribe;
        if (data.status == "500" && data.responseText != null && data.responseText.indexOf("<html>") == -1) {
            statusDescribe = data.responseText;
        } else {
            statusDescribe = dayspring_local[data.status];
        }
        if (statusDescribe == null) {
            showMessage(defaultStatus);
            return;
        }
        showMessage({ statusType: "fail", messages: [statusDescribe] });
        if (window.console && window.console.error && data.responseText && data.responseText.lastIndexOf("<pre>") != -1) console.error(data.responseText.substring(data.responseText.lastIndexOf("<pre>") + 5, data.responseText.lastIndexOf("</pre>"))); // 临时处理，以便测试人员能够查看服务端故障，正式发布时需清楚。
    }

    // 函数：序列化对象转JSON（不支持创建子类对象）
     function serializeArray2obj(serializedParams) {

         var obj = {};
            $.each(serializedParams, function() {
                if ((this.value || "") == "") {
                    return; // 避免服务器端单项目验证（Pattern）无法验证通过
                }
                if (obj[this.name] !== undefined) {
                    if (!obj[this.name].push) {
                        obj[this.name] = [obj[this.name]];
                    }
                    obj[this.name].push(this.value);
                } else {
                    obj[this.name] = this.value;
                }
            });
            return obj;
    };

    // 函数：页面跳转
    function getView(url) {
        location.href = url;
    };

    // 函数：页面跳转至入口点（如果有的话）或者指定页面
    function getStartView(url) {
        var $clientHone = $(".client-home");
        if ($clientHone.length > 0) {
            url = $($clientHone[0]).attr("href");
        }
        location.href = url;
    }

    // 函数：调整画面布局
    function adjustLayout() {
        $("#content .row:first").addClass("m-0");
        $("#content .row:first .col-md-12:first").addClass("p-0");
        $("#content>.breadcrumb").addClass("p-10");
    }

    // 函数：画面初期化
    function init() {

        // 应用程序初期化
        App.init();

        // 登录表单初期化（如果有的话）
        var $login = $(".login");
        if (($login).length > 0) {
            if ($login.hasClass("login-v2")) {
                LoginV2.init();
            }
        }

        // 系统菜单初期化（如果有的话）
        var $menu = $("#header");
        if (($menu).length > 0) {
            // 系统菜单初期化
            initMenu();

            // 侧边栏初期化
            iniSideBar();
            $(window).resize(iniSideBar);

            // 画面布局微调
            adjustLayout();

            // 处理搜索框
            if ($(".srh-nav").length > 0) {
                handleAutoComplete();
            }

            // 处理通知
            if ($(".note-nav").length > 0) {
                handleAllNotifications(true);
                setInterval(handleAllNotifications, 300000); // 每隔5分钟检查一次通知信息
            }
        }
    };

    // 函数：系统菜单初期化
    function initMenu() {
        var $sideBar = $("#sidebar");
        var $topMenu = $("#header");
        var $breadcrumb = $(".breadcrumb li");

        if ($breadcrumb.length < 1) {
            return;
        }

        var $navigator;
        var navContent;
        for (var index = 0; index < ($breadcrumb.length > 2 ? 2 : $breadcrumb.length); index++) {
            $navigator = $($breadcrumb[index]);
            navContent = $.trim($navigator.find("a").length > 0 ? $navigator.find("a").text() : $navigator.text());
            $sideBar.find("a").each(function() {
                if ($.trim($(this).text()) == navContent) {
                    $(this).parent().addClass("active");
                }
            });
            $topMenu.find("a").each(function() {
                if ($.trim($(this).text()) == navContent || $.trim($(this).find("span:first-child").text()) == navContent) {
                    $(this).parent().addClass("active");
                }
            });
        }
    };

    function iniSideBar() {

        var sidebarClass = 'page-sidebar-minified';
        var targetContainer = '#page-container';

        if (document.body.offsetWidth <= 767) {
            if ($(targetContainer).hasClass(sidebarClass)) {
                return;
            }
            $(targetContainer).addClass(sidebarClass);
            if ($(targetContainer).hasClass('page-sidebar-fixed')) {
                $('#sidebar [data-scrollbar="true"]').slimScroll({destroy: true});
                $('#sidebar [data-scrollbar="true"]').removeAttr('style');
            }
            $('#sidebar [data-scrollbar=true]').trigger('mouseover'); // firefox bugfix
        } else {
            if (!$(targetContainer).hasClass(sidebarClass)) {
                return;
            }
            $(targetContainer).removeClass(sidebarClass);
            if ($(targetContainer).hasClass('page-sidebar-fixed')) {
                generateSlimScroll($('#sidebar [data-scrollbar="true"]'));
            }
        }
    }

    /*// 函数：处理提示
    function handleNotifications(sSelector, iAmount, aoData, sUrl) {
        if (sSelector == null) {
            return;
        }
        var context = getContextPath();
        var notification = $(sSelector);
        notification.find("li").remove();
        if (iAmount == null || isNaN(iAmount) || iAmount < 1
                || aoData == null || !$.isArray(aoData) || aoData.length < 1) {
            notification.hide();
        } else {
            notification.find("span").text(iAmount);
            var tempHtml = "<li class='media'><a href='javascript:;'>{icon}<div class='media-body'><h6 class='media-heading' title='{title}'>{title}</h6><p title='{content}'>{content}</p><div class='text-muted' title='{time}'>{time}</div></div></a></li>";
            var ntfContent = null;
            var ntfIcon = null;
            var ntfTitle = null;
            var ntfTime = null;
            var ntfList = notification.find("ul");
            for (var i = 0; i < aoData.length; i++) {
                if ("AF000001" == aoData[i].flowId) {
                    ntfIcon = "<div class='pull-left media-object bg-blue'><i class='fa fa-clipboard'></i></div>";
                    ntfTitle = "尽职调查";
                } else if ("AF000002" == aoData[i].flowId) {
                    ntfIcon = "<div class='pull-left media-object bg-blue'><i class='fa fa-refresh'></i></div>";
                    ntfTitle = "变更授信";
                } else if ("AF000003" == aoData[i].flowId) {
                    ntfIcon = "<div class='pull-left media-object bg-blue'><i class='fa fa-pencil-square-o'></i></div>";
                    ntfTitle = "签订保理合同";
                } else if ("AF000004" == aoData[i].flowId) {
                    ntfIcon = "<div class='pull-left media-object bg-blue'><i class='fa fa-exchange'></i></div>";
                    ntfTitle = "应收账款转让";
                } else if ("AF000005" == aoData[i].flowId) {
                    ntfIcon = "<div class='pull-left media-object bg-blue'><i class='fa fa-share'></i></div>";
                    ntfTitle = "放款";
                } else if ("AF000006" == aoData[i].flowId) {
                    ntfIcon = "<div class='pull-left media-object bg-orange'><i class='fa fa-reply-all'></i></div>";
                    ntfTitle = "回款";
                } else if ("AF000007" == aoData[i].flowId) {
                    ntfIcon = "<div class='pull-left media-object bg-blue'><i class='fa fa-wrench'></i></div>";
                    ntfTitle = "异常处理";
                } else {
                    ntfIcon = "<div class='pull-left media-object bg-grey'><i class='fa fa-cog'></i></div>";
                    ntfTitle = "其他业务";
                }
                ntfTime = aoData[i].updateTime;
                ntfTime = ntfTime == null ? "" : ntfTime.substring(0, 16); // 隐藏秒
                ntfContent = tempHtml.replace(/{icon}/g, ntfIcon).replace(/{title}/g, ntfTitle).replace(/{content}/g, aoData[i].content || "").replace(/{time}/g, ntfTime);
                ntfList.append(ntfContent);
            }
            if (sUrl) {
                ntfList.append("<li class='dropdown-footer text-center'><a href='" + context + sUrl + "'>查看更多 <i class='fa fa-arrow-circle-o-right'></i></a></li>");
            }
            notification.show();
        }
    }*/
    
    // 函数：处理提示
    function handleNotifications(sSelector, iAmount) {
        if (sSelector == null) {
            return;
        }
        var notification = $(sSelector);
        if (iAmount == null || isNaN(iAmount) || iAmount < 1) {
            notification.hide();
        } else {
            notification.text(iAmount);
            notification.show();
        }
    }

    // 函数：提示新任务
    function notifyNewTask(updateDatetime) {
        if (updateDatetime == null || typeof(updateDatetime) !== "string") {
            return;
        }
        var context = getContextPath();
        var oldDateTime;
        var key = "updateDatetime";

        // 优先使用HTML5的localStorage
        if (window.localStorage) {
            oldDateTime = localStorage.getItem(key);
            localStorage.setItem(key, updateDatetime);

        // localStorage不可用的场合，尝试使用cookie
        } else if (navigator.cookieEnabled && $.cookie != null) {
            oldDateTime = $.cookie(key);
            $.cookie(key, updateDatetime);
            if ($.cookie(key) == null || $.cookie(key) == "") {
                return; // 判断是否已将数据写入cookie。（仅判断navigator.cookieEnabled无法确保cookie可用）
            }

        // localStorage和cookie均不可用的场合，什么都不做
        } else {
            return;
        }
        if (updateDatetime > oldDateTime) {
            notifyMessage({ statusType: "info", messages: ["您有新的任务，请点击<a href='" + context + "/task'>我的任务簿</a>查看。"]}, false);
        }
    }

    // 函数：处理所有提示（任务、回款、逾期）
    function handleAllNotifications(clearly) {

       // 取得ContextPath
       var context = getContextPath();

       // 异步数据取得
       var ajaxOption = {
               type: "get",
               url: context + "/rest/notification.json",
               contentType: "application/json",
               dataType: "json",
               success: function(data, status) {
                   if (data) {
//                       handleNotifications(".notification-task", data.taskAmount, data.taskNotifications, "/task");
//                       handleNotifications(".notification-payback", data.paybackAmount, data.paybackNotifications, "/notification/payback");
                       handleNotifications(".notification-task", data.taskAmount);
                       handleNotifications(".notification-payback", data.paybackAmount);
                       // 需要明确提醒的场合
                       if (true == clearly) {
                           if (data.taskNotifications != null && data.taskNotifications.length > 0) {
                               notifyNewTask(data.taskNotifications[0].updateTime);
                           }
                       }
                   } else {
                       handleNotifications(".notification-task");
                       handleNotifications(".notification-payback");
                   }
               }
        };
        $.ajax(ajaxOption);
    }

    // 函数：对需要处理WarningDialog的元素重绑定事件
    // 注意：jQuery1.9及以上版本不支持此函数
    function rebindEvent4WarningDialog(element) {
        if (element == null) {
            return;
        }
        var clickEvents = null;
        try {
            clickEvents = $._data(element, "events")["click"];
        } catch (e) {
            clickEvents = null;
            if (window.console && window.console.warn) {
                window.console.warn("To be warnabled, at least one click event must be registered on the element.", $(element));
            }
        }

        if (clickEvents == null || clickEvents.length < 1) {
            return;
        }
        var clickHandlers = [];
        for (var i = 0; i < clickEvents.length; i++) {
            clickHandlers.push(clickEvents[i].handler);
        }
        var message = $(element).attr("data-warnable-message");
        var buttons = $(element).attr("data-warnable-buttons");
        $(element).unbind("click").click( function() {
            showWarningDialog(message, buttons, clickHandlers, element);
        }).addClass("warnable-standby");
    }

    // 函数：处理WarningDialog
    // 注意：jQuery1.9及以上版本不支持此函数
    function handleWarningDialog(element) {
        var $range = null;
        var $body = $("body");
        if (element === undefined) {
            $range = $body;
        } else {
            $range = $(element);
        }
        $range.find(".warnable:not(.warnable-standby)").each(function() {
            rebindEvent4WarningDialog(this);
        });
        // 未设置范围，或者范围为body，并且画面启用DataTables插件的场合，
        // 监听DataTables的重绘事件，以避免部分元素未绑定WarningDialog事件处理函数
        if ($.fn.dataTable != null && $range[0] === $body[0]) {
            $body.off("draw.dt", "table").on("draw.dt", "table", function() {
                $(this).find(".warnable:not(.warnable-standby)").each(function() {
                    rebindEvent4WarningDialog(this);
                });
            });
        }
    }

    // 函数：查看任务状态消息并显示
    function handleTaskStatus(oData) {
        if (oData != null && oData.status != null) {
            notifyMessage(oData.status, false);
        }
    }

    // 函数：处理AutoComplete
    function handleAutoComplete() {

        // 妥当性验证
        if ($.ui == null) {
            return false;
        }

        // 域名取得
        var contextPath = getContextPath();

        // 自动完成组建取得
        var $autoComplete = $(".navbar-form input");
        $autoComplete.autocomplete({
            appendTo: $(".navbar-form .autocomplete-container"),
            source: function( request, response ) {
            $.ajax({
              url: contextPath + "/rest/autocompletesearch/search.json",
              dataType: "json",
              type:"post",
              data: {
                  q: $autoComplete.val()
              },
              success: function( data ) {
                  response(data);
              }
            });
         },
         minLength: 3,
         select: function( event, ui ) {
             getView(contextPath + "/autocompletesearch?param=" + ui.item.id);
         }
      });
    }

    // 函数：获取QueryString
    function getQueryString(queryString, key) {

        if (!queryString || queryString == "") {
            queryString = new String(window.location.search);
        }
        if (queryString.indexOf("?") == 0) {
            queryString = queryString.slice(1); //remove "?"
        }

        var pairs = queryString.split("&");
        var result = {};
        pairs.forEach(function(pair) {
            pair = pair.split("=");
            result[pair[0]] = decodeURIComponent(pair[1] || "");
        });

        if (key) {
            return result[key];
        } else {
            return result;
        }
   }

    // 函数：获取ContextPath
    function getContextPath() {
        var sPathName = document.location.pathname;
        var iIndex = sPathName.substr(1).indexOf("/");
        var sResult = sPathName.substr(0, iIndex+1);
        return sResult;
    }

    // 函数：生成滚动条
    function generateSlimScroll(element) {
        var dataHeight = $(element).attr('data-height');
        dataHeight = (!dataHeight) ? $(element).height() : dataHeight;
        $(element).slimScroll({height: dataHeight, alwaysVisible: true});
    }

    // 函数：获取该用户所设的所有审查意见的AJAX
    function getCheckOpinionAjax(){
    	// 域名取得
        var contextPath = getContextPath();
        
    	var oAjaxOption = {
                type: "get",
                url: contextPath + "/rest/user/opinion/getAll.json",
                contentType: "application/json",
                dataType: "json",
                success: function(oData, oStatus) {
                	var aOpinion = oData.opinion;
//                	//清空select的option选项
//                	jQuery("#opinionSelect").empty();
                	//给select的option赋值
                	for(var i=0;i<aOpinion.length;i++){
                		jQuery("#opinionSelect").append("<option value="+ aOpinion[i].phrase+">"+aOpinion[i].phrase+"</option>"); 
                	}
                },
                error: function(oData, oStatus, eErrorThrow) {
                    dayspring.handleAjaxError(oData, oStatus, eErrorThrow);
                }
        };
    	return oAjaxOption;
    }
    
    
    namespace.resetParsley = resetParsley;
    namespace.getFileInputOption = getFileInputOption;
    namespace.getDataTableOption = getDataTableOption;
    namespace.getWizardOption = getWizardOption;
    namespace.getSelect2Option = getSelect2Option;
    namespace.getDatePickerOption = getDatePickerOption;
    namespace.getBlockOption = getBlockOption;
    namespace.getDialogOption = getDialogOption;
    namespace.getIntlTelInputOption = getIntlTelInputOption;
    namespace.getEChartsTheme = getEChartsTheme;
    namespace.getJQueryVersion = getJQueryVersion;

    namespace.isMSIE = isMSIE;

    namespace.showMessageAt = showMessageAt;
    namespace.showMessage = showMessage;
    namespace.handleWarningDialog = handleWarningDialog;
    namespace.handleWizardSteps = handleWizardSteps;
    namespace.handleAjaxError = handleAjaxError;
    namespace.handleTaskStatus = handleTaskStatus;
    namespace.serializeArray2obj = serializeArray2obj;
    namespace.getView = getView;
    namespace.getStartView = getStartView;
    namespace.init = init;
    namespace.generateSlimScroll = generateSlimScroll;
    namespace.getQueryString = getQueryString;
    namespace.getContextPath = getContextPath;
    
    namespace.getCheckOpinionAjax = getCheckOpinionAjax;

})(dayspring);

// 扩展jQuery函数
$.fn.form2object = function() {
    var serializedParams;
    if (this.is("form")) {
        serializedParams = this.serializeArray();
    } else {
        serializedParams = this.find(":input").serializeArray();
    }
    return dayspring.serializeArray2obj(serializedParams);
}
$.fn.form2json = function() {
    var serializedParams = this.serializeArray();
    var obj = dayspring.serializeArray2obj(serializedParams);
    return JSON.stringify(obj);
};
$.fn.container2json = function() {
    var serializedParams = this.find(":input").serializeArray();
    var obj = dayspring.serializeArray2obj(serializedParams);
    return JSON.stringify(obj);
}
$.fn.table2json = function(options) { // 将table内的input（必有有name属性，且非disalbed）和指定属性（通过extraAttributes设定）转换为json字符串 *注意，只有具有id属性的table才能被转换
    if (!this.is("table") && this.find("table").lenght < 1) {
        return "{}";
    }

    var defaults = {
            extraDatas: null, // object || function TODO 暂未实装，用于自定义的其他数据（如表单的部分数据或表单以外的数据）。如希望涵盖表单内其他所有项目，可通过设置includeForm为true实现。
            extraAttributes : null, // array<string> TODO 暂未实装，用于将表格中输入项以外的部分属性也作为数据转换为json。
            includeForm: false // 是否连同表单的其他输入项一起构建成json
    };
    options = $.extend({}, defaults, options);

    function build(table) {
        var rowDatas = [];
        $(table).find("tr").each(function() {
            var serializedParams = $(this).find(":input").serializeArray();
            if (serializedParams == null || serializedParams.length < 1) {
                return;
            }
            var rowData = dayspring.serializeArray2obj(serializedParams);
            rowDatas.push(rowData);
        });
        return rowDatas;
    }

    var output = {};
    var tableName = null;
    if (this.is("table")) {
        tableName = this.attr("id");
        if (tableName != null && tableName != "") {
            output[tableName] = build(this[0]);
        }
    } else {
        this.find("table").each(function() {
            tableName = this.attr("id");
            if (tableName != null && tableName != "") {
                output[tableName] = build(this[0]);
            }
        });
    }
    if (options.includeForm) {
        var formData = $(":not(form table :input):input").serializeArray(); // 表格以外的表单数据
        formData = dayspring.serializeArray2obj(formData);
        $.extend(output, formData);
    }
    return JSON.stringify(output);
}
$.fn.content = function(value) {
    var $el = $(this);
    return value === undefined ? $el.text() : $el.text(value === null ? "" : value);
}
$.fn.clearForm = function() {
    this.find("input").not(":radio").not(":checkbox").val("");
    this.find(":checked").prop("checked", false);
    this.find("textarea, select").val("");
    return this;
}
// 画面DOM构建完毕后初期化页面基本功能
$(function () {
    dayspring.init();
});