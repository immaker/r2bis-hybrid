/**
 * Created by taejun on 2015-03-30.
 */
'use strict';

angular.module('r2bis.records.controllers', [])
	.controller('RecordsCtrl', function($scope, $state, searchParam, SessionInfo) {
		var date = new Date();

		$scope.addZero = function(num) {
			if (num < 10) return "0" + num;
		};

		$scope.fromDate = date.getFullYear() + "-" + ($scope.addZero(date.getMonth()+1)) + "-01";
		$scope.toDate = date.getFullYear() + "-" + ($scope.addZero(date.getMonth()+1)) + "-" + date.getDate();

		$scope.fromOptions = {
			format: 'yyyy-mm-dd',
			today: '',
			clear: 'Clear selection',
			close: 'Cancel',
			buttonClear: 'picker__button--clear',
			buttonClose: 'picker__button--close',
			hiddenName: true,
			onSet: function( event ) {
				$scope.fromDate = this.get('select', 'yyyy-mm-dd');
			}
		};

		$scope.toOptions = {
			format: 'yyyy-mm-dd',
			hiddenName: true,
			onSet: function( event ) {
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