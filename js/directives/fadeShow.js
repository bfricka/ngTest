/* global UverseNg, $moo */

UverseNg.directive('fadeShow', function(){
  return function(scope, elem, attrs) {
    elem = $moo(elem);

    // Setup tween
    var getTween = function() {
      return new Fx.Tween(elem, {
        duration: scope.$eval(attrs.duration) || 400
        , transition: scope.$eval(attrs.transition) || 'Quad'
        , property: 'opacity'
      });
    };


    var show = function(direction, initial) {
      var tween = getTween();

      if (initial) tween.options.duration = 0;

      switch (direction) {
        case true:
          elem.setStyles({
              'opacity': 0
            , 'display': 'block'
          });

          tween.start(1);
          break;
        case false:
          tween
            .start(0)
            .chain(function(){
              elem.setStyle('display', 'none');
            });
          break;
      }
    };

    // Don't animate initial state
    show(!!scope.$eval(attrs.fadeShow), true);

    scope.$watch(function(){
      return !!scope.$eval(attrs.fadeShow);
    }, function(value) {
      show(value, false);
    });
  };
});