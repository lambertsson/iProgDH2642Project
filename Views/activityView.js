var ActivityView = function (container,model) {

	this.addActivityBtn = container.find("#addActivityBtn");
    this.parkedActivities = container.find("#parkedActivities");


	model.addObserver(this);
	this.update=function(data){
    	try{
    	    console.log(data[0].getLength());
            console.log(data);
            console.log("tjoho", data[0].getTypeId());
            var activityList="";
    	    if(data.length > 0){
    	        for ( var i = 0; i < data.length; i++) {
       	           activityList +="<div style='display:block;'>" + data[i].getLength().value + " min   " + data[i].getName().value + "</div>";
                //alert("Found data");
    	        }

                this.parkedActivities.html(activityList);
                }
            else{
                alert("No data");
            }}
        catch(TypeError){
            //alert("TypeError");
        }
        }

    }
