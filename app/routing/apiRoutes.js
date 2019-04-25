
var path = require("path");

var friendsArray = require ("../data/friends");

module.exports =function(app){

    app.get("/api/friends", function(req,res){
        res.json(friendsArray);
    });

    app.post("/api/friends", function(req, res){
        var user1input = req.body;

        var user1responses = user1input.scores;

        var matchName="";
        var matchImage="";
        var totalDiff = 5000;

        for (var i=0; i< friendsArray.length; i++){
            var diff = 0;

            for (var j=0; j < user1responses.length; j++){
                diff += Math.abs(friendsArray[i].scores[j] - user1responses[j]);
            }

            if (diff < totalDiff) {
                totalDiff = diff;
                matchName = friendsArray[i].name;
                matchImage = friendsArray[i].photo;
            }
        }

        friendsArray.push(user1input);

        res.json({status: "OK", matchName: matchName, matchImage: matchImage});

    });

};
