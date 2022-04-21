/* 20130125 justin modify setMaxLength array index and remove alert*/
/* 20130125 justin modify CheckNumber*/

//----------------------------------------------------------------------
//   功能函數: toLocalDate
//   說明    : 西元日期轉換為民國日期
//   使用方式: CheckEmail(value)
//   輸入    : string
//   輸出    : return false/true
function toLocalDate(source, clientside_arguments) {
	var DateValue = source._textbox.get_Value();
	var year = parseInt(DateValue.substr(0, 4)) - 1911;
	source._textbox.set_Value(year + DateValue.substr(4, 6));
}

//----------------------------------------------------------------------  
//   功能函數: CheckEmail(value)
//   說明    : email檢查格式
//   使用方式: CheckEmail(value)
//   輸入    : string
//   輸出    : return false/true
function CheckEmail(str) {
	var re = new RegExp("^[a-zA-Z0-9\-\.\_]+\@[a-zA-Z0-9\-\.]+(\\.)+([a-zA-Z]{2,4})$", "gi");
	if (str == '' || !re.test(str)) {
		return false;
	}
	else {
		return true;
	}
}

//----------------------------------------------------------------------  
//   功能函數: CheckPassword(value)
//   說明    : 密碼檢查格式,{6,15}=>密碼限制6-15碼
//   使用方式: CheckPassword(value)
//   輸入    : string
//   輸出    : return false/true
function CheckPassword(str) {
	var re = new RegExp("^([a-zA-Z0-9]{6,15})$", "gi");
	if (str != '' && !re.test(str)) {
		return false;
	}
	return true;
}

//---------------------------------------------------------------------- 
//   功能函數: CheckId(value)
//   說明    : 身分證檢查格式(包含外國人統一證號)
//   使用方式: check_id(value)
//   輸入    : string
//   輸出    : return false/true
function CheckId(strValue) {
	var strFst, strInt;
	var strFstWd, strIntAll;
	var intANS = 0, i = 0;
	var intFst1, intFst2, intNum1, intNum2, intNum3;
	var blnRtn = true;

	//檢查身份證格式是否符合 
	var re;
	re = /^[A-Za-z]{1}[A-Da-dX-Yx-y1-28-9]{1}\d{8}[A-Za-z0-9]{0,1}$/gi;

	if (!re.test(strValue)) {
		blnRtn = false;
	} else {
		strFst = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
		strInt = '19876543211';                            //特定數                
		strFstWd = strValue.toUpperCase();    //字母轉成大寫

		intFst1 = parseInt(strFst.indexOf(strFstWd.substr(0, 1)), 10) + 10;    // 取得第一個字母的對應代碼
		if (strFstWd.substr(1, 1) != '1' && strFstWd.substr(1, 1) != '2' &&
            strFstWd.substr(1, 1) != '8' && strFstWd.substr(1, 1) != '9') {
			intFst2 = parseInt(strFst.indexOf(strFstWd.substr(1, 1)), 10) + 10;    // 取得第二個字母的對應代碼
		} else {
			intFst2 = parseInt(strFstWd.substr(1, 1)) + 10;
		}

		if (intFst1 > 29) {
			intNum1 = 3;
		} else if (intFst1 > 19) {
			intNum1 = 2;
		} else {
			intNum1 = 1;
		}

		intNum2 = intFst1 % 10;
		intNum3 = intFst2 % 10;
		strIntAll = intNum1.toString() + intNum2.toString() + intNum3.toString() + strValue.substring(2, 11);   // 字串組合 

		for (i = 0; i <= 10; i++) {
			intANS += (parseInt(strInt.substr(i, 1), 10) * parseInt(strIntAll.substr(i, 1), 10));
		}
		if (intANS % 10 != 0) {
			blnRtn = false;
		}
	}
	if (!blnRtn) {//身份證號有誤
		return false;
	} else {
		return true;
	}
}

//---------------------------------------------------------------------- 
//   功能函數: check_id(value)
//   說明    : 身分證檢查格式
//   使用方式: check_id(value)
//   輸入    : object
//   輸出    : return false/true
//   備註    : 舊的VPN搬遷過來(2015/01/20)
function check_id(obj) {
	var id = new ids;
	if (obj.length != 10) {
		return false;
	}

	obj = (obj.charAt(0)).toUpperCase() + obj.substring(1, 10);
	var cs = id[obj.charAt(0)];
	for (var i = 1; i < 10; i++) {
		var c = obj.charAt(i);
		cs = cs + c * (9 - i);

		if (c < "0" || c > "9") {
			return false;
		}
	}

	cs = cs + c * 1;

	if ((cs % 10) != 0) {
		return false;
	}
}

//   備註    : 舊的VPN搬遷過來(2015/01/20)
function ids() {
	this.A = 1;
	this.B = 0;
	this.C = 9;
	this.D = 8;
	this.E = 7;
	this.F = 6;
	this.G = 5;
	this.H = 4;
	this.J = 3;
	this.K = 2;
	this.L = 2;
	this.M = 1;
	this.N = 0;
	this.P = 9;
	this.Q = 8;
	this.R = 7;
	this.S = 6;
	this.T = 5;
	this.U = 4;
	this.V = 3;
	this.X = 3;
	this.Y = 2;
	this.W = 1;
	this.Z = 0;
	this.I = 9;
	this.O = 8;
}

//---------------------------------------------------------------------- 
//   功能函數: CheckForeignId(value)
//   說明    : 檢查外國人統一證號 
//   使用方式: CheckForeignId(value)
//   輸入    : string
//   輸出    : return false/true
function CheckForeignId(strValue) {
	return CheckId(strValue);
}

