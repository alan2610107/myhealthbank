
//----------------------------------------------------------------------
//   功能函數:bindTextFieldEvents(formObj)
//   輸入    :Form
//   說明    :設定畫面中所有Textbox, Textarea的格式與樣式。
//function bindTextFieldEvents(formObj) {
//	var funcBody, userHandler;
//
//	$(formObj).find('input[type="text"]').each(function () { setEvents(this); });
//	$(formObj).find('textarea').each(function () { setEvents(this); });
//
//	function setEvents(srcObj) {
//		if ($(srcObj).attr('dataType') == undefined) return;
//
//		funcBody = ("RTrim(this);\n");
//		funcBody += ("setMaxLength(this, $(this).attr('dataType'));\n");
//		userHandler = $(srcObj).attr('onblur');
//		if (userHandler != undefined) {
//			funcBody += (userHandler + "\n");
//		}
//		srcObj.onblur = new Function(funcBody);
//
//		setMaxLength(srcObj, $(srcObj).attr('dataType'));
//	}
//}

//----------------------------------------------------------------------
//   功能函數:UpperCase(object)
//   說明    :回傳大寫字母
//   使用方式:UpperCase(object)
//   輸入    :Object
//   輸出    :Object.value
function UpperCase(obj) {

	var Str = obj.value.toUpperCase();

	obj.value = Str;
}

//----------------------------------------------------------------------
//   功能函數:LowerCase(object)
//   說明    :回傳大寫字母
//   使用方式:UpperCase(object)
//   輸入    :Object
//   輸出    :Object.value
function LowerCase(obj) {

	var Str = obj.value.toLowerCase();
	obj.value = Str;
}

//----------------------------------------------------------------------
//   功能函數:cstr(value)
//   說明    :將數值轉為字串
//   使用方式:cstr(value)
//   輸入    :value
//   輸出    :string
function cstr(num) {
	return num + "";
}

//----------------------------------------------------------------------
//   功能函數:Precision(object,point)
//   說明    :回傳小數點point點
//   使用方式:Precision(object,point)
//   輸入    :Object
//   輸出    :Object.value
function Precision(obj, point) {

	str = cstr(obj.value);
	var len = str.length;
	var lpos = 0,
		rpos = len;
	var newstr, addstr;
	var intstr, snstr = '';
	var i;

	if (point < 0) obj.value = str;

	var pointpos = str.indexOf(".") + 1;

	if (pointpos == 0) obj.value = str;

	if (len - pointpos <= point) obj.value = str;

	intstr = str.substring(0, pointpos - 1);

	var addpoint = 1;

	if (point > 0) {
		i = 0;
		while ((i < point - 1) && (pointpos + i + 1 <= len)) {
			addpoint = addpoint * 0.1;
			addstr = str.substring(pointpos + i, pointpos + i + 1);
			snstr = snstr + addstr;
			i++;
		}

		var num1 = parseInt(str.substring(pointpos + i, pointpos + i + 1));
		i++;
		var num2 = parseInt(str.substring(pointpos + i, pointpos + i + 1));
		if (num2 > 4) {
			num1 = num1 + 1;
			if (num1 == 10) {
				newstr = cstr(parseFloat(intstr + '.' + snstr) + addpoint);
			} else {
				addstr = cstr(num1);
				snstr = snstr + addstr;
				newstr = intstr + '.' + snstr;
			}
		} else {
			addstr = cstr(num1);
			snstr = snstr + addstr;
			newstr = intstr + '.' + snstr;
		}
	} else {//point = 0
		var num1 = cint(intstr);
		var num2 = cint(str.substring(pointpos, pointpos + 1));
		if (num2 > 4) intstr = cstr(++num1);
		else intstr = cstr(num1);
		newstr = intstr;
	}
	obj.value = newstr;
}

//----------------------------------------------------------------------
//   功能函數:Trim(object)
//   說明    :回傳大寫字母
//   使用方式:Trim(object)
//   輸入    :Object
//   輸出    :Object.value
function Trim(obj) {
	var NewStr = obj.value;
	//NewStr = NewStr.replace(/^\s+|\s+$/g, "");
	NewStr = NewStr.replace(/\s/g, "");
	obj.value = NewStr;
}

