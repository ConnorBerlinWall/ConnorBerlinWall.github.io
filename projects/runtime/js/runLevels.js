var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createSawBlade(x, y) {
    var hitZoneSize = 25;
    var damageFromObstacle = 10;
    var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
    sawBladeHitZone.x = x;
    sawBladeHitZone.y = y;
    game.addGameItem(sawBladeHitZone);
    var obstacleImage = draw.bitmap("img/Blaze.png");
    sawBladeHitZone.addChild(obstacleImage);
    obstacleImage.x = -x + x;
    obstacleImage.y = -y + 600;
    obstacleImage.scaleX = .1;
    obstacleImage.scaleY = .1;
  }
  createSawBlade(500, 625);
  createSawBlade(600, 640);
  createSawBlade(700, 610);
  
  function playerCollision () {
    startLevel();
    game.changeIntegrity(-100)
  }
  function projectileCollision() {
    startLevel();
    game.increaseScore(100)
    enemy.fadeOut();
  }
  function createEnemy (x , y) {
  var enemy = game.createGameItem("enemy", 25);
  var rock = draw.bitmap("img/rock.png")
  rock.x = x;
  rock.y = y;
  enemy.addChild(rock)
  enemy.x = 400;
  enemy.y = groundY - 50;
  enemy.velocityX = -1
  }
createEnemy(400, groundY - 10);
createEnemy(800, groundY - 100);
createEnemy(1200, groundY - 50)

function createReward () {}; 

function createMarker () {};
  // enemy.onPlayerCollision = playerCollision();
  // enemy.onProjectileCollision = projectileCollision();
 
   game.addGameItem(enemy)
     function startLevel() {
      // TODO 13 goes below here



      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
