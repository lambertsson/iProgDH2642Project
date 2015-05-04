activityApp.controller("activityController", function($scope,ActivityModel) {
    //alert(model.days);
    //if (ActivityModel.getParkedActivities.lengt{ }
    //console.log(ActivityModel.getParkedActivities.length);
    alert("hej");
      $scope.test  = function() {alert("Clicked")};

    $scope.go = function ( path ) {
      $location.path( path );
    };
    

    //$scope.items = ActivityModel.getParkedActivities(); 
    //$scope.items = ActivityModel.testing();

    //ActivityModel.addActivity(new Activity("ABO BO BO",10,0,""),0);
      //$scope.items = ActivityModel.getParkedActivities();
      //$scope.hello = myInjectedFactory.hello();
});

/*var ActivityViewController = function(view, model ) {
    $("#addActivityBtn").on('click', function(){
        
		$("#addActivityView").fadeIn(300);

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
