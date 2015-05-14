var activityApp = angular.module("activityApp", ["ngRoute","angularModalService", "ngDragDrop"]) //'ngRoute','ngResource'


.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/activityView', {
        templateUrl: 'partials/activityView.html',
        controller: 'activityController'
    }).
      when('/addActivityView', {
        templateUrl: 'partials/addActivityView.html',
        controller: 'addActivityController'
      }).
      otherwise({
        redirectTo: '/activityView'
      });
}]);
activityApp.run(function($templateCache) {
  $templateCache.put('dragula.html', '<script>dragula([parkedActivities, activitiesOfTheDay])</script>');
});
 /*

activityApp.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
      };
*/
    //"<div class='ng-modal' ng-show='show'>\n  <div class='ng-modal-overlay' ng-click='hideModal()'></div>\n  <div class='ng-modal-dialog' ng-style='dialogStyle'>\n    <span class='ng-modal-title' ng-show='dialogTitle && dialogTitle.length' ng-bind='dialogTitle'></span>\n    <div class='ng-modal-close' ng-click='hideModal()'>\n      <div ng-bind-html='closeButtonHtml'></div>\n    </div>\n    <div class='ng-modal-dialog-content' ng-transclude></div>\n  </div>\n</div>"
    //"<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"

    //template:"<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"

    //"<div class='ng-modal' ng-show='show'>\n  <div class='ng-modal-overlay' ng-click='hideModal()'></div>\n  <div class='ng-modal-dialog' ng-style='dialogStyle'>\n    <span class='ng-modal-title' ng-show='dialogTitle && dialogTitle.length' ng-bind='dialogTitle'></span>\n    <div class='ng-modal-close' ng-click='hideModal()'>\n      <div ng-bind-html='closeButtonHtml'></div>\n    </div>\n    <div class='ng-modal-dialog-content' ng-transclude></div>\n  </div>\n</div>"




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


