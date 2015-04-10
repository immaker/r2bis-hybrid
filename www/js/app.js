// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
'use strict';

angular.module('r2bis', ['ionic', 'ngResource', 'angular-datepicker',
	'r2bis.common', 'r2bis.directive', 'r2bis.login', 'r2bis.calendar', 'r2bis.charts', 'r2bis.records', 'r2bis.works', 'r2bis.account'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

	  .state('login', {
		  url: '/login',
		  templateUrl: "templates/login.html",
		  controller: 'LoginCtrl'
	  })
  // setup an abstract state for the tabs directive
    .state('tab', {
	    url: "/tab",
	    abstract: false,
	    templateUrl: "templates/tabs.html"
    })

	  .state('tab.calendar', {
		  url: '/calendar',
		  views: {
			  'tab-calendar': {
				  templateUrl: 'templates/tab-calendar.html',
				  controller: 'CalendarController'
			  }
		  }
	  })
  // Each tab has its own nav history stack:

  .state('tab.charts', {
    url: '/charts',
    views: {
      'tab-charts': {
        templateUrl: 'templates/tab-charts.html',
        controller: 'ChartsCtrl'
      }
    }
  })

  .state('tab.charts-detail', {
	  url: '/charts/chartDetail',
	  views: {
		  'tab-charts': {
			  templateUrl: 'templates/charts-detail.html',
				controller: 'ChartsDetailCtrl'
		  }
	  }
  })
  .state('tab.records', {
	  url: '/records',
	  views: {
		  'tab-records': {
			  templateUrl: 'templates/tab-records.html',
			  controller: 'RecordsCtrl'
		  }
	  }
  })
  .state('tab.records-detail', {
	  url: '/records/recordDetail',
	  views: {
		  'tab-records': {
			  templateUrl: 'templates/records-detail.html',
			  controller: 'RecordsDetailCtrl'
		  }
	  }
  })

  //.state('tab.records-detail', {
  //  url: '/chats/:chatId',
  //  views: {
  //    'tab-records': {
  //      templateUrl: 'templates/chat-detail.html',
  //      controller: 'ChatDetailCtrl'
  //    }
  //  }
  //})

  .state('tab.works', {
		  url: '/works',
		  views: {
			  'tab-works': {
				  templateUrl: 'templates/tab-works.html',
				  controller: 'WorksCtrl'
			  }
		  }
	  })
  .state('tab.works-detail', {
	  url: '/works/workDetail',
	  views: {
		  'tab-works': {
			  templateUrl: 'templates/works-detail.html',
			  controller: 'WorksDetailCtrl'
		  }
	  }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
