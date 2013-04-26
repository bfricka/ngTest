/* global UverseNg, tiles */

// Create a service for affect (pseudo data-handler)
UverseNg.factory('TileResource', function(){
	var Resource = function(){};

	Resource.get = function() {
		return tiles;
	};

	return Resource;
});