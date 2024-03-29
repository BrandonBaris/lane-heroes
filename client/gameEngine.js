//   function GameState() {
//   this.lanes = [];
//   this.deltas = [];

//   this.score = [0,0];

//   this.frame = 0;

//   this.team = 1;
// }
// PlayerOne = {
//   lanes: [],
//   heroes: [],
//   totalScoreA: 0,
//   totalScoreB: 0,
//   victory: false
// };

// Keys = {};

// Keys.SETTINGS = {
//   lane1: 83, // s
//   lane2: 68, // d
//   lane3: 70, // f
//   lane4: 74, // j
//   lane5: 75, // k
//   lane6: 76, // l
//   lane7: 186, // ;
//   lane8: 65 // a
//   //old
//   // lane1: 65, // a
//   // lane2: 83, // s
//   // lane3: 68, // d
//   // lane4: 70, // f
//   // lane5: 74, // j
//   // lane6: 75, // k
//   // lane7: 76, // l
//   // lane8: 186 // ;
// };

// Keys.keyboard = function keyboard(keyCode) {
//   var key = {};
//   key.code = keyCode;
//   key.isDown = false;
//   key.isUp = true;
//   key.press = undefined;
//   key.release = undefined;

//   key.downHandler = function(evt) {
//     if (evt.keyCode === key.code) {
//       if (key.isUp && key.press) key.press();
//       key.isDown = true;
//       key.isUp = false;
//     }
//     evt.preventDefault();
//   };

//   key.upHandler = function(evt) {
//     if (evt.keyCode === key.code) {
//       if (key.isDown && key.release) key.release();
//       key.isDown = false;
//       key.isUp = true;
//     }
//     evt.preventDefault();
//   };

//   window.addEventListener('keydown', key.downHandler.bind(key), false);
//   window.addEventListener('keyup', key.upHandler.bind(key), false);

//   return key;
// };

// Keys.init = function init(keyCodes) {
//   var keys = keyCodes || [
//     Keys.SETTINGS.lane1,
//     Keys.SETTINGS.lane2,
//     Keys.SETTINGS.lane3,
//     Keys.SETTINGS.lane4,
//     Keys.SETTINGS.lane5,
//   ];

//   var keyHandler = [];

//   for (var lane = 0; lane < keys.length; lane++) {
//     keyHandler[lane] = Keys.keyboard(keys[lane]);

//     var moveHero = function() {
//       var laneCopy = lane; // Closure and var are necessary

//       keyHandler[laneCopy].press = function() {
//         var hero = PlayerOne.heroes[laneCopy];
//         var step = Game.VIEWPORT.sizePerStep;
//         var staminaOffset = 0;
//         // var halfwayThreshold = Game.SETTINGS.staminaThreshold / 2;
//         // var threeFourthsThreshold = halfwayThreshold + (Game.SETTINGS.staminaThreshold / 4);

//         hero.stamina += 5;

//         // at max, halt the hero
//         if (hero.stamina >= Game.SETTINGS.staminaThreshold) {
//           staminaOffset = step;
//           hero.stamina = 100;
//         } else {
//           staminaOffset = hero.stamina/step;
//         }
//         // // at 3/4 stamina capacity, subtract 50% of the step
//         // else if (hero.stamina >= threeFourthsThreshold) {
//         //   staminaOffset = step * 0.50;
//         // }
//         // // at halfway capacity, subtract 20% of the step
//         // else if (hero.stamina >= halfwayThreshold) {
//         //   staminaOffset = step * 0.20;
//         // }

//         hero.sprite.position.x += Game.STATE.team * (step - staminaOffset);
//         Game.STATE.deltas[laneCopy] += (step - staminaOffset)/step;

//         // console.log('stamina', hero.stamina);
//         // console.log('offset: ' + staminaOffset + '; step size:', Game.STATE.team * (step - staminaOffset));
//       };
//     };

//     moveHero();
//   }
// };

