/* global UverseNg, tiles */

// Create a service for affect (pseudo data-handler)
UverseNg.factory('TileResource', [
    '$q'
  , '$timeout'

  , function($q, $timeout){
    var TileResource = function(){};

    TileResource.get = function(delay) {
      var mockResource = $q.defer();

      $timeout(function(){
        mockResource.resolve(tiles);
      }, delay || 500);

      return mockResource.promise;
    };

    return TileResource;
  }
]);