//----------------------------------------------------------------------
//   功能函數:trims(str)
//   說明    :回傳大寫字母
//   使用方式:trim(value)
//   輸入    :string
//   輸出    :string
function trims(str) {
	var NewStr = str;
	//NewStr = NewStr.replace(/^\s+|\s+$/g, "");
	NewStr = NewStr.replace(/\s/g, "");
	return NewStr;
}

//----------------------------------------------------------------------
//   功能函數:RTrim(object)
//   說明    :傳回去除最右方空白
//   使用方式:RTrim(object)
//   輸入    :Object
//   輸出    :Object.value

function RTrim(obj) {
	var i;
	for (i = obj.value.length - 1; i >= 0; i--) {

		if (obj.value.charAt(i) != " ") break;
	}
	obj.value = obj.value.substring(0, i + 1);
}

//----------------------------------------------------------------------
//   功能函數:LTrim(object)
//   說明    :傳回去除最左方空白
//   使用方式:RTrim(object)
//   輸入    :Object
//   輸出    :Object.value

function LTrim(obj) {
	var i;
	for (i = 0; i < obj.value.length; i++) {
		if (obj.value.charAt(i) != " ") break;
	}
	obj.value = obj.value.substring(i);
}

//----------------------------------------------------------------------
//**********************************************
//把字串的空白值Trim掉
//**********************************************
function my_trim(my_str) {
	str_len = my_str.length
	for (i = str_len - 1; i >= 0; i--)
		if ((my_str.substring(i, 1)) != " ") break
	return my_str.substring(0, i + 1)
}


//----------------------------------------------------------------------
//   功能函數:TrimLZero(object)
//   說明    :回傳去除字串前之0
//   使用方式:TrimLZero(object)
//   輸入    :Object
//   輸出    :Object.value
function TrimLZero(obj) {

	var len = obj.value.length;
	var lpos = 0,
		rpos = len;
	var newstr;

	while (obj.value.charAt(lpos) == '0')
		lpos++;
	if (rpos >= lpos) newstr = obj.value.substring(lpos, rpos);

	obj.value = newstr;

}


function strToDate(srcData) {
	return StringToDate(srcData);
}
//----------------------------------------------------------------------
//   功能函數:StringToDate(string)
//   說明    :將字串轉為日期格式
//   使用方式:StringToDate('0991010')
//   輸入    :string
//   輸出    :日期
//   備註    :舊VPN原名:strToDate
function StringToDate(srcStr) {
	var strArray, len, vYear, vMonth, vDay;
	switch (CheckDate(srcStr)) {
		case 1:
			strArray = srcStr.split("/");
			vYear = parseInt(strArray[0], 10);
			vMonth = parseInt(strArray[1], 10) - 1;
			vDay = parseInt(strArray[2], 10);
			break;
		case 2:
			len = srcStr.length;
			vYear = parseInt(srcStr.substring(0, len - 4), 10);
			vMonth = parseInt(srcStr.substring(len - 4, len - 2), 10) - 1;
			vDay = parseInt(srcStr.substring(len - 2, len), 10);
			break;
		default:
			return null;
			break;
	}

	vYear += (vYear > 0) ? 1911 : 1912;
	return new Date(vYear, vMonth, vDay);
}


function dateToStr(srcData, format) {
  return DateToString(srcData, format);
}



