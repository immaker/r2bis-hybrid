/**
 * Created by taejun on 2015-03-31.
 */
angular.module('r2bis.charts.services', [])
.factory('searchParam', [
		function() {
			var param = {};

			return {
				getParam: function() {
					return param;
				},
				setParam: function(val) {
					param = val;
				}
			}

		}
	]);