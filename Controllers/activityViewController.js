var ActivityViewController = function(view, model ) {
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