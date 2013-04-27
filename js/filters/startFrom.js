/* global UverseNg */

UverseNg.filter('startFrom', function(){
  return function(input, start) {
    start = +start;
    if (input != null && !isNaN(start)) {
      return input.slice(start);
    }
  };
});