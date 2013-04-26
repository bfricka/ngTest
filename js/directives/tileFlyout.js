/* global UverseNg */

UverseNg.directive('flyout', function(){
	return {
		require: ['ngModel']
		, restrict: 'E'
		, replace: true
		, transclude: true
		, templateUrl: 'flyout.html'

		, link: function(scope, elem, attrs, ngModel) {

		}
	};
});