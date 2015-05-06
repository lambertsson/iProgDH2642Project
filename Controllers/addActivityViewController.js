activityApp.controller("addActivityController",["$scope", "$routeParams", "$location", "ActivityModel",
 function($scope,$routeParams,$location,ActivityModel) {   

    $scope.saveForm = function ( path ) {   
        //console.log($scope.activity);   
      var activity=$scope.activity;      
      ActivityModel.addParkedActivity(new Activity(activity.name,activity.length,activity.type,activity.description,1));
      $location.path( path ).replace();
    };

     $scope.exit = function ( path ) {   
      $location.path( path ).replace();
    };

  
}]);

