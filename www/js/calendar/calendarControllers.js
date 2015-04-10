/**
 * Created by taejun on 2015-03-30.
 */
'use strict';

angular.module('r2bis.calendar', [])

.controller('CalendarController', ['$scope', '$http', '$ionicLoading', 'CalendarService', 'calendarInit', 'SessionInfo',
		function($scope, $http, $ionicLoading, CalendarService, calendarInit, SessionInfo) {

		var date = new Date();
		// 이번 달 세팅
		date = calendarInit.getPrtMonth(date);
		this.userInfo = SessionInfo.getCurrentUser();

		var param = {
			"month": date,
			"uid": this.userInfo.AUTH_ID
		};

		var load = function () {
			CalendarService.getData(param, function (calData) {
				new Calendar('#calendar', calData);
			});
		};

		load();
}]);