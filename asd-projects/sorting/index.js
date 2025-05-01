/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort
//iterates over an array and determines the value of each object then swaps j and the next array if the next array has a greater value
async function bubbleSort(array) {
    for (var i = 0; i <= array.length - 1; i++) {
        for (var j = array.length - 1; j >= i + 1; j--) {
            if (array[j].value < array[j-1].value) {
                swap(array, j, j - 1)
                updateCounter (bubbleCounter)
                await sleep()
            }
        }
    }
}

// TODO 3: Implement quickSort
//determines if the left or right values are bigger than one another, if they aren't it partitions the array and if they are it recurses itself and changes the values of left and right until they are equal
async function quickSort(array, left, right) {
    if(right - left > 0) {
        var index = await partition(array, left, right)
        if(left < index - 1) {
            await quickSort(array, left, index-1)
        } 
        if (right > index) {
            await quickSort(array, index, right)
        }
    }
   return
}

// TODOs 4 & 5: Implement partition
//creates a pivot in which is compared to the values of objects in array, if the left value is greater than the pivot it adds 1 to left
// if the right value is less than the pivot, it subtracts 1 from right
//If left is greater than right, it swaps the two values
async function partition(array, left, right) {
   var pivot = array[Math.floor((right + left) / 2)].value;
    while (left < right) {
        while (array[left].value < pivot) {
            left++
        } 
        while (array[right].value > pivot) {
            right--
        }
        if (left < right) {
            swap(array, left, right)
            updateCounter(quickCounter)
            await sleep();
        }
    }
    return left + 1
}

// TODO 1: Implement swap
//swaps the objects in the array thats being compared with each other
function swap(array, i, j) {
    [array[i], array[j]] = [array[j], array[i]]
    drawSwap(array, i, j)
}

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}