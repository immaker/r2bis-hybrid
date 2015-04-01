/**
 * Created by taejun on 2015-03-31.
 */
angular.module('r2bis.works.controllers', [])
.controller('WorksCtrl', function($scope, $state, SessionInfo, searchParam, calendarInit) {

	// datepicker 초기 설정
	$scope.fromDate = calendarInit.getPrtDate01();
	$scope.toDate = calendarInit.getPrtDate();

	$scope.fromOptions = calendarInit.getOptions();
	$scope.toOptions = calendarInit.getOptions();

	$scope.searchWorks = function() {
		var userInfo = SessionInfo.getCurrentUser();

		var param = {
			"uid": userInfo.AUTH_ID,
			"fromYmd": $scope.fromDate,
			"toYmd": $scope.toDate
		};
		// todo validate
		searchParam.setParam(param);
		$state.go('tab.works-detail');
	}
});