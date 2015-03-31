/**
 * Created by taejun on 2015-03-30.
 */
'use strict';

angular.module('r2bis.login.controllers', [])
.controller('LoginCtrl', function($scope, $ionicLoading, $http, $state, $ionicPopup, userInfo) {

	$scope.doLogin = function() {
		$ionicLoading.show({
			template: 'Loading...'
		});

		var param = {
			"uid": $scope.uid,
			"pwd": $scope.pwd
		};

		$http.post("http://scms.ktcs.co.kr/Mobile/Rs2_WebService.asmx/LoginAuth", JSON.stringify(param))
			.success(function(data, status) {
				console.log(data.d + "/// " + status);
				var parseData = JSON.parse(data.d);
				if (parseData.success) {
					//userInfo.pushUser({
					//	"userId": parseData.AUTH_ID,
					//	"userName": parseData.AUTH_NAME,
					//	"userTopGroupId": parseData.AUTH_TOPGRP_ID,
					//	"userRoleGrade": parseData.AUTH_ROLE_GRADE
					//});
					$state.go('tab');
					$ionicLoading.hide();

				} else {
					$scope.showAlert(parseData.message);
					$ionicLoading.hide();
				}
			})
			.error(function(data, status) {
				console.log("Error " + data + " " + status);
				$ionicLoading.hide();
			});

		// An alert dialog
		$scope.showAlert = function(str) {
			var alertPopup = $ionicPopup.alert({
				title: str,
				buttons: [
					{
						text: '확인',
						type: 'button-assertive'
					}
				]
			});
			alertPopup.then(function(res) {
				console.log('Thank you for not eating my delicious ice cream cone');
			});
		};
	};
});