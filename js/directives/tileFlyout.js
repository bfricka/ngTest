/* global UverseNg */

UverseNg.directive('tileFlyout', function(){
	return {
		require: ['ngModel']
		, transclude: true
		, templateUrl: 'tileFlyout.html'

		, link: function(scope, elem, attrs, ngModel) {

		}
	};
});