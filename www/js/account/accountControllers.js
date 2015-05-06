/**
 * Created by taejun on 2015-03-31.
 */
'use strict';

angular.module('r2bis.account', [])
.controller('AccountCtrl', function($scope, SessionInfo) {

		console.log(SessionInfo.getAutoLoginFlag());
		$scope.settingsList = [
			{text: "자동로그인", checked: SessionInfo.getAutoLoginFlag()}
		];

		$scope.localStorageUpdate = function(flag) {

			SessionInfo.setAutoLoginFlag(flag);
		}
});