/**
 * Created by taejun on 2015-03-30.
 */
'use strict';

angular.module('r2bis.calendar', [])

.controller('CalendarController', ['$scope', '$http', '$ionicLoading', '$state', '$stateParams', 'CalendarService', 'calendarInit', 'SessionInfo',
	function($scope, $http, $ionicLoading, $state, $stateParams, CalendarService, calendarInit, SessionInfo) {

		var date = new Date();
		// 이번 달 세팅
		date = calendarInit.getPrtMonth(date);
		this.userInfo = SessionInfo.getCurrentUser();

		var param = {
			"month": date,
			"uid": this.userInfo.AUTH_ID
		};

		console.log(param);

		var load = function (param) {
			CalendarService.getData(param, function (calData) {
				new Calendar('#calendar', calData, $state);
			});
		};

		load(param);
}])
.controller('CalendarDetailController', ['$scope', '$stateParams', 'SessionInfo',
		function($scope, $stateParams, SessionInfo) {
			this.userInfo = SessionInfo.getCurrentUser();

			console.log($stateParams);

			$scope.chInfo = {
				"userid": this.userInfo.AUTH_ID + " / " + this.userInfo.AUTH_NAME,
				"chday": $stateParams.day,
				"evname": $stateParams.ev,
				"reason": ""
			};
}]);