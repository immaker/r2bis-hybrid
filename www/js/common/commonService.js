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

		this.options = {
			format: 'yyyy-mm-dd',
			hiddenName: true,
			onSet: function( event ) {
				$scope.fromDate = this.get('select', 'yyyy-mm-dd');
			}
		};

		return {
			getOptions: function() {
				return self.options;
			}
		}
	}
]);