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
  });