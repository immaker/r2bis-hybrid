/**
 * Created by taejun on 2015-03-31.
 */
angular.module('r2bis.records.detail', [])
.controller('RecordsDetailCtrl', function($scope, $ionicLoading, $http, searchParam) {
	// 검색 조건 // chartsService 통해서 컨트롤러 사이 통신
	var param = searchParam.getParam();

	$ionicLoading.show({
		template: 'Loading...'
	});

	$http.post("http://scms.ktcs.co.kr/Mobile/Rs2_WebService.asmx/SalesDaily", JSON.stringify(param))
		.success(function(data, status) {
			var re = /일자/gi;
			var changeStr =	data.d.replace(re,'day');

			var parseData = JSON.parse(changeStr);

			if (status === 200) {
				//sale json data
				$scope.recordList = parseData;

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