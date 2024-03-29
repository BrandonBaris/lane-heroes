Template.startMenu.events({
  'submit #enter-name': function ( event ) {
    var playerName = event.target.playerName.value;
    if (!playerName) return false;

    // Could use a Mongo collection model here instead.
    function createPlayer( playerName ) {
      var new_player = {
        gameID: null,
        name: playerName
      };
      var playerID = Players.insert(new_player);
      return Players.findOne(playerID);
    };

    var player = createPlayer( playerName );
    Session.set("playerID", player._id);
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
      return Games.findOne(gameID);
    };

    var game = createGame();
    Router.go('/' + game._id);
    return false;
  },
  'click #btn-join-game': function () {
    Session.set("currentView", "joinGame");
  }
});

Template.startMenu.helpers({
  player: function() {
    return getCurrentPlayer();
  }
});

Template.startMenu.rendered = function () {};