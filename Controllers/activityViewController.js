activityApp.controller("activityController", ["$scope", "$routeParams", "$location","ModalService", "ActivityModel",
  function($scope,$routeParams,$location,ModalService,ActivityModel) {
      $scope.complexResult = null;
      $scope.showComplex = function() {

          ModalService.showModal({
              templateUrl: "partials/complex.html",
              controller: "controllers/complexController",
              inputs: {
                  title: "A More Complex Example"
              }
          }).then(function(modal) {
              modal.element.modal();
              modal.close.then(function(result) {
                  $scope.complexResult  = "Name: " + result.name + ", age: " + result.age;
              });
          });

      };

      $scope.lista = {};

      $scope.items = ActivityModel.getParkedActivities();
      //console.log("hej" + $scope.items.name);
      $scope.toggleModal = function() {
          $scope.modalShown = !$scope.modalShown;
      };
      $scope.test  = function() {alert("Clicked")};

      $scope.go = function ( path ) {
          console.log("wtf");
          //var path = "partials/activityView.html";
          $location.path( path ).replace();
      };
  }
}]);
/*
$scope.saveForm = function () {
     console.log("hej!!!!!!!!!");
    console.log($scope.activity);
  var activity=$scope.activity;

  ActivityModel.addParkedActivity(new Activity(activity.name,activity.length,activity.type,activity.description,1));
  //$location.path( path ).replace();
};
*/
    


