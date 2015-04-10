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
	]);