//---------------------------------------------------------------------- 
//   功能函數: CheckBaseID(value)
//   說明    : 檢醫事人員ID 
//   使用方式: CheckBaseID(value)
//   輸入    : string
//   輸出    : return false/true
function CheckBaseID(str) {
	if (str.length != 10) { return false; }

	txtLetter = str.substr(0, 1);
	txtDigit = str.substr(1, 9);

	if (txtLetter > 'Z' || txtLetter < 'A') { return false; }
	else if (isNaN(txtDigit)) { return false; }
	else {
		var j = 0;
		do {
			ch = txtDigit.charAt(j);
			if (ch == '.') { return false; }
			else { j++; }
		} while (j < txtDigit.length)
	}
	return true;
}

//---------------------------------------------------------------------- 
//   功能函數: CheckWord
//   說明    : 特殊字元檢查
//   使用方式: CheckWord(value)
//   輸入    : string
//   輸出    : return false/true
function CheckWord(str) {
	CheckData = false;
	var MyStr = trims(str);
	var MyStrLeg = MyStr.length;

	for (i = 0; i <= MyStrLeg; i++) {
		if (MyStr.charCodeAt(i) > 38 && MyStr.charCodeAt(i) < 48) {
			CheckData = true;
			return true;
		}

		if (MyStr.charCodeAt(i) > 57 && MyStr.charCodeAt(i) < 64) {
			CheckData = true;
			return true;
		}
		if (MyStr.charCodeAt(i) > 122 && MyStr.charCodeAt(i) < 127) {
			CheckData = true;
			return true;
		}

		if (MyStr.charCodeAt(i) == 94 || MyStr.charCodeAt(i) == 96) {
			CheckData = true;
			return true;
		}
	}
	return false;
}

//---------------------------------------------------------------------- 
//   功能函數: CheckWordLength
//   說明    : 字元長度檢查
//   使用方式: CheckWordLength(value, strlen)
//   輸入    : string , 文字期望長度
//   輸出    : return false/true
function CheckWordLength(str, strlen) {
	var chklen = true;
	if (str != "") {
		var iCnt = 0;
		var MyStr = trims(str);
		var MyStrLeg = MyStr.length;

		for (i = 0; i < MyStrLeg; i++) {
			if (MyStr.charCodeAt(i) > 31 && MyStr.charCodeAt(i) < 128) {
				iCnt = iCnt + 1;
			} else {
				iCnt = iCnt + 2;
			};
		};
		if (iCnt > strlen) {
			chklen = false;
			return chklen;
		}
		else {
			chklen = true;
			return chklen;
		}
	}
	else {
		chklen = true;
		return chklen;
	}
}

//----------------------------------------------------------------------
//   功能函數: CheckNum(value)
//   說明    : 數字檢查格式
//   使用方式: CheckNum(value)
//   輸入    : string
//   輸出    : return false/true
function CheckNum(str) {
	val = str;

	if (IsDigit(val) == false && val != '') {
		return false;
	}
	return true;
}

//----------------------------------------------------------------------
//   備註    : 舊的VPN搬遷過來(2015/01/20)
function chkDate(srcObj) {
	if (srcObj.value != "") {
		if (strToDate(srcObj.value) == null) {
			return false;
		} else {
			srcObj.value = dateToStr(strToDate(srcObj.value), "y/M/D");
			return true;
		}
	}
}

//----------------------------------------------------------------------
//   功能函數: CheckDate(value)
//   說明    : 日期檢查格
//   使用方式: CheckDate(string)
//   輸入    : string
//   輸出    : 回傳1-yyy/mm/dd
//             回傳2-yyymmdd
//             回傳-1-非日期格式
//             回傳-2-表不正確之日期
function CheckDate(srcStr) {
	var formalDatePattern, simpliedDatePattern;
	var matchFlag, matchs;
	var vYear, vMonth, vDay;
	var setYear, setMonth, setDay;

	formalDatePattern = /^(\-?\d{1,3})\/(\d{1,2})\/(\d{1,2})$/;
	simpliedDatePattern = /^(\-?\d{2,3})(\d{2})(\d{2})$/;

	if (srcStr == "" || srcStr == null) {
		return 0;
	}

	if (formalDatePattern.exec(srcStr) == null && simpliedDatePattern.exec(srcStr) == null) {
		return -1;
	} else {
		if (formalDatePattern.exec(srcStr) != null) {
			matchFlag = 1;
			matchs = formalDatePattern.exec(srcStr);
		} else {
			matchFlag = 2;
			matchs = simpliedDatePattern.exec(srcStr);
		}
		if (matchs != null) {
			vYear = matchs[1];
			vMonth = matchs[2];
			vDay = matchs[3];
		}

		//is Date exited ?
		if (vYear.indexOf("-") == 0) {
			vYear = parseInt(vYear, 10) + 1912;
		} else {
			vYear = parseInt(vYear, 10) + 1911;
		}
		vMonth = parseInt(vMonth, 10) - 1;
		vDay = parseInt(vDay, 10);
		dummyDate = new Date(vYear, vMonth, vDay);
		setYear = dummyDate.getFullYear();
		//alert(setYear) ;       
		setMonth = dummyDate.getMonth();
		setDay = dummyDate.getDate();
		return (vYear != setYear || vMonth != setMonth || vDay != setDay) ? -2 : matchFlag
	}
}

