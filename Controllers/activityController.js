activityApp.controller("activityController", ["$scope", "$routeParams", "$location", "ModalService", "ActivityModel",
  function ($scope, $routeParams, $location, ModalService, ActivityModel) {
      //$scope.complexResult = null;

      var forecasts = ["", ""];

      $scope.getWeather = function () {
          var mycallback = function (returneddata, i) {
              //display search result in view
              //console.log(returneddata.data[0].summary);
              //console.log(forecasts[i].summary)
              var maxTemp = Math.round(returneddata.data[0].apparentTemperatureMax);
              var minTemp = Math.round(returneddata.data[0].apparentTemperatureMin);
              var icon = returneddata.data[0].icon;
              forecasts[i] = maxTemp + "\xB0" + "C / " + minTemp + "\xB0" + "C"
              //console.log(forecasts[i])
          }

          // TODAY & TOMORROW
          var date = new Date(Date.now());
          for (var i = 0; i <= 1; i++) {
              date.setDate(date.getDate() + i);
              var time = date.toISOString();
              time = time.substring(0, (time.length - 5))
              ActivityModel.getForecast(mycallback, time, i)
          }
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

      $scope.activities = ActivityModel.getParkedActivities();

      $scope.days = ActivityModel.getDays();

      $scope.toggleModal = function () {
          $scope.modalShown = !$scope.modalShown;
      };
      $scope.addDay = function () {
          ActivityModel.addDay();
      };
      $scope.removeActivity = function (position) {
          ActivityModel.removeParkedActivity(position);
      };
  }]);