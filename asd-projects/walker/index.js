/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var Key = {
    ArrowLeft: 37,
    ArrowRight: 39,
    ArrowUp: 38,
    ArrowDown: 40
  }
  // Game Item Objects
  var walker = {
    x: 0,
    y: 0,
    speedX: 0,
    speedY: 0,
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp)
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
 
  function newFrame() {
    repositionGameItem()
    wallCollision()
    redrawGameItem()


  }
  
  /* 
  Called in response to events.
  */
  function wallCollision() {
    if (walker.x + 50 >= $("#board").width()) {
      walker.x -= walker.speedX
    }
    if (walker.x <= 0) {
      walker.x = 0
    }
    if (walker.y + 50 >= $("#board").height()) {
      walker.y -= walker.speedY
    }
    if (walker.y <= 0) {
      walker.y = 0
    }
   }
  function handleKeyUp(event) {
    if (event.which === Key.ArrowLeft){
      console.log("left pressed")
      walker.speedX = 0
    }
    if (event.which === Key.ArrowRight){
      console.log("right pressed")
      walker.speedX = 0
    }
    if (event.which === Key.ArrowDown){
      console.log("down pressed")
      walker.speedY = 0
    }
    if (event.which === Key.ArrowUp){
      console.log("up pressed")
      walker.speedY = 0
    }
  }
  function handleKeyDown(event) {
    if (event.which === Key.ArrowLeft){
      console.log("left pressed")
      walker.speedX = -5
    }
    if (event.which === Key.ArrowRight){
      console.log("right pressed")
      walker.speedX = 5
    }
    if (event.which === Key.ArrowDown){
      console.log("down pressed")
      walker.speedY = 5
    }
    if (event.which === Key.ArrowUp){
      console.log("up pressed")
      walker.speedY = -5
    }
 
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  function redrawGameItem() {
    $("#walker").css("left", walker.x); // draw the box in the new location, positionX pixels away from the "left"
    $("#walker").css("top", walker.y); // draw the box in the new location, positionX pixels away from the "left"
  }
  function repositionGameItem() {
    walker.x += walker.speedX; // update the position of the box along the x-axis
    walker.y += walker.speedY; // update the position of the box along the y-axis
  }
  
}
