var friends = require('../data/friends.js');

module.exports = function(app){

  // API GET Requests
  app.get('/api/friends', function(req, res){
    res.json(friends);
  });


  // user submits a form and it submits data to the server.
  app.post('/api/friends', function(req, res){

  	// This code will respond to a user's survey input
    // and compare those results against every user in the database.
    // It calculates the difference between each of the numbers and the user"s numbers.
    // It chooses the user with the least differences as the "best friend match."
    // In case of multiple users with the same result it will choose the first match.
    // After the test, it will push the user to the database.

    // The object to hold the "best match". We will constantly update it as we
    // loop through all of the options
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };

    // Here we take the result of the user"s survey POST and parse it.
    var userData = req.body;
    var userScores = userData.scores;

    // This variable will store the difference between the user"s scores and the scores of
    // each user in the database
    var totalDifference = 0;

    // Loop through all the friend possibilities in the database.
    for (var i = 0; i < friends.length; i++) {

      console.log(friends[i].name);
      totalDifference = 0;

      //  Loop through all the scores of each friend
      for (var j = 0; j < friends[i].scores[j]; j++) {

        // Calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

        // Evaluates the sum of differences is less then the differences of the current "best match"
        if (totalDifference <= bestMatch.friendDifference) {

          // Reset the bestMatch.
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.friendDifference = totalDifference;
        }
      }
    }

    //  Save the user's data to the database 
    friends.push(userData);

    // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
    res.json(bestMatch);

  });

};
