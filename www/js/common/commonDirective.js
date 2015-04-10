/**
 * Created by taejun on 2015-04-03.
 */
angular.module('r2bis.directive', [])
.directive('calendar', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/calendar.html'
		}
	});