activityApp.controller("activityController", ["$scope", "$routeParams", "$location", "ActivityModel",
  function($scope,$routeParams,$location,ActivityModel) {
   console.log($routeParams);
    

    $scope.items = ActivityModel.getParkedActivities(); 
    //console.log("hej" + $scope.items.name);
    $scope.test  = function() {alert("Clicked")};

    $scope.go = function ( path ) {      
      //var path = "partials/activityView.html";
      $location.path( path ).replace();
    };
    
    
}]);
/*
        // ***************************
        // Temporary, just for testing.

        var mycallback = function (returneddata, view) {
            //display search result in view
            console.log(returneddata);
        }
        //model.getForecast(mycallback, view)
        // ***************************

	 });

     }
*/
