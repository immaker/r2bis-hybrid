/**
 * Created by taejun on 2015-03-30.
 */
'use strict';

angular.module('r2bis.login', [])
.controller('LoginCtrl', function($scope, $ionicLoading, $http, $state, $ionicPopup, SessionInfo) {

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
				var parseData = JSON.parse(data.d);
				if (parseData.success) {

					SessionInfo.reset();
					SessionInfo.setUserInfo(parseData);
					//{"d":"{\"AUTH_ID\":\"40526\",\"AUTH_NAME\":\"김민준\",\"AUTH_ROLE_GRADE\":4,\"AUTH_TOPGRP_ID\":\"8\",\"AUTH_TOPGRP_NAME\":\"충남_호남\",\"AUTH_SUBGRP_ID\":\"57\",\"AUTH_SUBGRP_NAME\":\"익산\",\"AUTH_AGENT_ID\":\"1000049534\",\"AUTH_AGENT_NAME\":\"리빙프라자_수송점\",\"success\":true}"}

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
				console.log(res);
			});
		};
	};
});