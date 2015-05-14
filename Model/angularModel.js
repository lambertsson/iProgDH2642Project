// JavaScript Document
function Activity(name,length,typeid,description){
//activityApp.factory('Activity',function (name,length,typeid,description){
	var ActivityType = ["Presentation","Group Work","Discussion","Break"];
	var _name = name;
	var _length = length;
	var _typeid = typeid;
	var _description = description;

	// sets the name of the activity
	this.setName = function(name) {
		_name = name;

	}

	// get the name of the activity
	this.getName = function(name) {
		return _name;
	}
	
	// sets the length of the activity
	this.setLength = function(length) {
		_length = length;

	}

	// get the name of the activity
	this.getLength = function() {
		return _length;
	}
	
	// sets the typeid of the activity
	this.setTypeId = function(typeid) {
		_typeid = typeid;

	}

	// get the type id of the activity
	this.getTypeId = function() {
		return _typeid;
	}
	
	// sets the description of the activity
	this.setDescription = function(description) {
		_description = description;

	}

	// get the description of the activity
	this.getDescription = function() {
		return _description;
	}
	
	// This method returns the string representation of the
	// activity type.
	this.getType = function () {
		return ActivityType[_typeid];
	};

    // Get object in string to store on firebase.
	this.getAsJSON = function () {
	    console.log("Returned the following JSON: " + { name: _name, length: _length, typeid: _typeid, description: _description })
	    return { name: _name, length: _length, typeid: _typeid, description: _description };
	}
	
}

// This is a day consturctor. You can use it to create days, 
// but there is also a specific function in the Model that adds
// days to the model, so you don't need call this yourself.
function Day(startH,startM,dayId) {
//activityApp.factory('Day',function (startH,startM){

    this.firebase = new Firebase('https://agenda-planner.firebaseio.com/');
	this._start = startH * 60 + startM;
	this._activities = [];
	this._index = 0;

	this.getActivities = function () {
	    return this._activities;
	}

    // sets the index of the day
	this.setIndex = function (index) {
	    _index = index;
	}

	// sets the start time to new value
	this.setStart = function(startH,startM) {
		this._start = startH * 60 + startM;

	}

	// returns the total length of the acitivities in 
	// a day in minutes
	this.getTotalLength = function () {
		var totalLength = 0;
		$.each(this._activities,function(index,activity){
			totalLength += activity.getLength();
		});
		return totalLength;
	};
	
	// returns the string representation Hours:Minutes of 
	// the end time of the day
	this.getEnd = function() {
		var end = this._start + this.getTotalLength();
		return Math.floor(end/60) + ":" + end % 60;
	};
	
	// returns the string representation Hours:Minutes of 
	// the start time of the day
	this.getStart = function() {
		return Math.floor(this._start/60) + ":" + this._start % 60;
	};
	
	// returns the length (in minutes) of activities of certain type
	this.getLengthByType = function (typeid) {
		var length = 0;
		$.each(this._activities,function(index,activity){
			if(activity.getTypeId() == typeid){
				length += activity.getLength();
			}
		});
		return length;
	}
	// adds an activity to specific position
	// if the position is not provided then it will add it to the 
	// end of the list
	this._addActivity = function (activity, position) {
		if(position != null){
			this._activities.splice(position,0,activity);
		} else {
		    this._activities.push(activity);
		}
		this._updateActivites();
	};
	
	// removes an activity from specific position
	// this method will be called when needed from the model
	// don't call it directly
	this._removeActivity = function(position) {
	    return this._activities.splice(position, 1)[0];
	    this._updateActivites();
	};
	
	// moves activity inside one day
	// this method will be called when needed from the model
	// don't call it directly
	this._moveActivity = function(oldposition,newposition) {
		// In case new position is greater than the old position and we are not moving
		// to the last position of the array
		if(newposition > oldposition && newposition < this._activities.length - 1) {
			newposition--;
		}
		var activity = this._removeActivity(oldposition);
		this._addActivity(activity, newposition);
		this._updateActivites();
	};

    // Firebase, firebase, does whatever a firebase does.
	this._updateActivites = function () {
	    var activitiesJSON = [];
	    for (var i = 0; i < this._activities.length; i++) {
	        activitiesJSON.push(this._activities[i].getAsJSON())
	    }
	    this.firebase.set({
	        day: this._index,
	        activities: activitiesJSON
	    })
	}
	
}