//----------------------------------------------------------------------
//   功能函數: DateToString(string,format)
//   說明    :日期格式依format轉為字串
//   使用方式: DateToString('Sun Oct 10 00:00:00 UTC+0800 2010','YMD')
//   輸入    : string,string
//   輸出    : string
//   備註    :與舊的VPNdateToStr同一支
function DateToString(srcData, format) {
	var vYear, vMonth, vDay, vHour, vMinute, vSecond, vWeekDay, vWeekDayName;
	var tmpStr, i, datePart;
	if (srcData == null || format == null) {
		return null;
	}
	vWeekDayName = ["0", "1", "2", "3", "4", "5", "6"];
	//vYear = srcData.getYear();
	vYear = srcData.getFullYear();
	vYear += (vYear < 100) ? 1900 : 0;
	vYear -= (vYear > 1911) ? 1911 : 1912;
	if (srcData.getMonth() + 1 < 10) vMonth = "0" + (srcData.getMonth() + 1);
	else vMonth = srcData.getMonth() + 1;

	if (srcData.getDate() < 10) vDay = "0" + (srcData.getDate());
	else vDay = srcData.getDate();
	vWeekDay = srcData.getDay();

	if (srcData.getHours() < 10) vHour = "0" + (srcData.getHours());
	else vHour = srcData.getHours();

	if (srcData.getMinutes() < 10) vMinute = "0" + (srcData.getMinutes());
	else vMinute = srcData.getMinutes();

	if (srcData.getSeconds() < 10) vSecond = "0" + (srcData.getSeconds());
	else vSecond = srcData.getSeconds();

	tmpStr = "";

	for (i = 0; i < format.length; i++) {

		datePart = format.charAt(i);
		switch (datePart) {
			case "Y":
				//              vYear = ("000"+(vYear + 1911).toString()).right(4);
				if (vYear < 0) vYear = 1912 + vYear;
				else if (vYear < 10) vYear = "000" + (vYear + 1911);
				else if (vYear >= 10 && vYear < 100) vYear = "00" + (vYear + 1911);
				else if (vYear >= 100 && vYear < 1000) vYear = "0" + (vYear + 1911);
				tmpStr += vYear;
				break;

			case "y":
				//              tmpStr += (vYear < 0) ? vYear : ("00" + vYear.toString()).right(3);              
				if (vYear > 0 && vYear < 10) vYear = "00" + vYear;
				else if (vYear >= 10 && vYear < 100) vYear = "0" + vYear;
				else if (vYear < 0 && vYear > -10) {
					vYear = vYear.toString();
					vYear = "-0" + vYear.substr(1, 1);
				} else if (vYear <= -10 && vYear > -100) {
					vYear = vYear.toString();
					vYear = "-" + vYear.substr(1, 2);
				}
				tmpStr += vYear;
				break;

			case "M":
				tmpStr += vMonth;
				break;

			case "D":
				tmpStr += vDay;
				break;
			case "W":
				tmpStr += "Week" + vWeekDayName[vWeekDay];
				break;
			case "H":
				tmpStr += vHour;
				break;
			case "N":
				tmpStr += vMinute;
				break;
			case "S":
				tmpStr += vSecond;
				break;
			default:
				tmpStr += datePart;
				break;
		}
	}
	return tmpStr;
}


function year(datestr) {
	return GetYear(datestr);
}


//----------------------------------------------------------------------
//   功能函數: GetYear(datestr)
//   說明    :取得日期字串之年
//   使用方式: GetYear('099/01/01')
//   輸入    : string
//   輸出    : string
//   備註    :舊VPN原名:year
function GetYear(datestr) {
	var datearray;
	var ret;

	if (CheckDate(datestr) == '1' || CheckDate(datestr) == '2') {
		datearray = datestr.split('/');
		ret = datearray[0];
	}
	return ret;
}

function month(datestr) {
	return GetMonth(datestr);
}

//----------------------------------------------------------------------
//   功能函數: GetMonth(datestr)
//   說明    :取得日期字串之月
//   使用方式: GetMonth('099/01/01')
//   輸入    : string
//   輸出    : string
//   備註    :舊VPN原名:month
function GetMonth(datestr) {
	var datearray;
	var ret;

	if (CheckDate(datestr) == '1' || CheckDate(datestr) == '2') {
		datearray = datestr.split('/');
		ret = datearray[1];
	}
	return ret;
}

function day(datestr) {
	return GetDay(datestr);
}

//----------------------------------------------------------------------
//   功能函數: GetDay(datestr)
//   說明    :取得日期字串之日
//   使用方式: GetMonth('099/01/01')
//   輸入    : string
//   輸出    : string
//   備註    :舊VPN原名:day
function GetDay(datestr) {
	var datearray;
	var ret;

	if (CheckDate(datestr) == '1' || CheckDate(datestr) == '2') {
		datearray = datestr.split('/');
		ret = datearray[2];
	}
	return ret;
}



