/**
 * Created by taejun on 2015-03-30.
 */
'use strict';

angular.module('r2bis.calendar.controllers', [])

.controller('CalendarCtrl', function($scope, $http, $ionicLoading, SessionInfo, calendarInit) {

	var date = new Date();
	// 이번 달 세팅
	date = calendarInit.getPrtMonth(date);
	this.userInfo = SessionInfo.getCurrentUser();

	var param = {
		"month": date,
		"uid": this.userInfo.AUTH_ID
	};
	var calendar;
	var calData = [];
	$ionicLoading.show();

	// 월간복무표
	$http.post("http://scms.ktcs.co.kr/Mobile/Rs2_WebService.asmx/Schedule", JSON.stringify(param))
		.success(function(data, status) {

			var parseData = JSON.parse(data.d);

			if (status === 200) {
				//서버 데이터가 {1:'출근'}  >>> 키와 키값을 달력에 표시하기 위해 분류하여 날짜별로 새로운 객체 생성
				angular.forEach(parseData.WFM_MONTH[0], function(value, key) {
					if (value === "출근")
						this.push({date : key, eventName: value, calendar: '출근', color: 'blue'});
					else
						this.push({date : key, eventName: value, calendar: value, color: 'orange'});
				}, calData);

				// 달력 생성
				calendar = new Calendar('#calendar', calData);

				$ionicLoading.hide()
			} else {
				$scope.showAlert(parseData.message);
				$ionicLoading.hide();
			}
		})
		.error(function(data, status) {
			console.log("Error " + data + " " + status);
			$ionicLoading.hide();
		});
});