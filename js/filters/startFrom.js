/* global UverseNg */

UverseNg.filter('startFrom', function(){
  return function(input, start) {
    if (input != null && typeof start === 'number') {
      return input.slice(start);
    }
  };
});