//----------------------------------------------------------------------
//   功能函數: FormatDate(datestr)
//   說明    :取得日期字串之日
//   使用方式: FormatDate('099/01/01')
//   輸入    : string
//   輸出    : string
//   102.01.08 Justin調整民國年加0之判斷
function FormatDate(sDate) {
	var sScrap = "";
	var dScrap = new Date(sDate);
	if (dScrap == "NaN") return sScrap;

	iDay = dScrap.getDate();
	iMon = dScrap.getMonth();
	iYea = dScrap.getFullYear();
	iYea -= (iYea > 1911) ? 1911 : 1912;

	iMon = iMon + 1;

	if (iDay < 10)
		iDay = "0" + iDay;
	if (iMon < 10)
		iMon = "0" + iMon;
	if (iYea < 100) {
		if (iYea >= 10)
			iYea = "0" + iYea;
		else if (iYea < 10 && iYea > 0)
			iYea = "00" + iYea;
		else if (iYea < 0 && iYea >= -9) {
			iYea = (iYea * -1);
			iYea = "-0" + iYea;
		}
		else if (iYea < -9 && iYea >= -99) {
			iYea = (iYea * -1);
			iYea = "-" + iYea;
		}

	}
	sScrap = iYea + "/" + iMon + "/" + iDay;
	return sScrap;
}

//----------------------------------------------------------------------
//   功能函數: RemoveSlash(obj)
//   說明    :去除日期字串中之"/"
//   使用方式: RemoveSlash(obj)
//   輸入    : object
//   輸出    : object

function RemoveSlash(obj) {
	if (obj.value != "") {
		if (obj.value.indexOf("/") >= 0) {
			obj.value = obj.value.replace('/', '');
			return RemoveSlash(obj);
		} else {
			return obj;
		}
	}
}

//----------------------------------------------------------------------
//   功能函數: AddCommas(obj)
//   說明    : 數值千分位
//   使用方式: AddCommas(obj)
//   輸入    : object
//   輸出    : object
function AddCommas(obj) {

	if (IsNumeric(obj.value)) {
		var nStr = parseFloat(obj.value, 10) + '';
		var x, x1, x2;
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;

		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		obj.value = x1 + x2;
	} else {
		alert(obj.name + "必需為數字型態");
	}

	return obj;
}

//----------------------------------------------------------------------
//   功能函數: RemoveCommas(obj)
//   說明    : 數值千分位
//   使用方式: RemoveCommas(obj)
//   輸入    : object
//   輸出    : object
function RemoveCommas(obj) {
	if (obj.value != "") {
		if (obj.value.indexOf(",") >= 0) {
			obj.value = obj.value.replace(',', '');
			return RemoveCommas(obj);
		} else {
			return obj;
		}
	}
}

//***************************************************************************
//函式名稱：AddDate
//函式功能：日期D運算。
//傳入參數：str - 民國年1010101         
//          interval - 指定要運算之區間
//          "Y", "M", "D", "H", "N", "S"
//          number - 要運算之整數 
//傳 回 值：運算後之日期D                  
//備    註：
//***************************************************************************/

function AddDate(str, interval, number, type) {
	var srcDate, year, month, day, hour, minute, second, dummyDate, tempDate, tempYear, tempMonth;

	srcDate = StringToDate(str);

	year = srcDate.getFullYear();
	month = srcDate.getMonth();
	day = srcDate.getDate();
	hour = srcDate.getHours();
	minute = srcDate.getMinutes();
	second = srcDate.getSeconds();

	switch (interval) {
		case "Y":
			year += number;
			break;
		case "M":
			month += number;
			break;
		case "D":
			day += number;
			break;
		case "H":
			hour += number;
			break;
		case "N":
			day += number;
			break;
		case "S":
			second += number;
			break;
	}

	tempDate = new Date(year, month, day, hour, minute, second);

	//判斷是否為月底  
	if (interval == "Y" || interval == "M") {
		tempYear = tempDate.getFullYear();
		tempMonth = tempDate.getMonth();
		tempDay = tempDate.getDate();
		if (tempYear >= year && tempMonth > month && tempDay < day) {  // 例 1/30 +1個月--> 2/30-->3/2-->3/0(表2月底)
			tempDate = new Date(tempYear, tempMonth, 0, hour, minute, second);
		}
		if (tempYear < year && tempDay < day) {//(往前)跨年      
			tempDate = new Date(tempYear, tempMonth, 0, hour, minute, second);
		}
	}

	if (type == "1") {
		return FormatDate(tempDate);
	}
	return DateToString(tempDate, 'yMD');
}

