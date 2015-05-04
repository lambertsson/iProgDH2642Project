var activityApp = angular.module("mainApp", ["ngRoute"]) //'ngRoute','ngResource'
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/activityView', {
        templateUrl: 'activityView.html',
        controller: 'activityController'
    }).
      when('/addActivityView', {
        templateUrl: 'addActivityView.html',
        controller: 'addActivityController'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);

    //More testing
 


    function createTestData(){

	model.addDay();
	model.addActivity(new Activity("ABO BO BO",10,0,""),0);
	model.addActivity(new Activity("Idea 1",30,0,""),0);
	model.addActivity(new Activity("Working in groups",35,1,""),0);
	model.addActivity(new Activity("Idea 1 discussion",20,2,""),0);
	model.addActivity(new Activity("Coffee break",10,3,""),0);



	console.log("Day Start: " + model.days[0].getStart());
	console.log("Day End: " + model.days[0].getEnd());
	console.log("Day Length: " + model.days[0].getTotalLength() + " min!!!!!");
	console.log(ActivityType[1]);
	$.each(ActivityType,function(index,type){
		console.log("Day '" + ActivityType[index] + "' Length: " +  model.days[0].getLengthByType(index) + " min");
	});
}
    //createTestData();


    // Try to get the coordinates of the user.
    //model.getCoordinates();


