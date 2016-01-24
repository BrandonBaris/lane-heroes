function cleanUpGamesAndPlayers(){
  var cutOff = moment().subtract(2, 'hours').toDate().getTime();

  var numGamesRemoved = Games.remove({
    createdAt: {$lt: cutOff}
  });

  var numPlayersRemoved = Players.remove({
    createdAt: {$lt: cutOff}
  });
}

Meteor.startup(function () {
  // Delete all games and players at startup
  Games.remove({});
  Players.remove({});
});

var MyCron = new Cron(60000);

MyCron.addJob(5, cleanUpGamesAndPlayers);

Meteor.publish('games', function() {
  return Games.find();
});

Meteor.publish('players', function() {
  return Players.find();
});

// Meteor.publish('players', function(gameID) {
//   return Players.find({"gameID": gameID});
// });

Games.find({"state": 'settingUp'}).observeChanges({
  added: function (id, game) {
    var players = Players.find({gameID: id});
    var gameEndTime = moment().add(game.lengthInMinutes, 'minutes').valueOf();

    var spyIndex = Math.floor(Math.random() * players.count());
    var firstPlayerIndex = Math.floor(Math.random() * players.count());

    players.forEach(function(player, index){
      Players.update(player._id, {$set: {
        // isSpy: index === spyIndex,
        isFirstPlayer: index === firstPlayerIndex
      }});
    });

    Games.update(id, {$set: {state: 'inProgress', endTime: gameEndTime, paused: false, pausedTime: null}});
  }
});