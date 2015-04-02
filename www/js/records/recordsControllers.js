/**
 * Created by taejun on 2015-03-30.
 */
'use strict';

angular.module('r2bis.records.controllers', [])
	.controller('RecordsCtrl', function($scope, $state, searchParam, SessionInfo, calendarInit) {

	// datepicker 초기 설정
	var date = new Date();
	$scope.fromDate = calendarInit.getPrtDate01(date);
	$scope.toDate = calendarInit.getPrtDate(date);

	$scope.fromOptions = {
		format: 'yyyy-mm-dd',
		hiddenName: true,
		onSet: function() {
			$scope.fromDate = this.get('select', 'yyyy-mm-dd');
		}
	};
	$scope.toOptions = {
		format: 'yyyy-mm-dd',
		hiddenName: true,
		onSet: function() {
			$scope.toDate = this.get('select', 'yyyy-mm-dd');
		}
	};

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