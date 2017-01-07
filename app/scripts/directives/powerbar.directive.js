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
  .module('pokedexApp')
  .directive("powerBar", ["$timeout", function ($timeout) {
    return {
        restrict: "EA",
        scope: {
            total: '=total',
            complete: '=complete',
            barClass: '@barClass'
        },
        transclude: true,
        link: function (scope, elem, attrs) {
            scope.completeLabel = attrs.completeLabel;
            scope.showPercent = (attrs.showPercent) || false;
        },
        template:
            "<div class='progress'>"+
            "<div class='progress-bar {{barClass}}' title='{{complete/total * 100 | number:0 }}%' style='width:{{complete/total * 100}}%;'>{{showPercent ? (complete/total*100) : complete | number:0}} {{completeLabel}}</div>" +
            "</div>"
    };
}])