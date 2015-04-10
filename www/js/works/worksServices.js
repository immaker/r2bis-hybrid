/**
 * Created by taejun on 2015-03-31.
 */
'use strict';

angular.module('r2bis.works')
	.factory('WorksService', ['$resource',
		function($resource) {
			return $resource('http://scms.ktcs.co.kr/Mobile/Rs2_WebService.asmx/WfmChangeList',
				{
					uid:"@uid",
					fromYmd:"@fromYmd",
					toYmd:"@toYmd"
				});
		}
	]);