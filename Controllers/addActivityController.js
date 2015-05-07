activityApp.controller("addActivityController",["$scope", "$routeParams", "$location", "ActivityModel",
 function($scope,$routeParams,$location,ActivityModel) {



    $scope.submit = function (activity) {
        if(activity){
      ActivityModel.addParkedActivity(new Activity(activity.name,activity.length,activity.type,activity.description,1));

      }
      //$location.path( path ).replace();
    };


     $scope.exit = function () {
         alert("hej");


    };

  
}]);

