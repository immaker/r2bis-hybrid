/**
 * Created by taejun on 2015-03-30.
 */
'use strict';

angular.module('r2bis.records', [])

.controller('RecordsCtrl', function($scope, $state, $ionicModal,SessionInfo, calendarInit,
                                    $q,SalesItem1,SalesItem2,SalesItem3,SalesItem4) {

	// datepicker 초기 설정
	var date = new Date();
	$scope.fromDate = calendarInit.getPrtDate01(date);
	$scope.toDate = calendarInit.getPrtDate(date);
	$scope.registDate = calendarInit.getPrtDate(date);

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

	$scope.searchRecords = function() {

		var userInfo = SessionInfo.getCurrentUser();

		var param = {
			"uid": userInfo.AUTH_ID,
			"fromYmd": $scope.fromDate,
			"toYmd": $scope.toDate
		};

		$state.go('tab.records-detail', param);
	};

	// modal
	$ionicModal.fromTemplateUrl('/templates/modal-registRecord.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});
	$scope.openModal = function() {
		$scope.modal.show();
		getSalesItem();

		$scope.registOptions = {
			format: 'yyyy-mm-dd',
			hiddenName: true,
			clear: '',
			close: 'Cancel',
			onClose: function() {
				$scope.registDate = this.get('select', 'yyyy-mm-dd');
			}
		};
	};
	$scope.closeModal = function() {
		$scope.modal.hide();
	};
	//Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});
	// Execute action on hide modal
	$scope.$on('modal.hidden', function() {
		// Execute action
	});
	// Execute action on remove modal
	$scope.$on('modal.removed', function() {
		// Execute action
	});

	var getSalesItem = function() {

		var first  = SalesItem1.save({}).$promise,
			second = SalesItem2.save({}).$promise,
			third  = SalesItem3.save({}).$promise,
			fourth = SalesItem4.save({}).$promise;

		$q.all([first, second, third, fourth]).then(function(result) {
			var tmp;
			var resultTmp = [];
			angular.forEach(result, function(response) {
				tmp = JSON.parse(response.d);

				for (var i in tmp) {
					resultTmp.push(tmp[i]);
				}
			});

			return resultTmp;
		}).then(function(tmpResult) {
			$scope.saleList = tmpResult;
		});

	}

})
.controller('RecordsDetailCtrl', function($scope, $ionicLoading, RecordService, $stateParams) {
	// 검색 조건
	var param = {
		"uid": $stateParams.uid,
		"fromYmd": $stateParams.fromYmd,
		"toYmd": $stateParams.toYmd
	};

		console.log($stateParams);

	$ionicLoading.show({
		template: 'Loading...'
	});
var tempInt = 0;
	$scope.except = function(key) {
		if (key !== 'PID' && key !== 'date' && key !== '상위그룹' && key !== '하위그룹' && key !== '접점코드'
			&& key !== '매장명' && key !== '사번' && key !== '사원명') {
			return true;
		}
	};

	var load = function() {

		// get 방식으로 해야하지만.. 서버에서 post 방식으로 처리중..
		// restful 하지 못함.. 안타깝다~~ 서버 개발도 내가 하고 싶다~~
		RecordService.save(param, function(record) {
			// 서버에서 key값을 한글로 return.. ngRepeat에서 한글 인식이 힘듦..ㅠㅠ
			var changeStr =	record.d.replace(/일자/gi,'date');

			var parseData = JSON.parse(changeStr);
			console.log(changeStr);
			console.log("1>>" + parseData);

			$scope.recordList = parseData;
			$ionicLoading.hide();
		});
	};

	load();
});