// function Hero(sprite) {
//   this.sprite = sprite;
//   this.lock = false;
//   this.currentZone = -1;
//   this.currentZoneTimeLastPolled = null;
//   this.previousZone = -1;
//   this.score = 0;
//   // stamina capacity (the lower this value, the greater the distance
//   //   the hero can move per keypress)
//   this.stamina = 0;
// }
//   var header_styles = {
//     font: 'bold 50px Arial',
//     align: 'center',
//     stroke: '#FFFFFF',
//     strokeThickness: 5,
//     dropShadow: true,
//     dropShadowColor: '#455455',
//     dropShadowAngle: 0,
//     fill: '#fbb03b'
//   };
//   var player_styles = {
//     font: 'bold 30px Arial',
//     align: 'center',
//     dropShadow: true,
//     dropShadowColor: '#eee',
//     dropShadowAngle: 0,
//     fill: '#666'
//   };
//   var key_styles = {
//     font: 'bold 30px Arial',
//     align: 'left',
//     stroke: '#FFFFFF',
//     strokeThickness: 3,
//     dropShadow: true,
//     dropShadowColor: '#eee',
//     dropShadowAngle: 0,
//     fill: '#222',
//     alpha: 0.5
//   };

//   Game = {
//     stage: new PIXI.Container(),
//     zones: {},
//     scoreA: new PIXI.Text('9990', header_styles),
//     scoreB: new PIXI.Text('9990', header_styles),
//     timerTxt: new PIXI.Text('-', header_styles),
//     gameOverTxt: new PIXI.Text('', header_styles),
//     player1Txt: new PIXI.Text('DARK PLAYER', player_styles),
//     player2Txt: new PIXI.Text('LIGHT PLAYER', player_styles),
//     keyS: new PIXI.Text('S', key_styles),
//     keyD: new PIXI.Text('D', key_styles),
//     keyF: new PIXI.Text('F', key_styles),
//     keyJ: new PIXI.Text('J', key_styles),
//     keyK: new PIXI.Text('K', key_styles),
//     loopCounter: 0
//   };

//   Game.SETTINGS = {
//     backgroundColor: 0xdddddd,
//     canvasWidth: 1200,
//     canvasHeight: 860,
//     // gameLength: 123, // for testing quick games
//     gameLength: 7680, // seconds * 60 fps (2m8s)
//     numLanes: 5,
//     numZonesPerLane: 8,
//     playerOneZoneColor: 0xEDEFF5,
//     playerTwoZoneColor: 0x4A565D,
//     botMode: true,
//     staminaThreshold: 100,
//     improveStaminaCounter: 60, // decrease stamina once per second
//     improveStaminaAmount: 10, // decrease stamina by 10
//     // scores for each zone, index 0 to 7
//     playerOneLaneScores: [0, 1, 0, 3, 0, 6, 0, 10], // moving right
//     playerTwoLaneScores: [10, 0, 6, 0, 3, 0, 1, 0], // moving left
//     // playerOneLaneScores: [-10, 1, -6, 3, -3, 6, -1, 10], // moving right
//     // playerTwoLaneScores: [10, -1, 6, -3, 3, -6, 1, -10] // moving left
//     playerLanePoints: [10,1,6,3,3,6,1,10],

//     numSteps: 40,
//   };

//   Game.VIEWPORT = {
//     sizePerStep: 1,
//   };

//   Game.STATE = new GameState();

//   Game.renderer = PIXI.autoDetectRenderer(Game.SETTINGS.canvasWidth, Game.SETTINGS.canvasHeight,{
//     backgroundColor: Game.SETTINGS.backgroundColor
//   });

//   Game.init = function init(_numLanes) {
//     document.body.appendChild(Game.renderer.view);

//     var numLanes = _numLanes || Game.SETTINGS.numLanes;
//     var laneHeight = Game.SETTINGS.canvasHeight / numLanes;

//     var zone1 = Game.SETTINGS.playerOneZoneColor;
//     var zone2 = Game.SETTINGS.playerTwoZoneColor;
//     var zoneWidth = Game.SETTINGS.canvasWidth / Game.SETTINGS.numZonesPerLane;
//     var zoneColor = null;
//     var zoneTemp = null;

