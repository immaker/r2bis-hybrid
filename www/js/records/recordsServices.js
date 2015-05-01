/**
 * Created by taejun on 2015-03-31.
 */
'use strict';

angular.module('r2bis.records')
	.factory('RecordService', [ '$resource',
		function($resource) {
			return $resource('http://scms.ktcs.co.kr/Mobile/Rs2_WebService.asmx/SalesDaily',
				{
					uid:"@uid",
					fromYmd:"@fromYmd",
					toYmd:"@toYmd"
				});
		}
	])
	// 1234 라니........
	// 동적인 입력항목을 가져오는 api
	.factory('SalesItem1', [ '$resource',
		function($resource) {
			return $resource('http://scms.ktcs.co.kr/Mobile/Rs2_WebService.asmx/SalesItem1', {});
		}
	])
	.factory('SalesItem2', [ '$resource',
		function($resource) {
			return $resource('http://scms.ktcs.co.kr/Mobile/Rs2_WebService.asmx/SalesItem2', {});
		}
	])
	.factory('SalesItem3', [ '$resource',
		function($resource) {
			return $resource('http://scms.ktcs.co.kr/Mobile/Rs2_WebService.asmx/SalesItem3', {});
		}
	])
	.factory('SalesItem4', [ '$resource',
		function($resource) {
			return $resource('http://scms.ktcs.co.kr/Mobile/Rs2_WebService.asmx/SalesItem4', {});
		}
	]);