/********************************************************************************
函式名稱：MED_formatCurrency
函式功能：金額格式化
傳入參數：數值srcNum, 格式化定義字串format。
傳 回 值 :格式化後的金額字串。
備    註：1.format字串包含($:金錢符號	、,:千位分隔符號、.N:小數點位數N)。
		 2.若傳入參數有非法字串，則傳回null值。
				 3.如傳入的格式化定義字串format為空字串，則就原傳入數值srcNum作輸出。
範    例：MED_formatCurrency(989998.228, "$,.2")		//傳回 $989,998.23
				 MED_formatCurrency("$99,321.289", "$.1") //傳回 $99321.3
********************************************************************************/
function MED_formatCurrency(srcNum, format) {
	var src = srcNum.toString();
	var formatDecimal = parseInt(format.substr(format.indexOf(".") + 1), 10);
	var result = "";
	var srcNumDot, pattern, i;

	//檢查格式化欄位是否有非法字元。
	pattern = /[^\$,\.\d]+/;

	if (pattern.exec(format) != null) {
		return null;
	}

	//檢查數值欄位是否有非法字元。
	pattern = /[^\$,-\.\d]+/;

	if (pattern.exec(src) != null || src == "") {
		return null;
	} else {
		pattern = /,/g;
		src = src.replace(pattern, "");
		pattern = /\$/g;
		src = src.replace(pattern, "");
	}

	//若未輸入格式化字串，則不作格式化處理(原數值輸出)。
	if (format == "") {
		return src;
	}

	//小數位的format設定。
	if (format.indexOf(".") != -1) {
		if (isNaN(formatDecimal)) {
			return null;
		} else {
			src = (Math.round(src * Math.pow(10, formatDecimal)) / Math.pow(10, formatDecimal)).toString(); //四捨五入

			if (src.indexOf(".") == -1) {
				srcNumDot = src.length;
			} else {
				srcNumDot = src.indexOf(".");
			}

			if (src.substr(srcNumDot + 1).length >= formatDecimal) {
				result = src.substr(srcNumDot + 1, formatDecimal);  //如果資料來源的小數位數大於或等於format欲顯示的小數位數，直接擷取欲顯示的小數位數。
			} else {
				result = src.substr(srcNumDot + 1);  //如果資料來源的小數位數小於format欲顯示的小數位數，不足的部分補零。
				for (i = 1; i <= (formatDecimal - src.substr(srcNumDot + 1).length) ; i++) {
					result += "0";
				}
			}
		}
	}
	else {
		pattern = /\d+/;

		if (pattern.exec(format) != null) {	//format格式錯誤。
			return null;
		}

		if (src.indexOf(".") == -1) {
			srcNumDot = src.length;
		} else {
			srcNumDot = src.indexOf(".");
			result = src.substr(srcNumDot + 1);
		}
	}

	if (result != "") {
		result = "." + result;
	}

	//整數位的format設定。
	if (src.charAt(0) == "-") {
		for (i = 1; i < srcNumDot ; i++) {
			result = src.charAt(srcNumDot - i) + result;
			if (i % 3 == 0 && (i != srcNumDot - 1) && format.indexOf(",") != -1) {
				result = "," + result;
			}
		}
		result = "-" + result;
	} else {
		for (i = 1; i <= srcNumDot ; i++) {
			result = src.charAt(srcNumDot - i) + result;
			if (i % 3 == 0 && i != srcNumDot && format.indexOf(",") != -1) {
				result = "," + result;
			}
		}
	}

	//金錢符號的設定。
	if (format.indexOf("$") != -1) {
		result = "$" + result;
	}
	return result;
}
