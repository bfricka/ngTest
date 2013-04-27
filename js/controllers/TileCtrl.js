/* global UverseNg, angular */

// Define a tile controller and inject its dependencies
UverseNg.controller('TileCtrl', [
    '$scope'
  , '$timeout'
  , 'TileResource'

  , function($scope, $timeout, TileResource) {
    $scope.maxSize = 4;
    $scope.perPage = 4;
    $scope.numPages = 0;
    $scope.signedIn = false;
    $scope.currentPage = 1;
    $scope.entitlementLevel = null;

    $scope.startFrom = function() {
      return ($scope.currentPage - 1) * $scope.perPage;
    };

    var res = TileResource.get(1).then(function(data) {
      $scope.tiles = data;
    });

    res.then(function(){
      watchTiles();
    });

    $scope.tileBg = function() {
      return 'url('+this.tile.imgUrl+')';
    };

    $scope.isEntitled = function() {
      var entitlements = this.tile.entitlementLevels;

      // Quick check for clips
      if (!entitlements.length) return true;

      // Quick check for non-entitled
      if (!$scope.entitlementLevel) return false;

      for (var i = 0, len = entitlements.length; i < len; i++) {
        if ($scope.entitlementLevel === entitlements[i]) return true;

        var showLevelNum = getEntitlementNum(entitlements[i]);
        var entitlementLevelNum = getEntitlementNum($scope.entitlementLevel);

        if (entitlementLevelNum >= showLevelNum && showLevelNum !== 0) return true;
      }

      // Last fall-through
      return false;
    };

    $scope.authenticate = function(e, signedIn, level) {
      e.preventDefault();

      $scope.signedIn = signedIn;
      $scope.entitlementLevel = level;
    };

    $scope.addRandomTile = function() {
      var position = $scope.tilePosition || 0;

      var rand = parseInt((Math.random() * 10).toString().charAt(0), 10);
      var tile = angular.copy($scope.tiles)[rand];

      tile.justAdded = true;

      if (position === -1) {
        $scope.tiles.push(tile);
      } else {
        position = position < -1 ? position + 1 : position;
        $scope.tiles.splice(position, 0, tile);
      }

      $timeout(function(){
        tile.justAdded = false;
        $scope.$apply();
      }, 3000);
    };

    $scope.logIndex = function(e) {
      console.log(e, this.$index);
    };

    $scope.pageFromIsolate = function(page) {
      console.log(page);
    };

    function getEntitlementNum(str) {
      return parseInt(str.replace(/[^\d]+/, ''), 10) || 0;
    }

    function watchTiles() {
      if (!$scope.tiles) return;

      $scope.$watch(function(){
        return $scope.tiles.length;
      }, function(length){
        $scope.numPages = Math.ceil($scope.tiles.length / $scope.perPage);
      });
    }
  }
]);