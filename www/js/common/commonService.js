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
.factory('calendarInit', [
	function() {
		var self = this;
		var d = new Date();

		this.options = {
			format: 'yyyy-mm-dd',
			hiddenName: true
		};

		return {
			getOptions: function(el) {
				self.options["onSet"] = function(el) {
					console.log(el);
					el = this.get('select', 'yyyy-mm-dd');
				};
				return self.options;
			},
			getPrtDate: function() {

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
			getPrtDate01: function() {
				var prtString = d.getFullYear() + "-";
				var month = d.getMonth() + 1;

				if (month < 10)
					prtString += "0" + month;
				else
					prtString += month;

				prtString += "-01";

				return prtString;
			},
			dateDiff: function() {
				var t2 = d2.getTime();
				var t1 = d1.getTime();
				return parseInt((t2-t1)/(24*3600*1000));
			}
		}
	}
]);