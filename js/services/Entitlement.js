/* global UverseNg, angular */

UverseNg.factory('Entitlement', [
    '$rootScope'

  , function($rootScope) {
    $rootScope.signedIn = false;
    $rootScope.entitlementLevel = null;

    // Pseudo-authentication
    $rootScope.authenticate = function(e, signedIn, level) {
      e.preventDefault();

      $rootScope.signedIn = signedIn;
      $rootScope.entitlementLevel = level;
    };

    var entitlement = {
      isEntitled: function(entitlements) {
        var level = $rootScope.entitlementLevel;
        // Quick check for clips
        if (!entitlements.length) return true;

        // Quick check for non-entitled
        if (!level) return false;

        for (var i = 0, len = entitlements.length; i < len; i++) {
          if (level === entitlements[i]) return true;

          var showLevelNum = this.getEntitlementNum(entitlements[i]);
          var entitlementLevelNum = this.getEntitlementNum(level);

          if (entitlementLevelNum >= showLevelNum && showLevelNum !== 0) return true;
        }

        // Last fall-through
        return false;
      }

      , getEntitlementNum: function(str) {
        return parseInt(str.replace(/[^\d]+/, ''), 10) || 0;
      }
    };

    return entitlement;
  }
]);