Template.joinGame.events({
  'click .btn-back': function () {
    Session.set("currentView", "startMenu");
    return false;
  }
});

Template.joinGame.helpers({
  games: function () {
    var games = Games.find().fetch();    
    var filteredGames = games
    .filter( function( game ){
      return game.state == 'waitingForPlayers';
    })
    .filter( function( game ){
      return game.players.length != 2;
    });

    return filteredGames;
  },
  player: function() {
    return getCurrentPlayer();
  }
});

Template.joinGame.rendered = function (event) {};