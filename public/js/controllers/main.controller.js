app.controller('MainCtrl', function($scope, $http, $q, $timeout, $mdDialog, FourSquareService, UtilsService) {
  var vm = this;
  var timeoutV;
  vm.offset = 0;
  vm.loadingMore = false;
  vm.allLoaded = false;
  vm.previousSearch = { search: null, what: null};
  $scope.tiles = [];
  $scope.searchQuery;
  $scope.searchWhatQuery;
  $scope.modalData;
  $scope.tips = [];
  $scope.initialized = false;

  var mainContent = document.querySelector('#content-scroller');

  $scope.$watch("searchQuery", function() {
    $timeout.cancel(timeoutV);
    timeoutV = $timeout(function(){
      if(vm.previousSearch.search !== $scope.searchQuery && $scope.searchQuery){
          vm.loadMoreTiles(true);
      }
    }, 1000); //lets wait if the input gets larger
  }, true);

  $scope.$watch("searchWhatQuery", function() {
    $timeout.cancel(timeoutV);
    timeoutV = $timeout(function(){
        if(vm.previousSearch.what !== $scope.searchWhatQuery && $scope.searchWhatQuery){
          vm.loadMoreTiles(true);
        }
    }, 1000); //lets wait if the input gets larger
  }, true);

  vm.loadMoreTiles = function(newSearch) {
    if(vm.loadingMore || vm.allLoaded){
      return;
    }
    if($scope.searchQuery && newSearch){
      vm.offset = 0;
    }
    vm.loadingMore = true;
    return FourSquareService.explore(vm.offset, $scope.searchQuery, $scope.searchWhatQuery).then(function(tiles){
      vm.previousSearch = {search: $scope.searchQuery, what: $scope.searchWhatQuery};
      //all good
      $scope.tiles = (newSearch) ? tiles : $scope.tiles.concat(tiles);
      vm.loadingMore = false;
      vm.offset += 20;
      vm.allLoaded = (tiles < 20) ? true : false;
    }, function(){
      // meh error somewhere
      $scope.tiles = [];
      vm.loadingMore = false;
    });
  };

  $scope.showAdvanced = function(ev, modalData) {
      $scope.modalData = modalData;

      FourSquareService.tips(modalData.venue.id).then(function(tips){
        $scope.tips = tips;
      }, function(){
        //meh
        $scope.tips = []
      });

      //No need to wait the tips request to pop dialog
      $mdDialog.show({
        scope: $scope.$new(),
        templateUrl: 'venue.modal.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: false
      })
  };

  // load first tiles based on IP location
  UtilsService.getLocalizationByIP().then(vm.loadMoreTiles).then(function(){
    mainContent.style.display = "";
    $scope.initialized = true;
  });
});
