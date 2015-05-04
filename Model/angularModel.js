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
	
}

// This is a day consturctor. You can use it to create days, 
// but there is also a specific function in the Model that adds
// days to the model, so you don't need call this yourself.
function Day(startH,startM) {
//activityApp.factory('Day',function (startH,startM){

	this._start = startH * 60 + startM;
	this._activities = [];

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
	this._addActivity = function(activity,position){
		if(position != null){
			this._activities.splice(position,0,activity);
		} else {
			this._activities.push(activity);
		}
	};
	
	// removes an activity from specific position
	// this method will be called when needed from the model
	// don't call it directly
	this._removeActivity = function(position) {
		return this._activities.splice(position,1)[0];
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
	};
	
}

//################################################################################

 activityApp.factory('ActivityModel',function (){


//var Model = function() {
	
	this.days = [];
	this.parkedActivities = ["hej","jasså","okej"];
	var latitude = 59.37496119999999;
	var longitude = 17.9644922;

	this.testing = function(){
		//console.log(5);
		this.addActivity(new Activity("Idea 1",30,0,""),0);
	}

    this.getParkedActivities = function (){
    	//console.log(this.parkedActivities);
        return this.parkedActivities;

    };

	// adds a new day. if startH and startM (start hours and minutes)
	// are not provided it will set the default start of the day to 08:00
	this.addDay = function (startH,startM) {
		var day;
		if(startH){
			day = new Day(startH,startM);
		} else {
			day = new Day(8,0);
		}
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
		}		
	}
    };
	// add an activity to parked activities
	this.addParkedActivity = function(activity,position){
		this.addActivity(activity,null,position);
	};

	// remove an activity on provided position from parked activites
	this.removeParkedActivity = function(position) {
		act = this.parkedActivities.splice(position,1)[0];

		return act;
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
	this.getForecast = function (callback, view) {
	    var url = "https://api.forecast.io/forecast/0afbc2b67d065d4cab10e996eb9db58a/" + latitude + "," + longitude + "?units=si";
	    $.ajax({
	        url: url,
	        dataType: 'jsonp',
	        success: function (data) {
	            return callback(data.daily, view)
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

