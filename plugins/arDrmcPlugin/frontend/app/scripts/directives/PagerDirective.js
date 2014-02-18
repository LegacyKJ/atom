'use strict';

module.exports = function (ATOM_CONFIG) {
  return {
    restrict: 'A',
    templateUrl: ATOM_CONFIG.viewsPath + '/partials/pager.html',
    scope: {
      collection: '@'
    },
    link: function ($scope, element, attrs) {
      // once data specified in "collection" attribute is loaded, set paging vars
      $scope.$watch(attrs.collection, function () {

        $scope.collectionItems = {}; // eval('$scope.' + attrs.collection);
        console.log($scope.collectionItems);
        $scope.collection = attrs.collection;

        // page directives (above and below a results hitlist,
        // for example
        if (typeof $scope.$parent.page === 'undefined') {
          $scope.$parent.page = {};
        }

        $scope.$parent.page[$scope.collection] = 0;

        var updatePagingVars = function () {
          $scope.numberOfItems = $scope.collectionItems.length;
          $scope.numberOfPages = Math.ceil($scope.numberOfItems / 5);
          $scope.showPrev = $scope.$parent.page[$scope.collection] > 0;
          $scope.showNext = $scope.$parent.page[$scope.collection] < ($scope.numberOfPages - 1);
        };

        $scope.prev = function () {
          if ($scope.$parent.page[$scope.collection] > 0) {
            $scope.$parent.page[$scope.collection] -= 1;
            updatePagingVars();
          }
        };

        $scope.next = function () {
          console.log('NEXTTTT');
          if ($scope.$parent.page[$scope.collection] < ($scope.numberOfPages - 1)) {
            $scope.$parent.page[$scope.collection] += 1;
            updatePagingVars();
          }
        };

        updatePagingVars();

      }, true);
    }
  };
};