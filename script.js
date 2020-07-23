const gameContainer = document.getElementById("game");
let previousCard = null;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  let theTarget = event.target.className;
  const red = document.querySelectorAll('div .red');
  const orange = document.querySelectorAll('div .orange');
  const green = document.querySelectorAll('div .green');
  const blue = document.querySelectorAll('div .blue');
  const purple = document.querySelectorAll('div .purple');
  
  function clickedCard(selectedCard) {
    if(isProcessing) { return; }
  }

  if(theTarget == red[0].className) {
    document.body.style.backgroundColor = 'red'
  }
  else if(theTarget == orange[0].className) {
    document.body.style.backgroundColor = 'orange'
  }
  else if(theTarget == green[0].className) {
    document.body.style.backgroundColor = 'green'
  }
  else if(theTarget == blue[0].className) {
    document.body.style.backgroundColor = 'blue'
  }
  else if(theTarget == purple[0].className) {
    document.body.style.backgroundColor = 'purple'
  };
  // console.log(event.target);


  function clickedCard(selectedCard) {
    if(selectedCard.classList.contains('flipped')) {
      return;
    }
    
    selectedCard.classList.add('flipped');
    
    if(previousCard === null) {
      previousCard = selectedCard
      // console.log(previousCard)
    } else {
      let card1 = previousCard.className;
      let card2 = selectedCard.className;

      if(card1 !== card2){
        isProcessing = true;
        setTimeout(function () {
          selectedCard.classList.remove('flipped');
          previousCard.classList.remove('flipped');
          previousCard = null;
          isProcessing = false;
        }, 1000);
        restart();
      } else {
        previousCard = null;
        console.log('You Win!');
      }
    }
  }
  
  clickedCard(event.target);

}

function restart() {
  document.body.style.backgroundColor = 'white';
}

// when the DOM loads
createDivsForColors(shuffledColors);