//----------------------------------------------------------------------
//   功能函數: CheckDate2(value)
//   說明    : 日期檢查格
//   使用方式: CheckDate(string)
//   輸入    : string
//   輸出    : 回傳1-yyy/mm/dd
//             回傳2-yyymmdd
//             回傳-1-非日期格式
//             回傳-2-表不正確之日期
function CheckDate2(srcStr) {
	var formalDatePattern, simpliedDatePattern;
	var matchFlag, matchs;
	var vYear, vMonth, vDay;
	var setYear, setMonth, setDay;

	formalDatePattern = /^(\-?\d{1,3})\/(\d{1,2})$/;
	simpliedDatePattern = /^(\-?\d{2,3})(\d{2})$/;

	if (srcStr == "" || srcStr == null) {
		return 0;
	}
	if (formalDatePattern.exec(srcStr) == null && simpliedDatePattern.exec(srcStr) == null) {
		return -1;
	} else {
		if (formalDatePattern.exec(srcStr) != null) {
			matchFlag = 1;
			matchs = formalDatePattern.exec(srcStr);
		} else {
			matchFlag = 2;
			matchs = simpliedDatePattern.exec(srcStr);
		}
		if (matchs != null) {
			vYear = matchs[1];
			vMonth = matchs[2];
		}

		//is Date exited ?
		if (vYear.indexOf("-") == 0) {
			vYear = parseInt(vYear, 10) + 1912;
		} else {
			vYear = parseInt(vYear, 10) + 1911;
		}
		vMonth = parseInt(vMonth, 10) - 1;

		dummyDate = new Date(vYear, vMonth);
		setYear = dummyDate.getFullYear();
		//alert(setYear) ;       
		setMonth = dummyDate.getMonth();
		return (vYear != setYear || vMonth != setMonth) ? -2 : matchFlag
	}
}

//----------------------------------------------------------------------
//   功能函數: CheckDateYM(object)
//   說明    : 年月檢查並Format格式
//   使用方式: FourYear(object)
//   輸入    : object
//   輸出    : return object

function CheckDateYM(objDate) {
	var SlashPos;
	var strDate, strYear, strMonth, strReturn;
	var yearLength;
	var blFormat = true;

	strDate = objDate.value;
	if (strDate.indexOf("/") == -1) {
		switch (strDate.length) {
			case 4:
				yearLength = 2;
				break;
			case 5:
				yearLength = 3;
				break;
			default:
				blFormat = false;
				break;
		}
		strYear = strDate.substring(0, yearLength);
		strMonth = strDate.substring(yearLength, yearLength + 2);
	}
	else {
		SlashPos = strDate.indexOf("/");
		strYear = strDate.substring(0, SlashPos);
		strMonth = strDate.substring(SlashPos + 1, strDate.length);
		switch (strMonth.length) {
			case 1:
				strMonth = "0" + strMonth;
				break;
			case 2:
				strMonth = strMonth;
				break;
			default:
				blFormat = false;
				break;
		}
	}
	strYear = "000" + strYear;
	strYear = strYear.substring(strYear.length - 3, strYear.length);

	if (!blFormat || isNaN(strYear) || isNaN(strMonth) || !((strMonth >= '01') && (strMonth <= '12'))) {
		return false;
	}
	objDate.value = strYear + "/" + strMonth;
	return true;
}

//----------------------------------------------------------------------
//   功能函數: CheckNotNull(ObjName, ObjCName)
//   說明    : 檢查欄位是否輸入(非空值及空白)
//   使用方式: CheckNotNull(ObjName, ObjCName)
//   輸入    : ObjName表元件
//             ObjCName表元件中文名稱
//   輸出    : true檢查不為空值
//             false檢查為空值
function CheckNotNull(ObjName, ObjCName) {
	if (trims(ObjName.value) == '') {
		alert(ObjCName + "必需輸入");
		//ObjName.focus();
		$(ObjName).setfocus();
		ObjName.select();
		return false;
	}
	return true;
}

//   備註    : 舊的VPN搬遷過來(2015/01/20)
function Check_Not_Null(ObjType, ObjName, ObjCName) {
	if (trims(ObjName.value) == '') {
		alert(ObjCName + "必須輸入");
		//ObjName.focus();
		$(ObjName).setfocus();
		if (ObjType == 'N') ObjName.select();
		return false;
	}

	return true;
}

//   功能函數: CheckEmpty(obj)
//   說明    : 檢查空白
//   使用方式: CheckEmail(obj)
//   輸入    : 物件
//   輸出    : return false/true
function CheckEmpty(obj) {
	if (trims(obj.value) == '') {
		alert(obj.getAttribute('title') + '不可空白！');
		//obj.focus();
		$(obj).setfocus();
		return true;
	}
	return false;
}

//----------------------------------------------------------------------
//   功能函數: IsDigit(value)
//   說明    : 數字檢查
//   使用方式: IsDigit(value)
//   輸入    : string
//   輸出    : True-表0~9數字
//             False-表含其他字元
function IsDigit(Val) {
	var len = Val.length;
	if (len == 0) {
		return false;
	}
	for (var i = 0; i < len; i++) {
		if (Val.charAt(i) >= '0' && Val.charAt(i) <= '9') continue;
		return false;
	}
	return true;
}

//   備註    : 舊的VPN搬遷過來(2015/01/20)
function isEmpty() {
	return (this.rTrim() == "" || this.rTrim() == null);
}