//     var numSteps = Game.SETTINGS.numSteps;
//     var verticalOffset = 0;
//     Game.VIEWPORT.zoneWidth = zoneWidth;
//     Game.VIEWPORT.laneHeight = laneHeight;
//     Game.VIEWPORT.sizePerStep = (Game.SETTINGS.canvasWidth - verticalOffset)/numSteps;

//     Game.SETTINGS.cpuDifficulty = 0;

//     var mountain = PIXI.Sprite.fromImage("/assets/background.png");
//     mountain.anchor.set(0,0);
//     mountain.position.set(0,60);
//     Game.stage.addChild(mountain);

//     Game.stage.addChild(Game.scoreA);
//     Game.scoreA.position.set(50, 30);
//     Game.scoreA.anchor.set(0, 0.5);
//     Game.stage.addChild(Game.player1Txt);
//     Game.player1Txt.position.set(150, 30);
//     Game.player1Txt.anchor.set(0, 0.5);

//     Game.stage.addChild(Game.scoreB);
//     Game.scoreB.position.set(Game.SETTINGS.canvasWidth-50, 30);
//     Game.scoreB.anchor.set(1, 0.5);
//     Game.stage.addChild(Game.player2Txt);
//     Game.player2Txt.position.set(Game.SETTINGS.canvasWidth-150, 30);
//     Game.player2Txt.anchor.set(1, 0.5);

//     Game.stage.addChild(Game.timerTxt);
//     Game.timerTxt.position.set(Game.SETTINGS.canvasWidth/2, 20);
//     Game.timerTxt.anchor.set(0.5, 0.3);

//     Game.stage.addChild(Game.gameOverTxt);
//     Game.gameOverTxt.position.set(Game.SETTINGS.canvasWidth/2, Game.SETTINGS.canvasHeight/2);
//     Game.gameOverTxt.anchor.set(0.5, 0);

//     Game.stage.addChild(Game.keyS);
//     Game.keyS.position.set(50,110);
//     Game.stage.addChild(Game.keyD);
//     Game.keyD.position.set(50,280);
//     Game.stage.addChild(Game.keyF);
//     Game.keyF.position.set(50,440);
//     Game.stage.addChild(Game.keyJ);
//     Game.keyJ.position.set(50,600);
//     Game.stage.addChild(Game.keyK);
//     Game.keyK.position.set(50,780);


//     for (var i = 0; i < numLanes; i++) {
//       for (var k = 0; k < Game.SETTINGS.numZonesPerLane; k++) {
//         if (k % 2 === 0) {
//           zoneColor = zone1;
//         } else {
//           zoneColor = zone2;
//         }

//         var zone = new PIXI.Graphics();
//         zone.beginFill(zoneColor,0.1);
//         zone.drawRect(k * zoneWidth, i * laneHeight, zoneWidth, laneHeight);
//         Game.zones['l' + i + 'z' + k] = zone; // "lane 0 zone 0"
//         Game.stage.addChild(zone);
//       }

//       zoneTemp = zone1;
//       zone1 = zone2;
//       zone2 = zoneTemp;
//     }

//     var xStartingPos = Game.SETTINGS.canvasWidth / 2;
//     var yStartingPos = 0;

//     for (var i = 0; i < numLanes; i++) {
//       var lane = new PIXI.Container();

//       var heroImage;
//       switch( i ){
//         case 0: heroImage = '/assets/heroes/airship.png';
//         break;
//         case 1: heroImage = '/assets/heroes/snailhouse.png';
//         break;
//         case 2: heroImage = '/assets/heroes/wizzard.png';
//         break;
//         case 3: heroImage = '/assets/heroes/swordsmen.png';
//         break;
//         case 4: heroImage = '/assets/heroes/gunner.png';
//         break;
//         default: heroImage = '/assets/heroes/bunny.png';
//       }

