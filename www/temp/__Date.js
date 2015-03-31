/*
 * 두 날짜 차이 비교
 */
var DateDiff = {
    Day: function(d1, d2) {
    	var t2 = d2.getTime();
    	var t1 = d1.getTime();
    	return parseInt((t2-t1)/(24*3600*1000));
    },

    Weeks: function(d1, d2) {
    	var t2 = d2.getTime();
    	var t1 = d1.getTime();
    	return parseInt((t2-t1)/(24*3600*1000*7));
    },

    Month: function(d1, d2) {
    	var d1Y = d1.getFullYear();
    	var d2Y = d2.getFullYear();
    	var d1M = d1.getMonth();
    	var d2M = d2.getMonth();
    	return (d2M+12*d2Y)-(d1M+12*d1Y);
    },

    Year: function(d1, d2) {
    	var t = d2.getFullYear() - d1.getFullYear();
    	return t;
    }
};

/*
 * 문자열을 날짜형식으로 변경
 */
function Str2Date(s) {

	if (!s.isDate()) {
		return;
	}

	var arrDay = s.split("-");
	var year = parseInt(arrDay[0]);
	var month = parseInt(arrDay[1].replace(/^0(\d)/g,"$1"));
	var day = parseInt(arrDay[2].replace(/^0(\d)/g,"$1"));
	var d = new Date(year, month - 1, day);
	return d;
}

/*
 * 날짜를 yyyy-MM-dd 형식으로 출력
 */
function PrtDate(d) {
	var prtString = d.getFullYear() + "-";
	var month = d.getMonth() + 1;
	var day = d.getDate();

	if (month < 10)
		prtString += "0" + month;
	else
		prtString += month;
	
	prtString += "-";

	if (day < 10)
		prtString += "0" + day;
	else
		prtString += day;

	return prtString;
}

/*
 * 날짜를 yyyy-MM-dd hh:mm:ss 형식으로 출력
 */
function PrtDateTime(d) {
	var prtString = d.getFullYear() + "-";
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var hours = d.getHours();
	var minutes = d.getMinutes();
	var seconds = d.getSeconds();

	if (month < 10)
		prtString += "0" + month;
	else
		prtString += month;
	
	prtString += "-";

	if (day < 10)
		prtString += "0" + day;
	else
		prtString += day;

	if (hours < 10)
		prtString += " 0" + hours;
	else
		prtString += " " + hours;
	
	if (minutes < 10)
		prtString += ":0" + minutes;
	else
		prtString += ":" + minutes;
	
	if (seconds < 10)
		prtString += ":0" + seconds;
	else
		prtString += ":" + seconds;

	return prtString;
}
/*
* 한달전 날짜를 yyyy-MM-dd 형식으로 출력
*/

function setMonthAgo(date) {
	var selecterDate = date.split("-");
	var changeDate = new Date();
	changeDate.setFullYear(selecterDate[0], selecterDate[1]-1,selecterDate[2]);

	var y = changeDate.getFullYear();
	var m = changeDate.getMonth();
	var d = changeDate.getDate();

	if (m < 10) m = "0" + m;

	if (d < 10) d = "0" + d;

	var resultDate = y + "-" + m + "-" + d;

	return resultDate;

}

/*
 * 날짜를 yyyy-MM-01 형식으로 출력
 */
function PrtDate01(d) {
	var prtString = d.getFullYear() + "-";
	var month = d.getMonth() + 1;

	if (month < 10)
		prtString += "0" + month;
	else
		prtString += month;
	
	prtString += "-01";

	return prtString;
}