//----------------------------------------------------------------------
//函數名稱：IsEnglish
//目    的：檢查字串中是否含有中文字元
//參數說明：strWord：傳入字串
//傳回值  ：true：不含有中文字元/false：含有中文字元
function IsEnglish(strWord) {
	var intLen = strWord.length;
	var strCompareChar;
	for (var i = 0; i < intLen; i++) {
		strCompareChar = escape(strWord.substr(i, 1));
		if (strCompareChar.substr(0, 2) == '%u') return false;
	}
	return true;
}

//----------------------------------------------------------------------
//函數名稱：CheckStrLength
//目    的：檢查輸入元件之值是否超過MaxLen
//參數說明：objName為傳入物件
//          objCName為物件名稱
//          MaxLen為設定之長度
//傳回值  ：true表物件值的長度不超過MaxLen
//          false表物件值的長度超過MaxLen
function CheckStrLength(ObjName, ObjCName, MaxLen) {
	var LV_Value = trims(ObjName.value);

	if (!isinteger(MaxLen)) {
		alert("Check_Str_Len參數設定錯誤,長度必須輸入整數");
		return false;
	}

	if ((LV_Value != '') && (LV_Value.length > parseInt(MaxLen))) {
		alert(ObjCName + "的長度不得超過" + MaxLen + "個字元");
		//ObjName.focus();
		$(ObjName).setfocus();
		ObjName.select();
		return false;
	}
	return true;
}

//----------------------------------------------------------------------
//函數名稱：CheckIntField
//目    的：檢查輸入元件之值是否介於二數間
//參數說明：objName為傳入物件
//          objCName為物件名稱
//          MinValue為設定最小數值
//          MaxValue為設定最大數值
//傳回值  ：true表物件值為整數且介於MinValue與MaxValue間
//          false表物件值不為整數或不介於MinValue與MaxValue間
function CheckIntField(ObjName, ObjCName, MinValue, MaxValue) {
	var LV_Value = trims(ObjName.value);

	if ((LV_Value != '') && (!isinteger(LV_Value))) {
		alert(ObjCName + "必須輸入整數");
		//ObjName.focus();
		$(ObjName).setfocus();
		ObjName.select();
		ObjName.value = "";
		return false;
	}

	if (trims(MinValue) != '') {
		if ((LV_Value != '') && (parseInt(LV_Value) < parseInt(MinValue))) {
			alert(ObjCName + "必須大於等於" + MinValue);
			//ObjName.focus();
			$(ObjName).setfocus();
			ObjName.select();
			ObjName.value = "";
			return false;
		}
	}

	if (trims(MaxValue) != '') {
		if ((LV_Value != '') && (parseInt(LV_Value) > parseInt(MaxValue))) {
			alert(ObjCName + "必須小於等於" + MaxValue);
			//ObjName.focus();
			$(ObjName).setfocus();
			ObjName.select();
			ObjName.value = "";
			return false;
		}
	}

	return true;
}

//----------------------------------------------------------------------
//函數名稱：CheckNumField
//目    的：檢查輸入元件之值是否超過MaxLen
//參數說明：objName為傳入物件
//          objCName為物件名稱
//          MinValue為設定最小數值
//          MaxValue為設定最大數值
//傳回值  ：true表物件值介於MinValue與MaxValue間
//          false表物件值不介於MinValue與MaxValue間
function CheckNumField(ObjName, ObjCName, MinValue, MaxValue) {
	var LV_Value = trims(ObjName.value);

	if ((LV_Value != '') && (!isnumeric(LV_Value))) {
		alert(ObjCName + "必須輸入數字");
		//ObjName.focus();
		$(ObjName).setfocus();
		ObjName.select();
		ObjName.value = "";
		return false;
	}

	if (trims(MinValue) != '') {
		if ((LV_Value != '') && (parseFloat(LV_Value) < parseFloat(MinValue))) {
			alert(ObjCName + "必須大於等於" + MinValue);
			//ObjName.focus();
			$(ObjName).setfocus();
			ObjName.select();
			ObjName.value = "";
			return false;
		}
	}

	if (trims(MaxValue) != '') {
		if ((LV_Value != '') && (parseFloat(LV_Value) > parseFloat(MaxValue))) {
			alert(ObjCName + "必須小於等於" + MaxValue);
			//ObjName.focus();
			$(ObjName).setfocus();
			ObjName.select();
			ObjName.value = "";
			return false;
		}
	}

	return true;
}

//----------------------------------------------------------------------
//函數名稱：CheckDateField
//目    的：檢查輸入元件之值是否超過MaxLen
//參數說明：ObjName為傳入物件
//          objCName為物件名稱
//          MinValue為設定最小數值
//          MaxValue為設定最大數值
//傳回值  ：true表物件值介於MinValue與MaxValue間
//          false表物件值不介於MinValue與MaxValue間
function CheckDateField(ObjName, ObjCName, MinValue, MaxValue) {
	var LV_Value = trims(ObjName.value);
	if ((trims(ObjName.value) != '') && (!CheckDate(ObjName))) {
		alert(ObjName + "必須輸入正確日期YYYY/MM/DD");
		//ObjName.focus();
		$(ObjName).setfocus();
		ObjName.select();
		ObjName.value = "";
		return false;
	}

	if (trims(MinValue) != '') {
		if ((LV_Value != '') && (datediff('s', LV_Value, MinValue) > 0)) {
			alert(ObjCName + "必須大於等於" + MinValue);
			//ObjName.focus();
			$(ObjName).setfocus();
			ObjName.select();
			ObjName.value = "";
			return false;
		}
	}

	if (trims(MaxValue) != '') {
		if ((LV_Value != '') && (datediff('s', LV_Value, MaxValue) < 0)) {
			alert(ObjCName + "必須小於等於" + MaxValue);
			//ObjName.focus();
			$(ObjName).setfocus();
			ObjName.select();
			ObjName.value = "";
			return false;
		}
	}
	return true;
}

