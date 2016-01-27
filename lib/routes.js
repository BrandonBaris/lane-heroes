Router.route('/', function () {
  this.render('main');
  Session.set('gameID', null);
  Session.set("currentView", "startMenu");
});

Router.route('/:gameID', function () {
  var player = getCurrentPlayer();
  var gameID = this.params.gameID;
  this.render('main');
  Session.set("gameID", gameID);
  Session.set("currentView", "lobby");
  Meteor.subscribe('games', function onReady(){
    var game = Games.findOne( Session.get("gameID") );
    Games.update({ _id: game._id }, { $push: { players: player._id }});
    console.log('got an existing game',game);
    Meteor.subscribe('players', function onReady(){
      Players.update(player._id, { $set: { gameID: game._id }});
    });
  });
});