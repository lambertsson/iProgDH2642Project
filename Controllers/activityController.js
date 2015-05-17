activityApp.controller("activityController", ["$scope", "$routeParams", "$location", "ModalService", "ActivityModel",
  function ($scope, $routeParams, $location, ModalService, ActivityModel) {
      //$scope.complexResult = null;

      var forecasts = ["", ""];

      $scope.lista = [];

      $scope.newpos;
      $scope.newieday;

      $scope.storeOld = function (event, ui, oldieday, oldpos) {
        $scope.oldpos = oldpos;
        $scope.oldieday = oldieday;
      }

      //need to pass event and ui due to DragNDrop library reasons.
      $scope.storeNewDay = function (event, ui, newieday, index) {
        console.log("event: ", event);
        console.log("ui: ", ui);
        console.log('newieday: ', newieday);
        console.log('index: ', index);

        //$scope.newieday = newieday;


        //replace 0 below with the new day. 
        console.log("New day",newieday);
        $scope.moveActivity($scope.oldieday, $scope.oldpos, index, 0);
      }


      // Called by the html to start getting the weather data.
      $scope.getWeather = function () {

          // Callback function called once the https request to the API gets a JSON as result.
          var mycallback = function (returneddata, i) {
              var maxTemp = Math.round(returneddata.data[0].apparentTemperatureMax);
              var minTemp = Math.round(returneddata.data[0].apparentTemperatureMin);
              //var icon = returneddata.data[0].icon;
              forecasts[i] = maxTemp + "\xB0" + "C / " + minTemp + "\xB0" + "C"
          }

          // This loop gets today and tomorrow.
          var date = new Date(Date.now());
          for (var i = 0; i <= 1; i++) {
              date.setDate(date.getDate() + i);
              var time = date.toISOString();
              time = time.substring(0, (time.length - 5))
              ActivityModel.getForecast(mycallback, time, i)
          }

          // Used to set the view - but has to do it twice! Weird...
          $scope.weatherToday = forecasts[0];
          $scope.weatherTomorrow = forecasts[1];
      }

      $scope.showAddActivity = function () {
          ModalService.showModal({
              templateUrl: "partials/complex.html",
              controller: "ComplexController",
              inputs: {
                  title: "Enter your activity information"
              }
          }).then(function (modal) {
              modal.element.modal();
              modal.close.then(function (result) {
                  //console.log(result.name);
                  //$scope.complexResult  = "Name: " + result.name + ", age: " + result.age;
              });
          });
      };

      $scope.parkedActivities = ActivityModel.getParkedActivities();
      $scope.dayActivities = function (dayIndex) {
          var days = ActivityModel.getDays();
          return days[dayIndex].getActivities();
      };

      $scope.dayActivitiesLength = function (dayIndex) {
          var activities = $scope.dayActivities(dayIndex);
          return activities.length;
      }

      $scope.days = ActivityModel.getDays();

      $scope.setStartTime = function(){
        console.log("hej");
        $scope.mytime1 = new Date();
      }
      

      $scope.toggleModal = function () {
          $scope.modalShown = !$scope.modalShown;
      };
      
      $scope.addDay = function () {
          ActivityModel.addDay();
      };

      // Because our current model only supports five days.
      $scope.hideButton = function () {
          if($scope.days.length == 5)
              $('#addDayBtn').css("visibility", "hidden")
          else
              $('#addDayBtn').css("visibility", "visible")
      }

      // Make things refresh, because we need to iron out a few bugs...
      $scope.refresh = function (time) {
          setTimeout(function () {
              $scope.$apply()
              $scope.weatherToday = forecasts[0];
              $scope.weatherTomorrow = forecasts[1];
          }, time)
      }

      $scope.removeDay = function (dayIndex) {
          ActivityModel.removeDay(dayIndex);
      };

      $scope.removeParkedActivity = function (position) {
          ActivityModel.removeParkedActivity(position);
      };

      /*
      $scope.removeActivity = function (position, activity) {
          ActivityModel.removeActivity(position);
      };
      */

      $scope.moveActivity = function (oldday, oldposition, newday, newposition) {
          ActivityModel.moveActivity(oldday, oldposition, newday, newposition)
}

  }]);