//----------------------------------------------------------------------
//函數名稱：ischecked
//目    的：檢查CheckBox是否有選擇
//傳回值  ：true：OK/false：未選擇
function ischecked(FormObj, CheckBoxObjName) {
	var num = FormObj.elements.length;
	var Ret = false;

	for (var i = 0; i < num; i++) {
		if (FormObj.elements[i].name == CheckBoxObjName) {
			if (FormObj.elements[i].checked) {
				Ret = true;
				break;
			}
		}
	}
	if (!Ret) {
		alert("請至少選擇一項");
	}
	return Ret;
}

//----------------------------------------------------------------------
//函數名稱：ischeckedone
//目    的：檢查CheckBox是否有複選
//傳回值  ：true：OK/false：有複選
function ischeckedone(FormObj, CheckBoxObjName) {
	var num = FormObj.elements.length;
	var Ret = true;
	var checknum = 0;
	for (var i = 0; i < num; i++) {
		if (FormObj.elements[i].name == CheckBoxObjName) {
			if (FormObj.elements[i].checked) {
				checknum++;
			}
		}
	}
	if (checknum != 1) {
		Ret = false;
		alert("請選擇一項");
	}

	return Ret;
}

//----------------------------------------------------------------------
//函數名稱：IsNumeric
//目    的：檢查輸入之值是否為實數
//參數說明：anumber為傳入之值
//傳回值  ：true表值可轉為數字
//          false表值不可轉為數字
function IsNumeric(anumber) {
	var trimvalue = trims(anumber);
	if ((trimvalue == '') || (trimvalue == '.') || (trimvalue == '-')) return false;

	var len = trimvalue.length;

	var char = '';
	var CheckPara;

	char = trimvalue.charAt(0);
	if (char == '.') return false;
	char = trimvalue.charAt(len - 1);

	if (char == '.') return false;

	for (var i = 1; i < len; i++) {
		char = trimvalue.charAt(i);
		if (char == '-') return false;
	}

	for (var i = 0; i < len; i++) {
		char = trimvalue.charAt(i);
		if (char != '.' && char != '-') {
			CheckPara = parseInt(char);

			if (isNaN(CheckPara)) {
				return false;
			}
		}
	}

	return true;
}

//----------------------------------------------------------------------
//函數名稱：IsInteger
//目    的：檢查輸入之值是否為整數(包含正負值)
//參數說明：anumber為傳入之值
//傳回值  ：true表值為整數
//          false表值不為整數
function IsInteger(anumber) {
	var trimvalue = trims(anumber);
	var len = trimvalue.length;
	var start = 0;
	if (len == 1 && anumber == '-') return false;
	char = trimvalue.charAt(0);
	if (char == '-') start = 1;
	else start = 0;

	var char = '';
	var CheckPara;
	for (var i = start; i < len; i++) {
		char = trimvalue.charAt(i);
		if (char != '-') {
			CheckPara = parseInt(char);

			if (isNaN(CheckPara)) {
				return false;
			}
		} else return false;
	}

	return true;
}

//----------------------------------------------------------------------
//函數名稱：IsPositive
//目    的：檢查輸入之值是否為數字
//參數說明：anumber為傳入之值
//傳回值  ：true表值可轉為數字
//          false表值不可轉為數字
function IsPositive(anumber) {
	var trimvalue = trims(anumber);

	var len = trimvalue.length;
	var char = '';
	var CheckPara;
	for (var i = 0; i < len; i++) {
		char = trimvalue.charAt(i);
		CheckPara = parseInt(char);

		if (isNaN(CheckPara)) {
			return false;
		}
	}
	return true;
}

//----------------------------------------------------------------------
//   功能函數: FourYear(value)
//   說明    : 西元閏年檢查格式
//   使用方式: FourYear(object)
//   輸入    : string
//   輸出    : return false/true
function FourYear(num) {
	var ret = false;
	if ((num % 4 == 0) && (num % 100 != 0) || (num % 400 == 0)) ret = true;
	else ret = false;

	return ret;
}

//----------------------------------------------------------------------
function chkSysDate(srcStr, srcInt) {
	var aryObj, myYear, myMonth, myDay, systemDate, objDate;

	myYear = (new Date()).getFullYear();
	myMonth = (new Date()).getMonth() + 1;
	if ((new String(myMonth)).length == 1) myMonth = "0" + new String(myMonth);
	myDay = (new Date()).getDate();
	if ((new String(myDay)).length == 1) myDay = "0" + new String(myDay);

	systemDate = new String(myYear) + new String(myMonth) + new String(myDay);

	aryObj = srcStr.split("/");
	objDate = new String(eval(aryObj[0]) + 1911) + new String(aryObj[1]) + new String(aryObj[2]);

	if ((parseInt(objDate) + parseInt(srcInt)) > parseInt(systemDate)) return false;
	else return true;
}


