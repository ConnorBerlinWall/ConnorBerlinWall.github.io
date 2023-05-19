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
    var damageFromObstacle = 50;
    var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
    sawBladeHitZone.x = x;
    sawBladeHitZone.y = groundY;
    game.addGameItem(sawBladeHitZone);
    var obstacleImage = draw.bitmap("img/rock.png");
    sawBladeHitZone.addChild(obstacleImage);
    obstacleImage.x = sawBladeHitZone.x - x - 50;
    obstacleImage.y = -y + 580;
    obstacleImage.scaleX = 1.5;
    obstacleImage.scaleY = 1;
  }
  createSawBlade(500, 600);
  createSawBlade(600, 600);
  createSawBlade(700, 600);
  
  function playerCollision () {
    startLevel();
    game.changeIntegrity(-100)
  }
  function projectileCollision() {
    game.increaseScore(100);
    enemy.fadeOut();
  }
  function createEnemy (x , y) {
  var enemy = game.createGameItem("enemy", 25);
  // var rock = draw.rect(50, 50, "green")
  var rock = draw.bitmap("img/Blaze.png")
  rock.scaleX = .1
  rock.scaleY = .1
  rock.x = -25;
  rock.y = -25;
  enemy.addChild(rock)
  enemy.x = x
  enemy.y = y    
  game.addGameItem(enemy);
  enemy.velocityX = -1
  enemy.onPlayerCollision = function () {
    game.changeIntegrity(-50);
    enemy.fadeOut();
  }
  enemy.onProjectileCollision = function () {
    game.increaseScore(100);
    enemy.fadeOut();
  };
}
createEnemy(400, groundY - 50);
createEnemy(800, groundY - 50);
createEnemy(1200, groundY - 50)

function createReward (x, y) {
  var pickup = game.createGameItem("enemy", 25);
  var trophy = draw.bitmap("img/trophy.png");
  trophy.x = -25
  trophy.y = -25
  trophy.scaleX = .1
  trophy.scaleY = .1
  pickup.addChild(trophy)
  pickup.x = x
  pickup.y = y
  game.addGameItem(pickup)
  pickup.velocityX = -3
  pickup.onPlayerCollision = function () {
    game.changeIntegrity(25);
    pickup.fadeOut();
  }
  pickup.onProjectileCollision = function () {
    game.increaseScore(50)
    pickup.fadeOut()
  }
}; 
createReward(400, groundY - 50)
createReward(800, groundY - 50)
createReward(1200, groundY - 50)

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
