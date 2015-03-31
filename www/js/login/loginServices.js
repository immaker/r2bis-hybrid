/**
 * Created by taejun on 2015-03-30.
 */
'use strict';

angular.module('r2bis.login.services', [])
.factory('userInfo', [
	function() {
	var user = [];

		return {
			getUser: function() {
				return user;
			},
			pushUser: function(info) {

				user.push(info)
			}
		};
}]);
