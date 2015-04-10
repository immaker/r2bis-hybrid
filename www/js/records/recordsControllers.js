/**
 * Created by taejun on 2015-03-30.
 */
'use strict';

angular.module('r2bis.records', [])

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
})
.controller('RecordsDetailCtrl', function($scope, $ionicLoading, RecordService, searchParam) {
	// 검색 조건 // chartsService 통해서 컨트롤러 사이 통신
	var param = searchParam.getParam();

	$ionicLoading.show({
		template: 'Loading...'
	});

	var load = function() {
		// get 방식으로 해야하지만.. 서버에서 post 방식으로 처리중
		RecordService.save(param, function(record) {
			// 서버에서 key값을 한글로 return.. ngRepeat에서 한글 인식이 힘듬..ㅠㅠ
			var changeStr =	record.d.replace(/일자/gi,'day');

			$scope.recordList = JSON.parse(changeStr);
			$ionicLoading.hide();
		});

	};

	load();
});