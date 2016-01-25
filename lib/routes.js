Router.route('/', function () {
  this.render('main');
  Session.set('gameID', null);
  Session.set("currentView", "startMenu");
});

Router.route('/:roomName', function () {
  var player = getCurrentPlayer();
  var roomName = this.params.roomName;
  this.render('main');
    Session.set("urlRoomName", roomName);
    // Session.set("gameID", game._id);
    Session.set("currentView", "lobby");
  });