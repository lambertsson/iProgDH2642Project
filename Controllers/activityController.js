activityApp.controller("activityController", ["$scope", "$routeParams", "$location","ModalService", "ActivityModel",
  function($scope,$routeParams,$location,ModalService,ActivityModel) {
     //$scope.complexResult = null;


  $scope.showAddActivity = function() {

    ModalService.showModal({
      templateUrl: "partials/complex.html",
      controller: "ComplexController",
      inputs: {
        title: "Enter your activity information"
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
          //console.log(result.name);
        //$scope.complexResult  = "Name: " + result.name + ", age: " + result.age;
      });
    });
  };

    $scope.activities = ActivityModel.getParkedActivities();

    $scope.days = ActivityModel.getDays();

    $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
  };
    $scope.addDay  = function() {
        ActivityModel.addDay();

    };

    $scope.removeDay = function ( position ) {
         console.log(position);
        ActivityModel.removeDay(position);

      //var path = "partials/activityView.html";
      //$location.path( path ).replace();
    };
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