//################################################################################

 activityApp.factory('ActivityModel',function (){


//var Model = function() {
	
    this.firebase = new Firebase('https://agenda-planner.firebaseio.com/');
	this.days = [];
	this.parkedActivities = [];
	var latitude = 59.37496119999999;
	var longitude = 17.9644922;

	this.testing = function () {
	    //console.log(5);
	    //this.addActivity(new Activity("Idea 1",30,0,""),0);
	    this.firebase.update({
	        day: 1,
	        activities: [{ name: "Meeting", length: 5, typeid: 1, description: "Very important!" }, { name: "Meeting 2", length: 10, typeid: 2, description: "Not very important..." }]
	    })
	    this.firebase.update({
	        day: 2,
	        activities: [{ name: "Meeting 3", length: 15, typeid: 3, description: "Very importantez ueno si!" }, { name: "Meeting 4", length: 20, typeid: 1, description: "Not very important... =(" }]
	    })
	    this.firebase.update({
	        day: 2,
	        activities: [{ name: "Meeting 54", length: 5, typeid: 1, description: "Very important!" }, { name: "Meeting 222", length: 10, typeid: 2, description: "Not very important..." }]
	    })
	}
	//this.testing();

    // Load day and activity data from firebase.
	this.loadFirebase = function () {

	}
	//this.loadFirebase();    // Call it right away!

    this.getParkedActivities = function (){
    	//console.log(this.parkedActivities);
        return this.parkedActivities;

    };
    this.getDays = function (){
    	//console.log(this.parkedActivities);
        return this.days;

    };
    this.removeDay = function (position){
        this.days.splice(position, 1)[0];

        /*
        // Firebase removes by updating with empty activites
        this.firebase.set({
            day: (position + 1),
            activities: []
        })
        */
    }

	// adds a new day. if startH and startM (start hours and minutes)
	// are not provided it will set the default start of the day to 08:00
	this.addDay = function (startH,startM) {
		var day;
		if(startH){
			day = new Day(startH,startM, this.days.length);
		} else {
			day = new Day(8,0, this.days.length);
		}

		day.setIndex(this.days.length) // Used by firebase
		this.days.push(day);

		return day;
	};

	// add an activity to model
	this.addActivity = function (activity,day,position) {
		if(day != null) {
			this.days[day]._addActivity(activity,position); }
        else {
			if (position != null) {

				this.parkedActivities.splice(position,0,activity); }
			else {this.parkedActivities.push(activity);
				//console.log("hej!!!!!! " + activity.getName());
		}		
	}
    };
	// add an activity to parked activities
	this.addParkedActivity = function(activity,position){
		this.addActivity(activity,null,position);
	};

	// remove an activity on provided position from parked activites
	this.removeParkedActivity = function (position) {
	    var activity = this.parkedActivities[position];
		this.parkedActivities.splice(position,1);
		return activity;
	};

	// moves activity between the days, or day and parked activities.
	// to park activity you need to set the new day to null
	// to move a parked activity to let's say day 0 you set oldday to null
	// and new day to 0
	this.moveActivity = function(oldday, oldposition, newday, newposition) {
		if(oldday !== null && oldday == newday) {
			this.days[oldday]._moveActivity(oldposition,newposition);
		}else if(oldday == null && newday == null) {
			var activity = this.removeParkedActivity(oldposition);
			this.addParkedActivity(activity,newposition);
		}else if(oldday == null) {
			var activity = this.removeParkedActivity(oldposition);
			this.days[newday]._addActivity(activity,newposition);
		}else if(newday == null) {
			var activity = this.days[oldday]._removeActivity(oldposition);
			this.addParkedActivity(activity,newposition);
		} else {
			var activity = this.days[oldday]._removeActivity(oldposition);
			this.days[newday]._addActivity(activity,newposition);
		}

	};

    // Get a forecast
	this.getForecast = function (callback, time, i) {
	    var url = "https://api.forecast.io/forecast/0afbc2b67d065d4cab10e996eb9db58a/" + latitude + "," + longitude + "," + time + "?units=si";
	    $.ajax({
	        url: url,
	        dataType: 'jsonp',
	        success: function (data) {
	            return callback(data.daily, i)
	        }
	    });
	};

	this.getCoordinates = function () {
	    function success(position) {
	        latitude = position.coords.latitude;
	        longitude = posi<br>tion.coords.longitude;
	    }

	    function error(msg) {
            // Maybe you want to tell the user somewhere that the weather is not local?
        }

	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(success, error);
	    } else {
	        error('not supported');
	    }
        }
        
return this;
        });



// The possible activity types


// This is an activity constructor
// When you want to create a new activity you just call
// var act = new Activity("some activity",20,1,"Some description);



// this is our main module that contians days and praked activites



//If we want to have the addActivityView as a popup.


// this is the instance of our main model
// this is what you should use in your application



// you can use this method to create some test data and test your implementation

