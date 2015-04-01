/**
 * Created by taejun on 2015-03-31.
 */
'use strict';

angular.module('r2bis.works.detail', [])
.controller('WorksDetailCtrl', function($scope, $ionicLoading, $http, searchParam) {

		var param = searchParam.getParam();

		$ionicLoading.show({
			template: 'Loading...'
		});

		$http.post("http://scms.ktcs.co.kr/Mobile/Rs2_WebService.asmx/WfmChangeList", JSON.stringify(param))
			.success(function(data, status) {

				var changeStr =	data.d.replace(/상태/gi,'status')
					.replace(/변경일/gi,'changeDay')
					.replace(/변경전/gi,'changeBefore')
					.replace(/변경후/gi,'changeAfter')
					.replace(/신청일시/gi,'requestDay');

				var parseData = JSON.parse(changeStr);

				if (status === 200) {
					//sale json data
					$scope.workList = parseData;

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
	});