/**
 * Created by taejun on 2015-03-31.
 */
'use strict';

angular.module('r2bis.common', [])
	// controller param 전달
.factory('searchParam', [
	function() {
		var self = this;

		this.param = {};

		return {
			getParam: function() {
				return self.param;
			},
			setParam: function(val) {
				self.param = val;
			}
		}

	}
])
	//달력 초기 설정
.factory('calendarInit', ['$ionicPopup',
	function($ionicPopup) {
		var self = this;

		this.options = {
			format: 'yyyy-mm-dd',
			hiddenName: true
		};

		return {
			// todo picker 달력 설정값
			getOptions: function(el) {
				self.options["onSet"] = function(el) {
					console.log(el);
					el = this.get('select', 'yyyy-mm-dd');
				};
				return self.options;
			},
			/*
			 * 날짜를 yyyy-MM-dd 형식으로 출력
			 */
			getPrtDate: function(d) {

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
			},
			/*
			 * 날짜를 yyyy-MM-01 형식으로 출력
			 */
			getPrtDate01: function(d) {
				var prtString = d.getFullYear() + "-";
				var month = d.getMonth() + 1;

				if (month < 10)
					prtString += "0" + month;
				else
					prtString += month;

				prtString += "-01";

				return prtString;
			},
		/*
		 * 날짜를 yyyy-MM 형식으로 출력
		 */
			getPrtMonth: function(d) {
				var prtString = d.getFullYear() + "-";
				var month = d.getMonth() + 1;

				if (month < 10)
					prtString += "0" + month;
				else
					prtString += month;

				return prtString;
			},
			dateDiff: function(d1, d2) {
				d1 = this.str2Date(d1);
				d2 = this.str2Date(d2);

				var t2 = d2.getTime();
				var t1 = d1.getTime();
				return parseInt((t2-t1)/(24*3600*1000));
			},
			/*
			 * 문자열을 날짜형식으로 변경
			 */
			str2Date: function(s) {
				//if (!s.isDate()) {
				//	return;
				//}

				var arrDay = s.split("-");
				var year = parseInt(arrDay[0]);
				var month = parseInt(arrDay[1].replace(/^0(\d)/g,"$1"));
				var day = parseInt(arrDay[2].replace(/^0(\d)/g,"$1"));
				var d = new Date(year, month - 1, day);
				return d;
			},
			showAlert: function(message) {
				var alertPopup = $ionicPopup.alert({
					template: message,
					buttons: [
						{
							text: '<b>확인</b>',
							type: 'button-royal'
						}
					]
				});
				alertPopup.then(function(res) {
					console.log('Thank you for not eating my delicious ice cream cone');
				});
			}
		}
	}
]);