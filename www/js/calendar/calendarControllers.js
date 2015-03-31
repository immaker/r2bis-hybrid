/**
 * Created by taejun on 2015-03-30.
 */
'use strict';

angular.module('r2bis.calendar.controllers', [])

.controller('CalendarCtrl', function() {
		var data = [
			{ eventName: 'Lunch Meeting w/ Mark', calendar: 'Work', color: 'orange' },
			{ eventName: 'Interview - Jr. Web Developer', calendar: 'Work', color: 'orange' },
			{ eventName: 'Demo New App to the Board', calendar: 'Work', color: 'orange' },
			{ eventName: 'Dinner w/ Marketing', calendar: 'Work', color: 'orange' },

			{ eventName: 'Game vs Portalnd', calendar: 'Sports', color: 'blue' },
			{ eventName: 'Game vs Houston', calendar: 'Sports', color: 'blue' },
			{ eventName: 'Game vs Denver', calendar: 'Sports', color: 'blue' },
			{ eventName: 'Game vs San Degio', calendar: 'Sports', color: 'blue' },

			{ eventName: 'School Play', calendar: 'Kids', color: 'yellow' },
			{ eventName: 'Parent/Teacher Conference', calendar: 'Kids', color: 'yellow' },
			{ eventName: 'Pick up from Soccer Practice', calendar: 'Kids', color: 'yellow' },
			{ eventName: 'Ice Cream Night', calendar: 'Kids', color: 'yellow' },

			{ eventName: 'Free Tamale Night', calendar: 'Other', color: 'green' },
			{ eventName: 'Bowling Team', calendar: 'Other', color: 'green' },
			{ eventName: 'Teach Kids to Code', calendar: 'Other', color: 'green' },
			{ eventName: 'Startup Weekend', calendar: 'Other', color: 'green' }
		];
		var calendar = new Calendar('#calendar', data);
});