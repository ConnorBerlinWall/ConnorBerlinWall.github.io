/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width() //stores the board wifth in a constant
  const BOARD_HEIGHT = $("#board").height() //stores the board height in a constant
  
  // Game Item Objects
 var ball = ObjectFactory("#ball") //creates and stores an object with the values in the ball id in a variable
 var leftPaddle = ObjectFactory("#leftPaddle") //creates and stores an object with the values in the left paddle id in a variable
 var rightPaddle = ObjectFactory("#rightPaddle") //creates and stores an object with the values in the right paddle id in a variable
 var p1score = 0 // creates a variable that stores the score of player 1
 var p2score = 0 // creates a variable that stores the score of player 2

  // one-time setup
  //creates an object that stores the key value inputs
  var KEY = {
    W: 87,
    S: 83,
    DOWN: 40,
    UP: 38,
  }
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('eventType', handleEvent);                          // change 'eventType' to the type of event you want to handle
  $(document).on('keydown', handleKeyDown);//creates a jquery event that detects keydown inputs 
  $(document).on('keyup', handleKeyUp);  //creates a jquery event that detects keyup inputs 
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
 startBall()
  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveObject(ball)
    moveObject(leftPaddle)
    moveObject(rightPaddle)
    wallCollision(ball)
    wallCollision(leftPaddle)
    wallCollision(rightPaddle)
    checkScore()
  }
  
  /* 
  Called in response to events.
  */
function handleKeyDown(event) { //detects a keydown input and changes the speeds of the paddle based off of the input
    if (event.which === KEY.UP) {
     leftPaddle.speedY = -5;
    }
    if (event.which === KEY.DOWN) {
      leftPaddle.speedY = 5;

    }
    if (event.which === KEY.W) {
      rightPaddle.speedY = -5

    }
    if (event.which === KEY.S) {
      rightPaddle.speedY = 5
    }
  }
    function handleKeyUp(event) { //reverts the speed of the paddles that the keydown inputs change once the key is released
    if (event.which === KEY.UP) {
      leftPaddle.speedY = 0;
    }
    if (event.which === KEY.DOWN) {
      leftPaddle.speedY = 0;

    }
    if (event.which === KEY.W) {
      rightPaddle.speedY = 0

    }
    if (event.which === KEY.S) {
      rightPaddle.speedY = 0
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

 function ObjectFactory (id){ //takes an id and creates an object based off of values in the id
  var newObj = {}
  newObj.id = id
  newObj.x = parseFloat($(id).css("left"))
  newObj.y = parseFloat($(id).css("top"))
  newObj.speedX = 0
  newObj.speedY = 0
  newObj.width = $(id).width()
  newObj.height = $(id).height()
  return newObj
 }
 
    function startBall() { // moves the ball back to the center of the board and randomizes its x and y speed
      ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
      ball.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
      ball.x = 350
      ball.y = 200
    }
  function moveObject(obj) { //redraws the items so they move on the screen
    obj.x += obj.speedX
    obj.y += obj.speedY
    $(obj.id).css("left", obj.x);
    $(obj.id).css("top", obj.y);
  }
  function wallCollision(obj) { //detects if the paddles collide with the walls and if the ball collides with both the wall and the paddles then switches the x and y values of those objects in order to bounce them
    if(obj.y < 0) { //collide with top wall
      obj.y = obj.y - obj.speedY
      obj.speedY *= -1 
    }
    if (obj.y + obj.height > BOARD_HEIGHT) { //collide with bottom wall
      obj.y = obj.y - obj.speedY
      obj.speedY *= -1 
    }
     if(obj.x < 0) { //collide with left wall, add score
      p2score++
      $("#P2score").text("Player2 score: " + p2score)
      startBall()
    }
    if(doCollide(ball, rightPaddle)){ //collide with right paddle
      obj.x = obj.x - obj.speedX;
      obj.speedX *= -1;
    }
    if (obj.x + obj.width > BOARD_WIDTH) { //collide with right wall
      p1score++
      $("#P1score").text("Player1 score: " + p1score)
      startBall()
    }
    if(doCollide(ball, leftPaddle)){ //collide with left paddle
      obj.x = obj.x - obj.speedX;
      obj.speedX *= -1;
    }
  }
  function doCollide(square1, square2) { //detects if the ball and paddles collide and then returns true if they do and false if they dont
    // TODO: calculate and store the remaining
    // sides of the square1
    square1.leftX = square1.x;
    square1.topY = square1.y;
    square1.rightX = square1.x+square1.width;
    square1.bottomY = square1.y+square1.height;
    // TODO: Do the same for square2
    square2.leftX = square2.x;
    square2.topY = square2.y;
    square2.rightX = square2.x+square2.width;
    square2.bottomY = square2.y+square2.height;
    //debugger;
    // TODO: Return true if they are overlapping, false otherwise
    if(square1.leftX > square2.rightX){
      return false;
    } else if(square1.rightX < square2.leftX){
      return false;
    } else if(square1.topY > square2.bottomY){
      return false;
    } else if(square1.bottomY < square2.topY){
      return false;
    } else {
      return true;
    }
    // Hint: use the following conditions:
      // red left < blue right
      // red right > blue left
      // red top < blue bottom
      // red bottom > blue top
  }
  function checkScore() { //checks the score to see if either score is equal tto 10 and if so it ends the game
    if (p1score >= 10) {
      alert("Player 1 wins!")
      endGame()
    }
    if (p2score >= 10) {
      alert("Player 2 wins!")
      endGame()
    }
  }
  function endGame() { // ends the game
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