//       var hero = PIXI.Sprite.fromImage( heroImage );
//       hero.lock = false; // LANE LOCK VARIABLE
//       hero.anchor.set(0.5, 0.35);
//       hero.scale.set(0.9, 0.9);
//       yStartingPos = (laneHeight / 2) + (i * laneHeight);

//       hero.position.set(xStartingPos, yStartingPos);
//       lane.addChild(hero);

//       PlayerOne.heroes.push(new Hero(hero));
//       PlayerOne.lanes.push(lane);

//       Game.stage.addChild(lane);
//     }

//     Keys.init();
//   };

//   Game.loop = function loop() {
//     Game.STATE.frame++;
//     Game.SETTINGS.gameLength--;

//     if( Game.SETTINGS.gameLength <= 0 ){
//       Game.SETTINGS.gameLength = 0;
//       var status = determineWinner();
//       var winner;
//       switch( status ){
//         case 0: winner = 'IT\'S A TIE';
//         break;
//         case 1: winner = 'PLAYER 1 WINS';
//         break;
//         case 2: winner = 'PLAYER 2 WINS';
//         break;
//         default: winner = 'PLAY A NEW GAME';
//       }


//       var playAgain = new PIXI.Graphics();
//       var paWidth = Game.SETTINGS.canvasWidth / 4;
//       var paHeight = Game.SETTINGS.canvasHeight / 4;

//       playAgain.lineStyle(2, 0xF7931E, 1);
//       playAgain.beginFill(0xFBB03B, 1);
//       playAgain.drawRoundedRect(paWidth + paWidth / 2, paHeight + paHeight / 2, 300, 60, 15);
//       playAgain.endFill();

//       playAgain.interactive = true;

//       playAgain.click = function(evt) {
//         window.location.href = '/';
//       };

//       Game.stage.addChild(playAgain);

//       var paStyles = {
//         font: 'bold 20px Arial',
//         align: 'center',
//         strokeThickness: 1,
//         fill: '#FFF8B2'
//       };

//       var playAgainText = new PIXI.Text('Play Again?', paStyles);
//       playAgainText.position.set(paWidth * 1.8, paHeight * 1.65);
//       playAgainText.anchor.set(0, 0.5);
//       Game.stage.addChild(playAgainText);


//       Game.timerTxt.text = winner;
//       PlayerOne.heroes.forEach( function( hero,i ){
//         hero.sprite.position.x = Game.SETTINGS.canvasWidth + 2000;
//         hero.sprite.position.y = Game.SETTINGS.canvasWidth + 2000;

//       });
//       // Game.gameOverTxt.text = winner;
//     } else {
//       Game.timerTxt.text = ((Game.SETTINGS.gameLength/60)/60).toFixed(2);
//       requestAnimationFrame(Game.loop);
//     }

//     Game.loopCounter++;

//     checkLaneStatus(PlayerOne.heroes);

//     PlayerOne.heroes.forEach(function(hero, i) {
//       if (Game.loopCounter === Game.SETTINGS.improveStaminaCounter) {
//         hero.stamina -= Game.SETTINGS.improveStaminaAmount;
//         if (hero.stamina < 0) {
//           hero.stamina = 0;
//         }
//       }
//       hero.sprite.position.x -= (Game.SETTINGS.cpuDifficulty/60 * Game.VIEWPORT.sizePerStep);

//       if (hero.sprite.position.x >= Game.SETTINGS.canvasWidth) {
//         hero.sprite.position.x = Game.SETTINGS.canvasWidth;
//       }
//       if (hero.sprite.position.x < 0) {
//         hero.sprite.position.x = 0;
//       }

//       if (!hero.lock) {
//         freezeLane(hero, i);
//       }

//       // score the current lane
//       var zone = Math.floor(hero.sprite.position.x / Game.VIEWPORT.zoneWidth);
//       var now = Date.now();

//       // on the next frame, if hero is still in the same zone, check the time spent in the zone
//       if (hero.currentZone === zone && hero.currentZone === hero.previousZone && hero.lock !== true) {
//         var timeSpentInZone = now - hero.currentZoneTimeLastPolled;

