// Handlebars.registerHelper('toCapitalCase', function(str) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// });

// function getCurrentGame(){
//   var gameID = Session.get("gameID");

//   if (gameID) {
//     return Games.findOne(gameID);
//   }
// }

// function getAccessLink(){
//   var game = getCurrentGame();

//   if (!game){
//     return;
//   }

//   return Meteor.settings.public.url + game.roomName + "/";
// }

// function getCurrentPlayer(){
//   var playerID = Session.get("playerID");

//   if (playerID) {
//     return Players.findOne(playerID);
//   }
// }

// function generateAccessCode(){
//   var code = "";
//   var possible = "abcdefghijklmnopqrstuvwxyz";

//     for(var i=0; i < 6; i++){
//       code += possible.charAt(Math.floor(Math.random() * possible.length));
//     }

//     return code;
// }

// function generateNewGame(){
//   var game = {
//     roomName: generateAccessCode(),
//     state: "waitingForPlayers",
//     location: null,
//     lengthInMinutes: 8,
//     endTime: null,
//     paused: false,
//     pausedTime: null
//   };

//   var gameID = Games.insert(game);
//   game = Games.findOne(gameID);

//   return game;
// }

// function generateNewPlayer(game, name){
//   var player = {
//     gameID: game._id,
//     name: name,
//     role: null,
//     isSpy: false,
//     isFirstPlayer: false
//   };

//   var playerID = Players.insert(player);

//   return Players.findOne(playerID);
// }

// function trackGameState () {
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
// }

// function leaveGame () {  
//   var player = getCurrentPlayer();

//   Session.set("currentView", "startMenu");
//   Players.remove(player._id);

//   Session.set("playerID", null);
// }

// function resetUserState(){
//   var player = getCurrentPlayer();

//   if (player){
//     Players.remove(player._id);
//   }

//   Session.set("gameID", null);
//   Session.set("playerID", null);
// }

// function hasHistoryApi () {
//   return !!(window.history && window.history.pushState);
// }

// Meteor.setInterval(function () {
//   Session.set('time', new Date());
// }, 1000);

// if (hasHistoryApi()){
//   function trackUrlState () {
//     var roomName = null;
//     var game = getCurrentGame();
//     if (game){
//       roomName = game.roomName;
//     } else {
//       roomName = Session.get('urlAccessCode');
//     }
    
//     var currentURL = '/';
//     if (roomName){
//       currentURL += roomName+'/';
//     }
//     window.history.pushState(null, null, currentURL);
//   }
//   Tracker.autorun(trackUrlState);
// }
// Tracker.autorun(trackGameState);

// window.onbeforeunload = resetUserState;
// window.onpagehide = resetUserState;

// FlashMessages.configure({
//   autoHide: true,
//   autoScroll: false
// });