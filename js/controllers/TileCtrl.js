/* global UverseNg */

// Define a tile controller and inject its dependencies
UverseNg.controller('TileCtrl', [
	'$scope'
	, 'TileResource'

	, function($scope, TileResource) {
		$scope.entitlementLevel = null;
		$scope.signedIn = false;

		var getEntitlementNum = function(str) {
			return parseInt(str.replace(/[^\d]+/, ''), 10) || 0;
		};

		TileResource.get(1).then(function(data) {
			$scope.tiles = data;
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

		$scope.authenticate = function(signedIn, level) {
			$scope.signedIn = signedIn;
			$scope.entitlementLevel = level;
		};
	}
]);