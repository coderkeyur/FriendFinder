
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

            for (var x=0; x < user1responses.length; x++){
                diff += Math.abs(friendsArray[i].scores[x] - user1responses[x]);
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