function isdate(datestr) {
	var year, month, day

	if ((len(datestr) > 10) || (len(datestr) < 8)) {
		return false
	}

	var datearray = splitstr(datestr, '/');

	if (ubound(datearray) != 2) return false;

	datearray[0] = trimlzero(datearray[0]);
	datearray[1] = trimlzero(datearray[1]);
	datearray[2] = trimlzero(datearray[2]);

	if ((!isnumeric(datearray[0])) || (!isnumeric(datearray[1])) || (!isnumeric(datearray[2]))) return false;

	var year = cint(datearray[0]);
	var month = cint(datearray[1]);
	var day = cint(datearray[2]);

	if ((month > 12) || (month < 1) || (day > monthday(year, month)) || (day < 1) || (year < 1900) || (year > 2100)) return false;

	return true;
}

//----------------------------------------------------------------------
//   功能函數: setMaxLength
//   說明    : 所有輸入欄位所設定的dataType attribute,
//             設定 maxLength attribute 及 format attribute(format attribute only for N(p,s) dataType)。
//   傳入參數: 欄位物件 srcObj(input type="text" 及 textArea)
//   傳回值  : 無
function setMaxLength(srcObj, dataType) {
	var pattern, format, dataTypeMatches, maxLength, precision, scale, j, k, m;
	var flag = false;

	pattern = /^((C|A)\(\s?(\d+)\s?\))|(\s?D\s?)|((M|N)\(\s?(\d+)(\s?,\s?(\d+))?\s?\))$/;
	dataTypeMatches = pattern.exec(dataType);

	if (dataTypeMatches == null) {
		srcObj.disabled = true;
		//alert('The dataType format does not match--' + srcObj.name);      
	}
	else {
		//ie9 had undefined problem
		for (var i = 0; i < dataTypeMatches.length; i++) { if (dataTypeMatches[i] == undefined) dataTypeMatches[i] = "" };

		if (dataTypeMatches[0].charAt(0) == "C") {
			dataType = dataTypeMatches[0]; //dataType = C(n)
			maxLength = parseInt(dataTypeMatches[3], 10);
			//chinese compute 2 byte
			if (CheckWordLength(srcObj.value, maxLength)) {
				srcObj.setAttribute('maxLength', maxLength);
				flag = true;
			}
			else {
				alert("資料長度有誤，請重新輸入");
				MED_setFocus(srcObj);
			}
		}

		else if (dataTypeMatches[0].charAt(0) == "A") {
			dataType = dataTypeMatches[0]; //dataType = A(n)
			maxLength = parseInt(dataTypeMatches[3], 10);
			//only english and number
			var re = new RegExp("^([a-zA-Z0-9]+)$", "gi");
			if (srcObj.value == '' || re.test(srcObj.value)) {
				if (srcObj.value.length <= maxLength) {
					srcObj.setAttribute('maxLength', maxLength);
					flag = true;
				}
				else {
					alert("資料長度有誤，請重新輸入");
					MED_setFocus(srcObj);
				}
			}
			else {
				alert("資料格式有誤，請重新輸入");
				MED_setFocus(srcObj);
			}
		}

		else if (dataTypeMatches[0].charAt(0) == "D") {  //dataType = D      
			dataType = dataTypeMatches[0];
			maxLength = 10;
			if (srcObj.value.length <= maxLength) {
				srcObj.setAttribute('maxLength', maxLength);
				flag = true;
			}
			else {
				alert("資料長度有誤，請重新輸入");
				MED_setFocus(srcObj);
			}
		}

		else if (dataTypeMatches[0].charAt(0) == "N" || dataTypeMatches[0].charAt(0) == "M") {    //dataType = N(p,s)   
			dataType = dataTypeMatches[6];
			precision = parseInt(dataTypeMatches[7], 10);
			format = "+";
			if (dataTypeMatches[9] != "") { //有小數部份 
				scale = parseInt(dataTypeMatches[9], 10);
				if (precision <= scale) {
					srcObj.disabled = true;
					//alert('dataType N precision must large then scale--' + srcObj.name);
				}
				else {
					maxLength = precision + 2; //有效數字位數加小數一位加正負符號一位              
					srcObj.setAttribute('maxLength', maxLength);
					for (j = 0; j < precision - scale; j++) {
						format = format + "9";
					}
					format = format + ".";
					for (k = 0; k < scale; k++) {
						format = format + "9";
					}
				}
			}
			else { //只有整數部份            
				maxLength = precision + 1;  //有效數字位數加正負符號一位
				srcObj.setAttribute('maxLength', maxLength);
				for (m = 0; m < precision; m++) {
					format = format + "9";
				}
			}
			srcObj.style.textAlign = "right";
			srcObj.setAttribute('format', format);  //set format attribute for chkNumber's format

			if (dataTypeMatches[0].charAt(0) == "M") {
				$(srcObj).bind('focus', function () { RemoveCommas(srcObj) });
				if (srcObj.value != "") {
					RemoveCommas(srcObj);
					if (chkNumber(srcObj, format)) {
						AddCommas(srcObj);
						flag = true;
					}
				}
			} else {
				if (chkNumber(srcObj, format) && srcObj.value != "") {
					flag = true;
				}
			}
		}
	}
	return flag;
}


//----------------------------------------------------------------------
//   功能函數: chkNumber
//   說明    : 檢查數字格式是否正確
//   傳入參數: 數字物件
//   傳回值  : true:正確/false:不正確
//   Include : MEDT_strLib.js
function chkNumber(srcObj, format) {
	if (srcObj.value != "") {
		if (checkNumber(srcObj.value, format) <= 0) {
			alert("格式有誤，請重新輸入");
			MED_setFocus(srcObj);
			return false;
		}
	}
	return true;
}

