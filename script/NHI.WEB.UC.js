
document.onkeydown = function () {
    //HTML Node = "INPUT"，且類型不為按鈕時，把Enter動作轉換成Tab動作
    if (event.keyCode == 13 && event.srcElement.nodeName == "INPUT" && (event.srcElement.type != "submit" && event.srcElement.type != "button"))
        event.keyCode = 9;
    //HTML Node = "INPUT"，且ReadOnly時，Backspace不動作
    if (event.keyCode == 8 && event.srcElement.nodeName == "INPUT" && event.srcElement.readOnly == true)
        return false;
}

jQuery.fn.setfocus = function () {
    return this.each(function () {
        var dom = this;
        setTimeout(function () {
            try { dom.focus(); } catch (e) { }
        }, 0);
    });
};

$(function () {
    //解決updatepanel postback問題
    Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(bindTextFieldEvents2);
});

function bindTextFieldEvents(formObj) {
    //舊的函數，已無功能。
}

//使用新名稱，避免舊程式重複執行。
function bindTextFieldEvents2(formObj) {
    $(document).find('input[type="text"]').each(function () { setEvents(this); });
    $(document).find('textarea').each(function () { setEvents(this); });
}

//設定並檢查欄位是否符合dataType
function setEvents(srcObj) {

    //如果沒設定dataType，就離開
    if ($(srcObj).attr('dataType') == undefined) return;

    //取得onblur，並轉為函數
    var domonblur = new Function($(srcObj).attr('onblur'));

    //產生blur要檢查的函數
    var fn = function (e) {
        RTrim(this);
        var $this = $(this);
        if ($this.val().length != 0) {//沒輸入，不檢查
            if (!setMaxLength(this, $this.attr('dataType'))) {//不符合規則
                e.stopImmediatePropagation(); //中斷所有的事件
                return false;
            }
        }
        domonblur.apply(this); //執行原本的onblur
    }
    srcObj.onblur = fn

    //先檢查一次
    setMaxLength(srcObj, $(srcObj).attr('dataType'));
}

//請參考 Intra HMDI0101S04
//       Internet IHKE0000S98
function ajaxPost(funame, paras, href) {
    if (typeof href === 'undefined' || href == '') { href = location.href; }
    var rtn = '';
    $.ajax({
        type: 'POST', async: false, dataType: 'json', data: paras,
        contentType: 'application/json; charset=utf-8',
        url: href + '/' + funame,
        success: function (req) {
            rtn = req.d;
            if (rtn == 'undefined' || rtn == null) rtn = '';
        },
        error: function (textStatus, errorThrown) {
            $.post('/UserControl/UCBack.asmx/ErrLog', { errMsg: textStatus.responseText.toString() });
            alert('查詢失敗!');
        }
    });
    return rtn;
}

//檢查輸入民國年月日格式
function FDateOnblur(obj) {
    if (obj.value != "") {
        if (CheckDate(obj.value) < 0) {
            alert(obj.title + "格式不正確，請重新輸入");
            $(obj).setfocus();
            return false;
        } else {
            obj.value = FormatDate(StringToDate(obj.value));
            return true;
        }
    }
}
//檢查輸入民國年月格式
function FMonthOnblur(obj) {
    if (obj.value != "") {
        if (!CheckDateYM(obj)) {
            alert(obj.title + "格式不正確，請重新輸入");
            $(obj).setfocus();
            return false;
        } return true;
    }
}
//檢查是否大於系統日期
function CheckSysDate(obj, dat) {
    if (obj.value > dat) {
        alert(obj.title + "不可大於系統日期");
        $(obj).setfocus();
        return false;
    } return true;
}
//檢查是否大於系統年月
function CheckSysMonth(obj, dat) {
    if (obj.value > dat) {
        alert(obj.title + "不可大於系統年月");
        $(obj).setfocus();
        return false;
    } return true;
}
//取得醫事機構名稱/簡稱
function GetHospName(hosp, type, name, hid) {
    if (hosp == null || hosp == undefined) return false;
    if (hosp.value == "") {
        hid.value = '';
        name.innerHTML = '';
    } else {
        var data = ajaxPost('GetHospName', "{'HospId':'" + hosp.value + "','Type':'" + type.value + "'}", '/UserControl/UCBack.asmx');
        var json = $.parseJSON(data);
        var tol = (hosp.title == '') ? '醫事機構' : hosp.title;
        if (json.rtn == "-1") {
            alert('查無此「' + tol + '」代號資料');
            $('#' + hosp.id).setfocus();
        } else if (json.rtn == "1") {
            alert('無此「' + tol + '」之權限');
            $('#' + hosp.id).setfocus();
        }
        hid.value = json.HospName;
        name.innerHTML = json.HospName;
    }
}
//取得醫事機構名稱/簡稱
function GetHospName2(hosp, type, name, hid) {
    if (hosp == null || hosp == undefined) return false;
    if (hosp.value == "") {
        hid.value = '';
        (name.value != undefined) ? name.value = '' : name.innerHTML = '';
    } else {
        var data = ajaxPost('GetHospName2', "{'HospId':'" + hosp.value + "','Type':'" + type.value + "'}", '/UserControl/UCBack.asmx');
        var json = $.parseJSON(data);
        var tol = (hosp.title == '') ? '醫事機構' : hosp.title;
        if (json.rtn == "-1") {
            alert('查無此「' + tol + '」代號資料');
            $('#' + hosp.id).setfocus();
        }
        hid.value = json.HospName;
        (name.value != undefined) ? name.value = json.HospName : name.innerHTML = json.HospName;
    }
}
//取得醫事機構名稱/簡稱
function GetHospName3(hosp, type, name, hid) {
    if (hosp == null || hosp == undefined) return false;
    if (hosp.value == "") {
        hid.value = '';
        name.value = '';
    } else {
        var data = ajaxPost('GetHospName', "{'HospId':'" + hosp.value + "','Type':'" + type.value + "'}", '/UserControl/UCBack.asmx');
        var json = $.parseJSON(data);
        var tol = (hosp.title == '') ? '醫事機構' : hosp.title;
        if (json.rtn == "-1") {
            alert('查無此「' + tol + '」代號資料');
            $('#' + hosp.id).setfocus();
        } else if (json.rtn == "1") {
            alert('無此「' + tol + '」之權限');
            $('#' + hosp.id).setfocus();
        }
        hid.value = json.HospName;
        name.value = json.HospName;
    }
}
//檢查代碼是否存在
function CheckCode(Code, hid) {
    if (Code == null || Code == undefined) return false;
    if (Code.value != "") {
        var data = ajaxPost('CheckCode', "{'Code':'" + Code.value + "','Data':'" + hid.value + "'}", '/UserControl/UCBack.asmx');
        if (data == -1) {
            alert('查無「' + Code.title + '」資料');
            $('#' + Code.id).setfocus();
        }
    }
}