//         if (timeSpentInZone >= 3000) { // 3000 ms = 3 s
//           // hero.score += Game.SETTINGS.playerOneLaneScores[zone];
//           if( isNaN((Game.SETTINGS.playerOneLaneScores[zone])) ){
//             Game.SETTINGS.playerOneLaneScores[zone] = 0;
//           }
//           if( isNaN((Game.SETTINGS.playerTwoLaneScores[zone])) ){
//             Game.SETTINGS.playerTwoLaneScores[zone] = 0;
//           }
//           PlayerOne.totalScoreA += Game.SETTINGS.playerOneLaneScores[zone];
//           PlayerOne.totalScoreB += Game.SETTINGS.playerTwoLaneScores[zone];

//           hero.currentZoneTimeLastPolled = now; // reset zone entered time

//           // console.log('A Hero ' + i + ' gained ' + Game.SETTINGS.playerOneLaneScores[zone] + ' points in zone ' + zone + ', hero score: ' + hero.score + '; total score: ' + PlayerOne.totalScoreA);
//           // console.log('B Hero ' + i + ' gained ' + Game.SETTINGS.playerTwoLaneScores[zone] + ' points in zone ' + zone + ', hero score: ' + hero.score + '; total score: ' + PlayerOne.totalScoreB);
//         }

//         // currentZone and previousZone values remain the same
//       } else {
//         // hero has left the zone, so reset all values
//         hero.previousZone = hero.currentZone;
//         hero.currentZone = zone;
//         hero.currentZoneTimeLastPolled = now;
//       }
//     });

//     // document.getElementById("p1score").innerHTML = Game.STATE.score[0];
//     // document.getElementById("p2score").innerHTML = Game.STATE.score[1];

//     Game.scoreA.text = PlayerOne.totalScoreA.toString();
//     Game.scoreB.text = PlayerOne.totalScoreB.toString();
//     // Game.scoreB.text = Game.STATE.score[1];

//     if ((Game.STATE.frame % 60) === 0) {
//       // socket.emit('update state', JSON.stringify(Game.STATE), roomName, playerName);
//       Game.STATE.deltas = [0,0,0,0,0,0,0,0];
//     }

//     if (Game.loopCounter > Game.SETTINGS.improveStaminaCounter) {
//       Game.loopCounter = 0;
//     }

//     Game.renderer.render(Game.stage);
//   };

//   Game.init();
//   Game.loop();

//   function freezeLane(hero, lane){
//     if ( hero.sprite.position.x >= Game.SETTINGS.canvasWidth || hero.sprite.position.x <= 0 ){
//       hero.lock = true;
//       hero.sprite.position.x = Game.SETTINGS.canvasWidth + 2000;
//       hero.sprite.position.y = Game.SETTINGS.canvasWidth + 2000;
//       // console.log('YOU HIT THE END');

//       var overlay = new PIXI.Graphics();
//       var laneBottom = (lane * Game.VIEWPORT.laneHeight) + (Game.VIEWPORT.laneHeight / 2);
//       overlay.beginFill(0x4A565D, 0.7);
//       overlay.drawRect(0, laneBottom, Game.SETTINGS.canvasWidth, Game.VIEWPORT.laneHeight / 2);

//       Game.stage.addChild(overlay);
//     } else {
//       // console.log('STILL OK');
//     }
//   }

//   function determineWinner(){
//     if( PlayerOne.totalScoreA === PlayerOne.totalScoreB ){
//       return 0; // Tied
//     }
//     if( PlayerOne.totalScoreA > PlayerOne.totalScoreB ){
//       return 1; // player 1 wins
//     }
//     if( PlayerOne.totalScoreB > PlayerOne.totalScoreA ){
//       return 2; // player 2 wins
//     }
//   }

//   function checkLaneStatus(heroes){
//     // soooooooo ugly
//     if(heroes[0].lock === true && heroes[1].lock === true && heroes[2].lock === true && heroes[3].lock === true && heroes[4].lock === true ){
//       Game.SETTINGS.gameLength = 0;
//     }
//   }