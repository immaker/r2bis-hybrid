/**
 * Created by taejun on 2015-03-30.
 */
'use strict';

angular.module('r2bis.records.controllers', [])
	.controller('RecordsCtrl', function($scope, $state, searchParam, SessionInfo, calendarInit) {

		// datepicker 초기 설정
		$scope.fromDate = calendarInit.getPrtDate01();
		$scope.toDate = calendarInit.getPrtDate();

		$scope.fromOptions = calendarInit.getOptions();
		$scope.toOptions = calendarInit.getOptions();

		$scope.searchRecords = function() {

			var userInfo = SessionInfo.getCurrentUser();

			var param = {
				"uid": userInfo.AUTH_ID,
				"fromYmd": $scope.fromDate,
				"toYmd": $scope.toDate
			};
			// todo validate
			searchParam.setParam(param);
			$state.go('tab.records-detail');
		}
	});