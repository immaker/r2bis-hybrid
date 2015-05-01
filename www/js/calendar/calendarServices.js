/**
 * Created by taejun on 2015-04-10.
 */
'use strict';

angular.module('r2bis.calendar')

.factory('CalendarService', ['$http','$ionicLoading',
	function($http, $ionicLoading) {
		return {
			getData : function(param, callback) {
				var resultData;
				$ionicLoading.show();
				$http.post('http://scms.ktcs.co.kr/Mobile/Rs2_WebService.asmx/Schedule', JSON.stringify(param))
					.success(function(data, status) {
						//parseData = data.d; //JSON.parse(data.d);

						if (status === 200) {
							var calData = [];
							var parseData = JSON.parse(data.d);

							angular.forEach(parseData.WFM_MONTH[0], function(value, key) {
									if (value === "출근")
										this.push({date : key, eventName: value, calendar: '출근', color: 'blue'});
									else
										this.push({date : key, eventName: value, calendar: value, color: 'orange'});
								}, calData);
							callback(calData);
							$ionicLoading.hide();
						}
					})
					.error(function(data, status) {
						console.log("Error " + data + " " + status);
						$ionicLoading.hide();
					});

			}
		};
	}
]);