//----------------------------------------------------------------------
//   函式名稱：MED_setFocus
//   函式功能：使物件取得停駐點
//   傳入參數：obj - 可使用focus()方法的物件          
//   傳 回 值：無      
//   備    註：無
function MED_setFocus(obj) {
	var i, j;

	if (window.tabWindows == undefined) {
		$(obj).setfocus();
		return;
	}

	if (tabWindows.length == 0) {
		$(obj).setfocus();
		return;
	}

	if (tabWindows.length > 0) {
		for (i = 0; i < tabWindows.length; i++) {
			for (j = 0; j < tabWindows[i].tabs.length; j++) {
				if (tabWindows[i].tabwins[j].contains(obj) == true) {
					tabWindows[i].tabs[j].onmousedown();
					$(obj).setfocus();
					return;
				}
			}
		}
	}

	$(obj).setfocus();
}

//----------------------------------------------------------------------
//   函式名稱：checkNumber
//   函式功能：檢查字串是否為正確的數值字串
//   
//   傳入參數：srcStr - 要檢查的字串
//   format - 指定數值字串的格式          
//   傳 回 值：本函式分別以傳回正值或負值表示檢查結果為正確或不正確，          
//   如果要檢查的字串為空字串或空值(NULL)，則傳回0。
//   
//   -3 - 當format所含字串不符合 + - . 9 等指定格式時，則本函式傳回-3          
//    0 - 如果要檢查的字串為空字串或空值(NULL)，則傳回0
//    1, 2 - 要檢查的字串符合指定格式時，則本函式傳回1或2
//   -1,-2 - 要檢查的字串不符合指定格式時，則本函式傳回-1或-2          
//                         
//   備    註：srcStr字串與format均不得含有空白字元，
//   呼叫本函式之前，程式應自行先處理空白字元。
function checkNumber(srcStr, format) {
	var formatPattern, formatMatchs;
	var integerLen, decimalLen, pnSign, pattern, re, matchFlag;

	if (srcStr == null || srcStr == "") {
		return 0;
	}

	formatPattern = /^(([+-]?)(9*)\.(9+))|(([+-]?)(9+)\.?)$/;
	formatMatchs = formatPattern.exec(format);

	if (formatMatchs == null) {
		return -3;
	}
	else {
		for (var i = 0; i < formatMatchs.length; i++) { if (formatMatchs[i] == undefined) formatMatchs[i] = "" };
		if (formatMatchs[1] != "") {
			switch (formatMatchs[2]) {
				case "+":
					pnSign = "[+-]?";
					break;
				case "-":
					pnSign = "[-]?";
					break;
				default:
					pnSign = "";
					break;
			}
			integerLen = formatMatchs[3].length;
			decimalLen = formatMatchs[4].length;
			pattern = "^" + pnSign + "\\d{0," + integerLen + "}(\\.\\d{1," + decimalLen + "})?$";
			re = new RegExp(pattern);
			matchFlag = (re.exec(srcStr)) ? 1 : -1;
		}
		else {
			switch (formatMatchs[6]) {
				case "+":
					pnSign = "[+-]?";
					break;
				case "-":
					pnSign = "[-]?";
					break;
				default:
					pnSign = "";
					break;
			}
			integerLen = formatMatchs[7].length;
			pattern = "^" + pnSign + "\\d{1," + integerLen + "}\\.?$";
			re = new RegExp(pattern);
			matchFlag = (re.exec(srcStr)) ? 2 : -2;
		}
	}
	return matchFlag;
}


/********************************************************************************
函式名稱：chkBEDate
函式功能：判斷起迄日期是否正確
傳入參數：objBegin,objEnd -起,迄日期
傳 回 值：true - 正確
          false- 不正確
*********************************************************************************/
function chkBEDate(objBegin, objEnd) {
	return chkBEDate(objBegin, objEnd, 'N');
}

/********************************************************************************
函式名稱：chkBEDate
函式功能：判斷起迄日期是否正確
傳入參數：objBegin,objEnd,noShow -起,迄日期,"Y"不顯示訊息
傳 回 值：true - 正確
          false- 不正確
*********************************************************************************/
function chkBEDate(objBegin, objEnd, noShow) {
	var objBDate, objEDate;
	if (objBegin.value == "" && objEnd.value == "") {
		return true;
	}
	else {
		objBDate = StringToDate(objBegin.value);
		objEDate = StringToDate(objEnd.value);
		if (objBDate > objEDate) {
			if (noShow != "Y") {
				alert("「" + objBegin.getAttribute('title') + "」 不得大於 「" + objEnd.getAttribute('title') + "」");
			}
			return false;
		}
		else {
			return true;
		}
	}
}

/********************************************************************************
函式名稱：chkBEMonth
函式功能：判斷起迄年月是否正確
傳入參數：objBegin,objEnd -起,迄年月
傳 回 值：true - 正確
          false- 不正確
*********************************************************************************/
function chkBEMonth(objBegin, objEnd) {
	return chkBEMonth(objBegin, objEnd, 'N');
}

