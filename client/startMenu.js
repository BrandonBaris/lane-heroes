Template.startMenu.events({
  'submit #enter-name': function ( event ) {
    var playerName = event.target.playerName.value;
    if (!playerName) return false;

    var player = generateNewPlayer( playerName );
    console.log('player',player);
    Meteor.subscribe('players', player.name, function onReady(){
      Session.set("playerID", player._id);
    });
    return false;
  },
  'click #btn-new-game': function () {
    if (Session.get('loading')) return false;
    var game = generateNewGame();
    var player = getCurrentPlayer();
    console.log('player',player);
    Meteor.subscribe('games', game.accessCode);
    Session.set("loading", true);
    
    Meteor.subscribe('players', player.name, function onReady(){
      Players.update(player._id, { $set: { gameID: game._id }});
      Session.set("loading", false);
      Session.set("gameID", game._id);
      Session.set("currentView", 'lobby');
    });
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

Template.startMenu.rendered = function () {
  resetUserState();
};