function AjaxData(data) {
    var commands = data.split('|');
    for (var key in commands) {
        var info = commands[key].split(';');

        switch (info[0]) {
            case "alert":
                alert(info[1]);
                break;
            case "value":
                document.getElementById(info[1]).value = info[2];
                break;
            case "select":
                document.getElementById(info[1]).select();
                break;
            case "focus":
                $("#" + info[1]).setfocus();
                break;
            case "option":
                $("#" + info[1]).append($("<option></option>").attr("value", info[2]).text(info[3]));
                break;
            case "OnCheck":
                //document.getElementById(info[1]).checked = true;
                $get(info[1]).checked = true;
                break;
            case "OffCheck":
                //document.getElementById(info[1]).checked = false;
                $get(info[1]).checked = false;
                break;
            case "OnDisabled":
                document.getElementById(info[1]).disabled = true;
                break;
            case "OffDisabled":
                document.getElementById(info[1]).disabled = false;
                break;
            case "OnReadOnly":
                document.getElementById(info[1]).readOnly = true;
                break;
            case "OffReadOnly":
                document.getElementById(info[1]).readOnly = false;
                break;
            case "display":
                document.getElementById(info[1]).display = info[2];
                break;
            case "ButtionStatus":
                SwitchButton(info[1]);
                break;
        }
    }
}

function ICD(type, code) {
    type = type + '';
    var rtn;
    if (type == '9') rtn = ajaxPost('ICD9', "{'code':'" + code + "'}", '/UserControl/UCBack.asmx');
    else if (type == '10') rtn = ajaxPost('ICD10', "{'code':'" + code + "'}", '/UserControl/UCBack.asmx');
    return $.parseJSON(rtn);
}

function fancyboxopen(options) {
    // *** sample href *** 
    //function callClick() {
    //    if (Dat.reason == "0") {
    //        return;
    //    } else {
    //        $("#<%=btnReload.ClientID%>").click();
    //    }
    //}
    //fancyboxopen({href: '/ihke0002/UserControl/UC0002.aspx', title:'我的生理量測值', width: 570, afterClose: callClick });

    // *** sample content *** 
    //fancyboxopen({content: $("#<%=PanUC0010.ClientID%>").show(), title:'歷史量測紀錄', width: 900 });
   
//    ajaxPost('/IHKE0002/UserControl/UCAjax.aspx');
   var bo =  ajaxPost('chkLogin', "{}", '/IHKE0002/UserControl/UCAjax.aspx');
     
   if (bo == false) {
       location.href = '/IHKE0002/IHKE0002S01.aspx';
       return false;
   }
    options = options || {};
    options.width = parseInt(options.width, 10) || 0;
    options.height = parseInt(options.height, 10) || 0;
    options.topRatio = parseFloat(options.topRatio) || 0.5;
    options.title = options.title || '';
    $.fancybox.open({
        type: 'iframe',
        parent: "form:first", // jQuery selector
        title: options.title,
        href: options.href,
        content: options.content,
        padding: [60, 10, 10, 10],
        margin: 10,
        closeBtn: true,
        autoResize: true,
        width: options.width,
        height: options.height,
        topRatio: options.topRatio, 
        iframe: {
            scrolling: 'auto',
            preload: true
        },
        helpers: {
            overlay: {
                closeClick: false,
                showEarly: false,
                css: {
                    'background': 'transparent',
                    'filter': 'progid:DXImageTransform.Microsoft.gradient(startColorstr=#E5808080,endColorstr=#E5808080)',
                    'zoom': '1',
                    'background': 'rgba(128, 128, 128, 0.9)'
                }
            }
        },
        afterShow: function () {
            if (options.afterShow) {
                options.afterShow();
            }
        },
        onUpdate: function () {
            $("iframe.fancybox-iframe");
        },
        afterClose: function () {
            if (options.afterClose) {
                options.afterClose();
            }
        }
    });
}