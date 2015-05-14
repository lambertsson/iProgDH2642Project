activityApp.controller("activityController", ["$scope", "$routeParams", "$location","ModalService", "ActivityModel",
  function($scope,$routeParams,$location,ModalService,ActivityModel) {
      //$scope.complexResult = null;

      var forecasts = [{summary: ""}, {summary: ""}];

      this.getWeather = function () {
          var mycallback = function (returneddata, i) {
              //display search result in view
              //console.log(returneddata.data[0].summary);
              forecasts[i] = returneddata.data[0];
              console.log(forecasts[i])
          }

          // TODAY & TOMORROW
          var date = new Date(Date.now());
          for (var i = 0; i <= 1; i++) {
              date.setDate(date.getDate() + i);
              var time = date.toISOString();
              time = time.substring(0, (time.length - 5))
              ActivityModel.getForecast(mycallback, time, i)
          }
      }
      this.getWeather();

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

  $scope.weatherToday = forecasts[0].summary;

  $scope.weatherTomorrow = forecasts[1].summary;

    $scope.activities = ActivityModel.getParkedActivities();

    $scope.days = ActivityModel.getDays();

    $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
  };
    $scope.addDay  = function() {
        ActivityModel.addDay();
        };
    $scope.removeActivity = function(position) {
        ActivityModel.removeParkedActivity(position);
   
    };
/*
        // ***************************
        // Temporary, just for testing.
        

        // ***************************
        */



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
