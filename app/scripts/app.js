'use strict';

/**
 * @ngdoc overview
 * @name pokedexApp
 * @description
 * # pokedexApp
 *
 * Main module of the application.
 */
angular
  .module('pokedexApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  
  .config(function($stateProvider, $urlRouterProvider) {
    // 
    // For any unmatched url, redirect to /state1 
    $urlRouterProvider.otherwise("/home");
    // 
    // Now set up the states 
    $stateProvider
      .state('home', {
        url: "/home",
        templateUrl: "views/main.html",
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .state('about', {
        url: "/about",
        templateUrl: "views/about.html",
        controller: 'AboutCtrl',
        controllerAs: 'vm'
      })
  });
