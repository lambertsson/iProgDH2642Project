$(function() {
    //Initializes model,views and correcspoding controllers.
    var model = new Model();

    var activityView = new ActivityView($("#activityView"),model);
    var activityViewController = new ActivityViewController(activityView,model);

    var addActivityView = new AddActivityView($("#addActivityView"),model);
    var addActivityViewController = new AddActivityViewController(addActivityView,model);

    //Testing testing, everything below this is for testing.

    /*If we want to have the addActivityView as a popup.
    function popupwindow() {
    //center for browser use: window.innerWidth & window.innerHeight
    var left  = ($(window).width()/2)-(900/2);
    var top   = ($(window).height()/2)-(600/2);

    return window.open("","Add activity", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}
     */
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
    model.getCoordinates();

});