/********************************************************************************
函式名稱：chkBEMonth
函式功能：判斷起迄年月是否正確
傳入參數：objBegin,objEnd,noShow -起,迄年月,"Y"不顯示訊息
傳 回 值：true - 正確
          false- 不正確
*********************************************************************************/
function chkBEMonth(objBegin, objEnd, noShow) {
	var objBDate, objEDate;
	if (objBegin.value == "" && objEnd.value == "") {
		return true;
	}
	else {
		if (objBegin.value.search('/') >= 0)
			objBDate = StringToDate(objBegin.value + '/01');
		else
			objBDate = StringToDate(objBegin.value + '01');

		if (objEnd.value.search('/') >= 0)
			objEDate = StringToDate(objEnd.value + '/01');
		else
			objEDate = StringToDate(objEnd.value + '01');

		if (objBDate > objEDate) {
			if (noShow != "Y") {
				alert("「" + objBegin.getAttribute('title') + "」 不得大於 「" + objEnd.getAttribute('title') + "」");
			}
			return false;
		}
		else {
			return true;
		}
	}
}


/********************************************************************************
函式名稱：CheckEmptyByClass
函式功能：檢查必填欄位
傳入參數：cssName                           
傳 回 值：true - 正確
          false- 不正確
*********************************************************************************/
function CheckEmptyByClass(cssName) {
	var ext = true;
	$('.' + cssName).each(function () {
		switch (this.nodeName.toUpperCase()) {
			case 'INPUT':
			case 'SELECT':
			case 'TEXTAREA':
				if (CheckEmpty(this)) {
					ext = false;
					return false;
				}
				break;
			case 'SPAN':
			case 'TABLE':
				if ($(this).find('[type=checkbox]').length > 0) {
					if ($(this).find('[type=checkbox]:checked').length == 0) ext = false;
				}
				else if ($(this).find('[type=radio]').length > 0) {
					if ($(this).find('[type=radio]:checked').length == 0) ext = false;
				}
				else {
					if ($(this).html() == '') ext = false;
				}
				if (!ext) {
					alert(this.getAttribute('title') + '不可空白！');
					//this.focus();
					$(this).setfocus();
					return ext;
				}
				break;
			default:
				alert('必填欄位無法正常檢查！');
				break;
		}
	});
	return ext;
}

/********************************************************************************
函式名稱：ClearDataByClass
函式功能：清除欄位
傳入參數：cssName
*********************************************************************************/
function ClearDataByClass(cssName) {
	$('input[type=text].' + cssName).val('');
	$('input[type=file].' + cssName).val('');
	$('textarea.' + cssName).val('');
	$('select.' + cssName).each(function () { this.selectedIndex = 0; });
	$('span.' + cssName + ':not(:has(input))').html('');
	$('.' + cssName + ' input[type=radio]').prop('checked', false);
	$('.' + cssName + ' input[type=checkbox]').removeAttr('checked');
}


/***************************************************************************************************
函式名稱：checkTime(srcStr, format)
函式功能：檢查字串是否為正確的時間字串
傳入參數：srcStr - 要檢查的時間字串
format - 格式
傳 回 值：0 - 如果要檢查的字串為空字串或空值(NULL)，則傳回0
1 - 檢查字串為正確的時間字串，則傳回1
-1 - 檢查字串為錯誤的時間字串，則傳回-1 
-2 - 格式字串錯誤，則傳回-2           
備    註：srcStr字串不得含有空白字元，呼叫本函式之前，程式應自行先處理空白字元。 
***************************************************************************************************/
function checkTime(srcStr, format) {
	var i, j, pattern, datePart, match, isFormatPattern, metaCharacter;
	var specialPattern, formatPattern;
	var vHours, vMinutes, vSeconds;
	var setHours, setMinutes, setSeconds;
	var count, hour, minute, second, delimiter;

	if (srcStr == "" || srcStr == null) {
		return 0;
	}

	//format中含有0~9 
	if (format.match(/[0-9]/)) {
		return -2;
	}

	formatPattern = /H|N|S/;
	specialPattern = "()[]{}?.,^$+*|/\\";
	count = 1;
	hour = 0;
	minute = 0;
	second = 0;
	isFormatPattern = true;
	pattern = "^"; //pattern 開始符號
	delimiter = "";

	for (i = 0; i < format.length; i++) {
		count++;
		datePart = format.charAt(i);
		if (i + 1 < format.length) {
			nextPart = format.charAt(i + 1);
			if (nextPart.match(formatPattern) == null) {
				isFormatPattern = false;
			}
		}
		switch (datePart) {
			case "H":
				if (hour != 0) { //表示H重覆出現
					return -2;
				}
				pattern += (isFormatPattern) ? delimiter + "([0-1][0-9]|2[0-3])" : delimiter + "([0-1][0-9]|2[0-3]|[0-9])";
				hour = count;
				isFormatPattern = true;
				delimiter = "";
				break;
			case "N":
				if (minute != 0) { //表示N重覆出現
					return -2;
				}
				pattern += (isFormatPattern) ? delimiter + "([0-5][0-9])" : delimiter + "([0-5][0-9]|[0-9])";
				minute = count;
				isFormatPattern = true;
				delimiter = "";
				break;
			case "S":
				if (second != 0) { //表示S重覆出現
					return -2;
				}
				pattern += (isFormatPattern) ? delimiter + "([0-5][0-9])" : delimiter + "([0-5][0-9]|[0-9])";
				second = count;
				isFormatPattern = true;
				delimiter = "";
				break;
			default:
				count--;
				isFormatPattern = false;
				metaCharacter = specialPattern.indexOf(datePart);
				if (metaCharacter != -1) {
					delimiter += "\\" + datePart;
				}
				else {
					pattern += datePart;
				}
				break;
		}
	}
	pattern += "$";  //pattern結束符號     
	re = new RegExp(pattern);
	match = re.exec(srcStr);
	if (match == null) {  //srcStr 與 format格式不符 
		return -1;
	}
	else {
		return 1;
	}
}