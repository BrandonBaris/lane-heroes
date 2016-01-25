// Handlebars.registerHelper('toCapitalCase', function(str) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// });

getCurrentGame = function getCurrentGame(){
  var gameID = Session.get("gameID");

  if (gameID) {
    return Games.findOne(gameID);
  }
};

// getAccessLink = function getAccessLink(){
//   var game = getCurrentGame();

//   if (!game){
//     return;
//   }

//   return Meteor.settings.public.url + game.roomName + "/";
// };

getCurrentPlayer = function getCurrentPlayer(){
  var playerID = Session.get("playerID");

  if (playerID) {
    console.log('Player session exists: ', playerID);
    return Players.findOne(playerID);
  }
};

// generateAccessCode = function generateAccessCode(){
//   var code = "";
//   var possible = "abcdefghijklmnopqrstuvwxyz";

//     for(var i=0; i < 6; i++){
//       code += possible.charAt(Math.floor(Math.random() * possible.length));
//     }

//     return code;
// };

// generateNewGame = function generateNewGame(){
//   var game = {
//     roomName: generateAccessCode(),
//     state: "waitingForPlayers",
//     lengthInMinutes: 3,
//     endTime: null,
//     position: []
//   };

//   var gameID = Games.insert(game);
//   game = Games.findOne(gameID);

//   return game;
// };

// generateNewPlayer = function generateNewPlayer( name ){
//   var player = {
//     gameID: null,
//     name: name
//   };

//   var playerID = Players.insert(player);

//   return Players.findOne(playerID);
// };

// trackGameState = function trackGameState () {
//   var gameID = Session.get("gameID");
//   var playerID = Session.get("playerID");

//   if (!gameID || !playerID){
//     return;
//   }

//   var game = Games.findOne(gameID);
//   var player = Players.findOne(playerID);

//   if (!game || !player){
//     Session.set("gameID", null);
//     Session.set("playerID", null);
//     Session.set("currentView", "startMenu");
//     return;
//   }

//   if(game.state === "inProgress"){
//     Session.set("currentView", "gameView");
//   } else if (game.state === "waitingForPlayers") {
//     Session.set("currentView", "lobby");
//   }
// };

leaveGame = function leaveGame () {  
  var player = getCurrentPlayer();
  var game = getCurrentGame();
  console.log('game',JSON.stringify(game));
  console.log('game.players',game.players);
  console.log('playerid',player);
  Meteor.subscribe('games', function onReady(){
    var player_index = game.players.indexOf( player._id );
    var edited_players = game.players.slice( player_index, player_index + 1 );
    console.log('edited_players',edited_players);
    Games.update( game._id, { $set: { players: edited_players }});
    Players.update(player._id, { $set: { gameID: null }});
    Session.set("gameID", null);
    console.log('Session.get',Session.get('gameID'));
    // Session.set("urlAccessCode", null);
    Session.set("currentView", "startMenu");
  });
};

//   // Session.set("currentView", "startMenu");
//   // Players.remove(player._id);

//   // Session.set("playerID", null);
//   return Meteor.settings.public.url + "/";
// };

// resetUserState = function resetUserState(){
//   var player = getCurrentPlayer();

//   if (player){
//     Players.remove(player._id);
//   }

//   Session.set("gameID", null);
//   Session.set("playerID", null);
// };

// // hasHistoryApi = function hasHistoryApi () {
// //   return !!(window.history && window.history.pushState);
// // };

// Meteor.setInterval(function () {
//   Session.set('time', new Date());
// }, 1000);

// // if (hasHistoryApi()){
// //   function trackUrlState () {
// //     var roomName = null;
// //     var game = getCurrentGame();
// //     if (game){
// //       roomName = game.roomName;
// //     } else {
// //       roomName = Session.get('urlAccessCode');
// //     }
    
// //     var currentURL = '/';
// //     if (roomName){
// //       currentURL += roomName+'/';
// //     }
// //     window.history.pushState(null, null, currentURL);
// //   }
// //   Tracker.autorun(trackUrlState);
// // }
// // Tracker.autorun(trackGameState);

// window.onbeforeunload = resetUserState;
// window.onpagehide = resetUserState;

// FlashMessages.configure({
//   autoHide: true,
//   autoScroll: false
// });