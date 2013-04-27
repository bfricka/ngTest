angular
  .module('uverse.paginate', [])

  .constant('paginationConfig', {
      nextText       : 'Next'
    , prevText       : 'Prev'
    , directionLinks : true
  })

  .directive('pagination', [
    'paginationConfig'
    , function(paginationConfig) {
      return {
          replace     : true
        , restrict    : 'EA'
        , templateUrl : 'pagination.html'

        , scope: {
            maxSize      : '='
          , numPages     : '='
          , currentPage  : '='
          , onSelectPage : '&'
        }

        , link: function(scope, element, attrs) {

          // Setup configuration parameters
          var nextText       = setConfig('nextText')
            , prevText       = setConfig('prevText')
            , directionLinks = setConfig('directionLinks', true);

          function setConfig(prop, evaluate) {
            return angular.isDefined(attrs[prop])
              ? (evaluate ? scope.$eval(attrs[prop]) : attrs[prop])
              : paginationConfig[prop];
          }

          // Create page object used in template
          function makePage(number, text, isActive, isDisabled) {
            return {
                text     : text
              , number   : number
              , active   : isActive
              , disabled : isDisabled
            };
          }

          scope.$watch('numPages + currentPage + maxSize', function() {
            scope.pages = [];

            //set the default maxSize to numPages
            var maxSize = (scope.maxSize && scope.maxSize < scope.numPages)
              ? scope.maxSize
              : scope.numPages

              , startPage = scope.currentPage - Math.floor(maxSize / 2);

            //adjust the startPage within boundary
            if (startPage < 1)
              startPage = 1;

            if ((startPage + maxSize - 1) > scope.numPages)
              startPage = scope.numPages - maxSize + 1;

            // Add page number links
            for (var number = startPage, max = startPage + maxSize; number < max; number++) {
              var page = makePage(number, number, scope.isActive(number), false);
              scope.pages.push(page);
            }

            // Add previous & next links
            if (directionLinks) {
              var prevPage = makePage(scope.currentPage - 1, prevText, false, scope.noPrev())
                , nextPage = makePage(scope.currentPage + 1, nextText, false, scope.noNext());

              scope.pages.unshift(prevPage);
              scope.pages.push(nextPage);
            }

            if (scope.currentPage > scope.numPages)
              scope.selectPage(scope.numPages);
          });

          scope.noPrev = function() {
            return scope.currentPage === 1;
          };

          scope.noNext = function() {
            return scope.currentPage === scope.numPages;
          };

          scope.isActive = function(page) {
            return scope.currentPage === page;
          };

          scope.selectPage = function(page) {
            if ( !scope.isActive(page) && page > 0 && page <= scope.numPages) {
              scope.currentPage = page;
              scope.onSelectPage({ page: page });
            }
          };
        }
      };
    }
  ]);