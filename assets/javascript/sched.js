$(document).ready(function(){

//Firebase link
var trainData = new Firebase('https://smoke-trails-1234.firebaseio.com/');

$('.btn').on('click', function(){

	var trainName = $("#nameInput").val().trim();
	var trainDestination = $("#destinationInput").val().trim();
	var trainTime = moment($("#trainTimeInput").val().trim(), "DD/MM/YY").format("X");
	var trainFrequency = $("#frequencyInput").val().trim();

var trainSched = {
	name: trainName,
	destination: trainDestination,
	time: trainTime,
	frequency: trainFrequency
};

	trainData.push(trainSched);

	console.log(trainSched.name);
	console.log(trainSched.destination);
	console.log(trainSched.time);
	console.log(trainSched.frequency);

	trainName = $("#nameInput").val("");
	trainDestination = $("#destinationInput").val("");
	trainTime = $("#trainTimeInput").val("");
	trainFrequency = $("#frequencyInput").val("");

	return false;

});



trainData.on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	var trainName = childSnapshot.val().name;
	var trainDestination = childSnapshot.val().destination;
	var trainTime = childSnapshot.val().time;
	var trainFrequency = childSnapshot.val().frequency;

	console.log(trainName);
	console.log(trainDestination);
	console.log(trainTime);
	console.log(trainFrequency);

	trainArrival = moment(trainTime).format("hh:mm A");

	//var trainArrival = "10:00 PM";

	var minutesAway = 100;

	$('#trainTable > tbody').append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + trainArrival + "</td><td>" + minutesAway + "</td><tr>");

});
});