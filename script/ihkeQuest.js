//2017 8月新增問卷------開始------
function NewFile(msg) {

    //var alt = '本署於106年*月*日至106年*月*日委託元培醫事大學辦理健康存摺使用問卷調查，歡迎填寫問卷。'
    var param = { 'para1': msg };
    OpenNewWeb("http://120.106.193.51/",
      "width=200,height=200,left=100,top=100,resizable=yes,scrollbars=yes",
      "mQuest", param);
}
//https://goo.gl/forms/0HYngJw3HTONwQmG2

function OpenNewWeb(url, windowoption, name, params) {

    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", url);
    form.setAttribute("target", name);

    for (var i in params) {
        if (params.hasOwnProperty(i)) {
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = i;
            input.value = params[i];

            form.appendChild(input);
        }
    }
    document.body.appendChild(form);
    submitToPopup(form, windowoption);
    document.body.removeChild(form);

    function submitToPopup(f, windowoption) {
        f.submit();
    };
}
//2017 8月新增問卷------結束------