Template.joinGame.events({
  // 'submit #join-game': function (event) {

  //   var accessCode = event.target.accessCode.value;
  //   var playerName = event.target.playerName.value;

  //   if (!playerName || Session.get('loading')) {
  //     return false;
  //   }

  //   accessCode = accessCode.trim();
  //   accessCode = accessCode.toLowerCase();

  //   Session.set("loading", true);

  //   Meteor.subscribe('games', accessCode, function onReady(){
  //     Session.set("loading", false);

  //     var game = Games.findOne({
  //       accessCode: accessCode
  //     });

  //     if (game) {
  //       Meteor.subscribe('players', game._id);
  //       player = generateNewPlayer(game, playerName);

  //       if (game.state === "inProgress") {
  //         var default_role = game.location.roles[game.location.roles.length - 1];
  //         Players.update(player._id, {$set: {role: default_role}});
  //       }

  //       Session.set('urlAccessCode', null);
  //       Session.set("gameID", game._id);
  //       Session.set("playerID", player._id);
  //       Session.set("currentView", "lobby");
  //     } else {
  //       FlashMessages.sendError('Invalid access code.');
  //     }
  //   });

  //   return false;
  // },
  'click .btn-back': function () {
    Session.set('urlAccessCode', null);
    Session.set("currentView", "startMenu");
    return false;
  }
});

Template.joinGame.helpers({
  games: function () {
    var currentPlayer = getCurrentPlayer();
    var games = Games.find({}).fetch({});
    // console.log('currentPlayer',currentPlayer);
    games.forEach(function(game){
      if (game._id === currentPlayer.gameID){
        player.isCurrent = true;
      }
    });

    games.filter( function( game ){
      return game.state == 'waitingForPlayers';
    });

    return games;
  },
  player: function() {
    return getCurrentPlayer();
  }
});

Template.joinGame.rendered = function (event) {
  var currentPlayer = getCurrentPlayer();
  console.log('curplayer',currentPlayer);
  // FlashMessages.sendInfo("You can found <strong>Meteor</strong> <a href='http://meteor.com'>here</a>");
  // resetUserState();

  // var urlAccessCode = Session.get('urlAccessCode');

  // if (urlAccessCode){
  //   $("#access-code").val(urlAccessCode);
  //   $("#access-code").hide();
  //   $("#player-name").focus();
  // } else {
  //   $("#access-code").focus();
  // }
};
