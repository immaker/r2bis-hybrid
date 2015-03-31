/**
 * Created by taejun on 2015-03-30.
 */
'use strict';

angular.module('r2bis.calendar.controllers', [])

.controller('CalendarCtrl', function($scope, $http, $ionicLoading, SessionInfo) {

	this.addZero = function(num) {
		if (num < 10) return "0" + num;
	};
	var date = new Date();
	date = date.getFullYear() + "-" + (this.addZero(date.getMonth()+1));
	this.userInfo = SessionInfo.getCurrentUser();

	var param = {
		"month": date,
		"uid": this.userInfo.AUTH_ID
	};
		console.log(param);

	$http.post("http://scms.ktcs.co.kr/Mobile/Rs2_WebService.asmx/Schedule", JSON.stringify(param))
		.success(function(data, status) {
			//this.re = /상위그룹/gi;
			//this.changeStr =	data.d.replace(this.re,'target');
			//
			var parseData = JSON.parse(data.d);

			if (status === 200) {
				//sale json data
				$scope.wfmMonth = parseData.WFM_MONTH;

				$ionicLoading.hide()
			} else {
				$scope.showAlert(parseData.message);
				$ionicLoading.hide();
			}
		})
		.error(function(data, status) {
			console.log("Error " + data + " " + status);
			$ionicLoading.hide();
		});

		var data = [
			{ eventName: 'Lunch Meeting w/ Mark', calendar: 'Work', color: 'orange', date:'1' }
			//{ eventName: 'Interview - Jr. Web Developer', calendar: 'Work', color: 'orange', date:'02' },
			//{ eventName: 'Demo New App to the Board', calendar: 'Work', color: 'orange', date:'3' },
			//{ eventName: 'Dinner w/ Marketing', calendar: 'Work', color: 'orange', date:'4' }

			//{ eventName: 'Game vs Portalnd', calendar: 'Sports', color: 'blue' },
			//{ eventName: 'Game vs Houston', calendar: 'Sports', color: 'blue' },
			//{ eventName: 'Game vs Denver', calendar: 'Sports', color: 'blue' },
			//{ eventName: 'Game vs San Degio', calendar: 'Sports', color: 'blue' },
			//
			//{ eventName: 'School Play', calendar: 'Kids', color: 'yellow' },
			//{ eventName: 'Parent/Teacher Conference', calendar: 'Kids', color: 'yellow' },
			//{ eventName: 'Pick up from Soccer Practice', calendar: 'Kids', color: 'yellow' },
			//{ eventName: 'Ice Cream Night', calendar: 'Kids', color: 'yellow' },
			//
			//{ eventName: 'Free Tamale Night', calendar: 'Other', color: 'green' },
			//{ eventName: 'Bowling Team', calendar: 'Other', color: 'green' },
			//{ eventName: 'Teach Kids to Code', calendar: 'Other', color: 'green' },
			//{ eventName: 'Startup Weekend', calendar: 'Other', color: 'green' }
		];
		var calendar = new Calendar('#calendar', data);

		var tag =	document.getElementsByTagName('h1')[0].innerHTML;
		console.log(tag);
});