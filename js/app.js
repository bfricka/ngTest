/* global angular */

// Define the app and any global dependencies (empty in this case)
var UverseNg = angular.module('UverseApp', []);

// Make angular play nice with Moo (only affects $, not $$)
var $moo = function(element) {
  if(typeOf(element) != 'element' && element.length >= 1) {
    element = element[0];
  }
  if(element) {
    return document.id(element);
  }
};