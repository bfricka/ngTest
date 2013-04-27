/* global UverseNg, $moo */

UverseNg.directive('flyout', function(){
  return {
    require: ['ngModel']
    , restrict: 'E'
    , replace: true
    , transclude: true
    , templateUrl: 'flyout.html'
  };
});