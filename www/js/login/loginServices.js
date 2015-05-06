/**
 * Created by taejun on 2015-03-30.
 */
'use strict';

angular.module('r2bis.login')
.service('SessionInfo', ['$rootScope', function SessionInfo($rootScope) {
	this.localStorageKey = "__SESSION_INFO";
	try {
		$rootScope.currentUser = JSON.parse(localStorage.getItem(this.localStorageKey) || "{}");
	} catch(e) {
		$rootScope.currentUser = {};
	}

	this.getCurrentUser = function() {
		return $rootScope.currentUser;
	}

	this.isUserSignedIn = function() {
		if(this.getCurrentUser() && this.getCurrentUser().id) {
			return true;
		} else {
			return false;
		}
	};

	this.setUserInfo = function(info) {
		angular.extend($rootScope.currentUser, info);
		localStorage.setItem(this.localStorageKey, JSON.stringify($rootScope.currentUser));
	};

	this.reset = function() {
		$rootScope.currentUser = {};
		localStorage.setItem(this.localStorageKey, JSON.stringify($rootScope.currentUser));
	};

	this.setAutoLoginFlag = function(flag) {
		localStorage.setItem('loginFlag', flag);
	};

	this.getAutoLoginFlag = function() {
		if(localStorage.getItem('loginFlag') === "false") {
			return false;
		}

		return true;
	};

}]);
