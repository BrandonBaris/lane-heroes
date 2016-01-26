Template.lobby.helpers({
  game: function () {
    return getCurrentGame();
  },
  // accessLink: function () {
  //   return getAccessLink();
  // },
  player: function () {
    return getCurrentPlayer();
  },
  players: function () {
    var game = getCurrentGame();
    var currentPlayer = getCurrentPlayer();

    if (!game) {
      return null;
    }

    var players = Players.find({gameID: game._id}, {'sort': {'createdAt': 1}}).fetch();

    players.forEach(function(player){
      if (player._id === currentPlayer._id){
        player.isCurrent = true;
      }
    });

    return players;
  },
  isLoading: function() {
    var game = getCurrentGame();
    return game.state === 'settingUp';
  }
});

Template.lobby.events({
  'click .btn-leave': function () {  
  var player = getCurrentPlayer();
  var game = getCurrentGame();
  console.log('game',JSON.stringify(game));
  console.log('playerid',player);
  Meteor.subscribe('games', function onReady(){
    console.log('game.players',game.players);
    var player_index = game.players.indexOf( player._id );
    var edited_players = game.players.slice( player_index, player_index + 1 );
    console.log('game.players',game.players);
    console.log('index',player_index);
    console.log('edited_players',edited_players);
    Games.update( game._id, { $pullAll: { players: edited_players }});
    console.log('Games.findOne(game._id)',Games.findOne(game._id));
    Players.update( player._id, { $set: { gameID: null }});
    Session.set("gameID", null);
    console.log('Session.get',Session.get('gameID'));
    Router.go('/');
  });
},
  'click .btn-start': function () {

    var game = getCurrentGame();
    Games.update(game._id, {$set: {state: 'settingUp'}});
  },
  'click .btn-remove-player': function (event) {
    var playerID = $(event.currentTarget).data('player-id');
    Players.remove(playerID);
  },
  'click .btn-edit-player': function (event) {
    var game = getCurrentGame();
    resetUserState();
    Session.set('currentView', 'joinGame');
  }
});

Template.lobby.created = function (event) {
  // var currentPlayer = getCurrentPlayer();
  // // var roomName = Session.get("urlAccessCode");

  // Session.set("loading", true);
  // Meteor.subscribe('games', function onReady(){
  //   Session.set("loading", false);

  //   var game = Games.findOne({
  //     roomName: roomName
  //   });

  //   if (game) {
  //     console.log('game',game);
  //     Players.update( currentPlayer._id, { $set: { gameID: game._id }});
  //     Meteor.subscribe('players', game._id);

  //     // Session.set('urlAccessCode', null);
  //     Session.set("gameID", game._id);
  //     Session.set("playerID", currentPlayer._id);
  //     // Session.set("currentView", "lobby");
  //   } else {
  //     FlashMessages.sendError('Error joining room');
  //   }
  // });
};

Template.lobby.rendered = function (event) {
  var player = getCurrentPlayer();
  console.log('player got in lobby',player);
  console.log('current gameID set', Session.get('gameID'));

  
  // var url = getAccessLink();
};