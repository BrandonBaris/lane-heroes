Template.startMenu.events({
  'submit #enter-name': function ( event ) {
    var playerName = event.target.playerName.value;
    if (!playerName) return false;

    function createPlayer( playerName ) {
      var new_player = {
        gameID: null,
        name: playerName
      };
      var playerID = Players.insert(new_player);
      console.log('player',playerID);
      return Players.findOne(playerID);
    };
    var player = createPlayer( playerName );
    Meteor.subscribe('players', player.name, function onReady(){
      Session.set("playerID", player._id);
    });
    return false;
  },
  'click #btn-new-game': function () {
    function generateRoomName() {
      var new_code = "";
      var possible = "abcdefghijklmnopqrstuvwxyz";

      for(var i=0; i < 4; i++){
        new_code += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return new_code;
    };

    function createGame() {
      var new_game = {
        roomName: generateRoomName(),
        state: "waitingForPlayers",
        gameLength: 3,
        endTime: null,
        players: [],
        position: []
      };

      var gameID = Games.insert(new_game);
      new_game = Games.findOne(gameID);

      return new_game;
    };

    var game = createGame();
    var player = getCurrentPlayer();
    Meteor.subscribe('games', game.accessCode, function onReady(){  
      // console.log('JSON.stringify(game)',JSON.stringify(game));
      // var test = game.players.push( player)
      Games.update({ _id: game._id}, { $push: { players: player._id }});
      Meteor.subscribe('players', player.name, function onReady(){
        Players.update( player._id, { $set: { gameID: game._id }});
        Session.set("gameID", game._id);
        Session.set("currentView", 'lobby');
      });
    });
    return false;
  },
  'click #btn-join-game': function () {
    Meteor.subscribe('games', function onReady(){
      Session.set("currentView", "joinGame");
    });
  }
});

Template.startMenu.helpers({
  player: function() {
    return getCurrentPlayer();
  }
});

Template.startMenu.rendered = function () {
  // resetUserState();
};