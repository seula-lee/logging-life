var logging = angular.module('LoggingLife', []);
logging.controller('lifeScent', ['$scope', function($scope){
  $scope.exec = function(label){
    console.log(label);
  }
}]);
