'use strict';

var myApp = angular.module('starter.controllers', []);

myApp.controller('CalendarCtrl', function($scope) {
		var data = [
			{ eventName: 'Lunch Meeting w/ Mark', calendar: 'Work', color: 'orange' },
			{ eventName: 'Interview - Jr. Web Developer', calendar: 'Work', color: 'orange' },
			{ eventName: 'Demo New App to the Board', calendar: 'Work', color: 'orange' },
			{ eventName: 'Dinner w/ Marketing', calendar: 'Work', color: 'orange' },

			{ eventName: 'Game vs Portalnd', calendar: 'Sports', color: 'blue' },
			{ eventName: 'Game vs Houston', calendar: 'Sports', color: 'blue' },
			{ eventName: 'Game vs Denver', calendar: 'Sports', color: 'blue' },
			{ eventName: 'Game vs San Degio', calendar: 'Sports', color: 'blue' },

			{ eventName: 'School Play', calendar: 'Kids', color: 'yellow' },
			{ eventName: 'Parent/Teacher Conference', calendar: 'Kids', color: 'yellow' },
			{ eventName: 'Pick up from Soccer Practice', calendar: 'Kids', color: 'yellow' },
			{ eventName: 'Ice Cream Night', calendar: 'Kids', color: 'yellow' },

			{ eventName: 'Free Tamale Night', calendar: 'Other', color: 'green' },
			{ eventName: 'Bowling Team', calendar: 'Other', color: 'green' },
			{ eventName: 'Teach Kids to Code', calendar: 'Other', color: 'green' },
			{ eventName: 'Startup Weekend', calendar: 'Other', color: 'green' }
		];
		var calendar = new Calendar('#calendar', data);
});

myApp.controller('DashCtrl', function($scope, $state, $location) {
	$scope.searchRecode = function() {
		console.log("searchRecord");

	}
});

myApp.controller('LoginCtrl', function($scope, $ionicLoading, $http, $state, $ionicPopup) {

	$scope.user = {};

	//$scope.loginData = {};
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
					//$state.go('tab');
					$scope.user.details = {
						"userId": parseData.AUTH_ID,
						"userName": parseData.AUTH_NAME,
						"userTopGroupId": parseData.AUTH_TOPGRP_ID,
						"userRoleGrade": parseData.AUTH_ROLE_GRADE
					};

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

myApp.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});

myApp.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
