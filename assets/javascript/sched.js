$(document).ready(function(){

//Firebase link
var trainData = new Firebase('https://smoke-trails-1234.firebaseio.com/');

$('.btn').on('click', function(){

	//Input values from the form set to their respective variables
	var trainName = $("#nameInput").val().trim();
	var trainDestination = $("#destinationInput").val().trim();
	var trainTime = $("#trainTimeInput").val().trim();
	var trainFrequency = $("#frequencyInput").val().trim();

	//Object to store variable values containing the train information
	var trainSched = {
		name: trainName,
		destination: trainDestination,
		time: trainTime,
		frequency: trainFrequency
};

	//Firebase push() method to generate a new child location in Firebase for form generated information
	trainData.push(trainSched);

	//Logging information from using the push() method
	console.log(trainSched.name);
	console.log(trainSched.destination);
	console.log(trainSched.time);
	console.log(trainSched.frequency);

	//Clears the form and makes ready for additional information
	trainName = $("#nameInput").val("");
	trainDestination = $("#destinationInput").val("");
	trainTime = $("#trainTimeInput").val("");
	trainFrequency = $("#frequencyInput").val("");

	//return false to disable the browsers default refresh action
	return false;

});

//on() method listening for data changes
trainData.on("child_added", function(childSnapshot, prevChildKey){

	//logging data changes reported
	console.log(childSnapshot.val());

	//Assigning data change values to various variables
	var trainName = childSnapshot.val().name;
	var trainDestination = childSnapshot.val().destination;
	var trainTime = childSnapshot.val().time;
	var trainFrequency = childSnapshot.val().frequency;

	//Logging content of data change variables
	console.log(trainName);
	console.log(trainDestination);
	console.log(trainTime);
	console.log(trainFrequency);


	var firstTimeConverted = moment(trainTime,"H:HH").subtract(1, "years");
		console.log(firstTimeConverted);
		// Current Time
	var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("H:HH"));
		// Difference between the times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);
		// Time apart (remainder)
	var tRemainder = diffTime % trainFrequency; 
		console.log(tRemainder);
		// Minute Until Train
	var tMinutesTillTrain = trainFrequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
		// Next Train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("H:HH"));


	//Assigning moment.js format to next train time before appending to page
	trainArrival = moment(nextTrain).format("H:HH");

	//Assigning the minutes till next train to variable based om moments.js conversion 
	var minutesAway = tMinutesTillTrain;

	//Appending train information to page
	$('#trainTable > tbody').append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + trainArrival + "</td><td>" + minutesAway + "</td><tr>");

});
});