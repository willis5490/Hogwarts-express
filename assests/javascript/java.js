var config = {
    apiKey: "AIzaSyDP7F35QtDcZK7hdfoVgefKbt_XbaI7xcM",
    authDomain: "hogwarts-train-schedule-e47fa.firebaseapp.com",
    databaseURL: "https://hogwarts-train-schedule-e47fa.firebaseio.com",
    projectId: "hogwarts-train-schedule-e47fa",
    storageBucket: "hogwarts-train-schedule-e47fa.appspot.com",
    messagingSenderId: "905511749090"
  };
  firebase.initializeApp(config);
  var database = firebase.database();


  //create variables
  var tname = "";
  var freq = "";
  var tdestination = "";
  var arrival = "";
  var minway = "";


//make event handeler to add rows into train table and to push data to firebase
  $("#mybutton").on("click", function(event){
    var tname = $("#Tname").val().trim();
    var tdestination = $("#desti1").val().trim();
    var freq = $("#firstT").val().trim();
    var arrival = $("#Ttime").val().trim();
    //add minutes away

    var myobject = {
      Trainname: tname,
      Destination: tdestination,
      Frequency: freq,
      ArrivalTime : arrival
    };

    database.ref().push(myobject);

    console.log(tname);
    console.log(tdestination);
    console.log(freq);
    console.log(arrival);

    $("#Tname").val("");
    $("#desti1").val("");
    $("#firstT").val("");
    $("#Ttime").val("");


  })

  //allow firebase to be able to interact with my page
  database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());
    
    var tname = childSnapshot.val().Trainname;
    var tdestination = childSnapshot.val().Destination;
    var freq = childSnapshot.val().Frequency;
    var arrival = childSnapshot.val().ArrivalTime;
    


    var firstTimeConverted = moment(arrival, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % freq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    console.log(tname);
    console.log(tdestination);
    console.log(freq);
    console.log(arrival);

  //append new rows to my table
  
    var newRow = $("<tr>").append(
      $("<td>").text(tname),
      $("<td>").text(tdestination),
      $("<td>").text(freq),
      $("<td>").text(arrival),
      $("<td>").text(tMinutesTillTrain)
    );

    $("#Tbody").append(newRow); 
    console.log(newRow)
  });