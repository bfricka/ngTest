/* global UverseNg */

// Define a tile controller and inject its dependencies
UverseNg.controller('TileCtrl', [
		'$scope'
	, 'TileResource'

	, function($scope, TileResource) {
		TileResource.get(function(data) {
			$scope.tiles = data;
		});
	}
]);