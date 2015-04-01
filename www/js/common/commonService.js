/**
 * Created by taejun on 2015-03-31.
 */
angular.module('r2bis.common', [])
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
//todo 달력설정값
.factory('calendarInit', [
	function() {
		var self = this;
		var d = new Date();

		this.options = {
			format: 'yyyy-mm-dd',
			hiddenName: true,
			onSet: function( event ) {
				return this.get('select', 'yyyy-mm-dd');
			}
		};

		return {
			getOptions: function() {
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
			}
		}
	}
]);