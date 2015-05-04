activityApp.controller("addActivityController", function($scope,ActivityModel) {
    
    //if (ActivityModel.getParkedActivities.lengt{ }
         
    //$scope.items = ActivityModel.getParkedActivities(); 
    //$scope.items = ActivityModel.testing();

    //ActivityModel.addActivity(new Activity("ABO BO BO",10,0,""),0);
      //$scope.items = ActivityModel.getParkedActivities();
      //$scope.hello = myInjectedFactory.hello();
});


/*
var AddActivityViewController = function(view,model){

    $("#saveBtn").on('click', function(){
        //Stores input values in valueArray[name : 0, length : 1, description : 2]
        var valueArray = $('form').serializeArray();

        var valueType = $("#activityType").val();

        //Createas a day and a new activity.
        model.addDay();
        model.addParkedActivity(new Activity(valueArray[0],valueArray[1],valueType,valueArray[2]),1);

        $("#addActivityView").hide();
        $("#activityView").show();
    });
    $("#cancelBtn").on('click', function(){
        $("#addActivityView").hide();
        $("#activityView").show();
    }); 
}
*/