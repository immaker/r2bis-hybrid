/**
 * Created by taejun on 2015-03-30.
 */
'use strict';

angular.module('r2bis.records', [])

.controller('RecordsCtrl', function($scope, $state, $ionicModal,SessionInfo, calendarInit, $q,
                                    SalesItem1,SalesItem2,SalesItem3,SalesItem4) {

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

	$scope.registOptions = {
		format: 'yyyy-mm-dd',
		hiddenName: true,
		clear: '',
		close: 'Cancel',
		onClose: function() {
			$scope.registDate = this.get('select', 'yyyy-mm-dd');
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
			fourth = SalesItem4.save({});

		$q.all([first, second, third]).then(function(result) {
			var tmp = [];
			angular.forEach(result, function(response) {
				//console.log(result[0]);
				console.log(response.d);
				tmp = tmp.concat(response.d);
			});
			//console.log(tmp);
			return tmp;
		}).then(function(tmpResult) {
			console.log(tmpResult);
			$scope.saleList = JSON.parse(tmpResult.d);
		});

		//var saleArr = [];
		//
		//SalesItem1.save({}, function(record) {
		//	console.log(record.d);
		//	//$scope.saleList = JSON.parse(record.d);
		//	saleArr = saleArr.concat(record.d);
		//});
		//
		//SalesItem2.save({}, function(record) {
		//	console.log(record.d);
		//	//$scope.saleList = JSON.parse(record.d);
		//	saleArr += JSON.parse(record.d);
		//});
		//
		//SalesItem3.save({}, function(record) {
		//	console.log(record.d);
		//	//$scope.saleList = JSON.parse(record.d);
		//	saleArr += JSON.parse(record.d);
		//});
		//
		//SalesItem4.save({}, function(record) {
		//	console.log(record.d);
		//	//$scope.saleList = JSON.parse(record.d);
		//	saleArr += JSON.parse(record.d);
		//});
		//console.log(sales);
		//$scope.salsList = sales;
	}

})
.controller('RecordsDetailCtrl', function($scope, $ionicLoading, RecordService, $stateParams) {
	// 검색 조건 // chartsService 통해서 컨트롤러 사이 통신
	var param = {
		"uid": $stateParams.uid,
		"fromYmd": $stateParams.fromYmd,
		"toYmd": $stateParams.toYmd
	};

		console.log($stateParams);

	$ionicLoading.show({
		template: 'Loading...'
	});

	var load = function() {
		// get 방식으로 해야하지만.. 서버에서 post 방식으로 처리중..
		// restful 하지 못함.. 안타깝다~~ 서버 개발도 내가 하고 싶다~~
		RecordService.save(param, function(record) {
			// 서버에서 key값을 한글로 return.. ngRepeat에서 한글 인식이 힘듦..ㅠㅠ
			var changeStr =	record.d.replace(/일자/gi,'day');
			//changeStr = JSON.parse(changeStr);
			//var recordData = [];
			//angular.forEach(changeStr, function(value, key) {
			//	this.push({key: key, value: value});
			//}, recordData);
			//console.log(recordData);
			//console.log(JSON.parse(recordData));
			//var change = recordData.replace(/일자/gi, 'day');
			$scope.recordList = JSON.parse(changeStr);
			$ionicLoading.hide();
		});
	};

	load();
});