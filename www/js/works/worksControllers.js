/**
 * Created by taejun on 2015-03-31.
 */
'use strict';

angular.module('r2bis.works', [])
.controller('WorksCtrl', function($scope, $state, WorksService, SessionInfo, $stateParams, calendarInit) {

	// datepicker 초기 설정
	var date = new Date();
	$scope.fromDate = calendarInit.getPrtDate01(date);
	$scope.toDate = calendarInit.getPrtDate(date);

	$scope.fromOptions = {
		format: 'yyyy-mm-dd',
		hiddenName: true,
		clear: '',
		close: 'Cancel',
		onClose: function() {
			$scope.fromDate = this.get('select', 'yyyy-mm-dd');
		}
	};
	$scope.toOptions = {
		format: 'yyyy-mm-dd',
		hiddenName: true,
		clear: '',
		close: 'Cancel',
		onClose: function() {
			$scope.toDate = this.get('select', 'yyyy-mm-dd');
		}
	};

	$scope.searchWorks = function() {
		var userInfo = SessionInfo.getCurrentUser();

		var param = {
			"uid": userInfo.AUTH_ID,
			"fromYmd": $scope.fromDate,
			"toYmd": $scope.toDate
		};
		$state.go('tab.works-detail',param);
	}
})
.controller('WorksDetailCtrl', function($scope, $ionicLoading, $stateParams, WorksService) {

	var param = {
		"uid": $stateParams.uid,
		"fromYmd": $stateParams.fromYmd,
		"toYmd": $stateParams.toYmd
	};

	var load = function() {
		$ionicLoading.show({
				template: 'Loading...'
		});
		// get 방식으로 해야하지만.. 서버에서 post 방식으로 처리중
		WorksService.save(param, function(works) {
			// 서버에서 key값을 한글로 return.. ngRepeat에서 한글 인식이 힘듬..ㅠㅠ
			var changeStr =	works.d.replace(/상태/gi,'status')
						.replace(/변경일/gi,'changeDay')
						.replace(/변경전/gi,'changeBefore')
						.replace(/변경후/gi,'changeAfter')
						.replace(/신청일시/gi,'requestDay');

			$scope.workList = JSON.parse(changeStr);
		});
		$ionicLoading.hide();
	};

	load();
});