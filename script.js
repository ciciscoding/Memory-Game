const gameContainer = document.getElementById("game");
let blank = 'white';
let firstCard = '';
let secondCard = '';
let flippedCard = 0;
let previousCard = null;
let selectedCards = [];

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
// it is based on an algorithm called Fisher Yates if you want to research more
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

const match = function() {
  let selectedCard = document.querySelectorAll('.flipped');
  for(let card of selectedCard) {
    card.classList.remove('flipped');
    card.style.backgroundColor = 'gray';
  }
};

const reset = function() {
  let selectedCard = document.querySelectorAll('.flipped');
  for(let card of selectedCard) {
    card.classList.remove('flipped');
    card.style.backgroundColor = blank;
  }

  firstCard = '';
  secondCard = '';
  flippedCard = 0;
  selectedCards = [];
};

function handleCardClick(event) {
    // you can use event.target to see which element was clicked
  let selected = event.target;

  if(previousCard === selected || selected.classList.contains('flipped')) {
    return;
  }

  if(flippedCard < 2){
    flippedCard += 1;
    if(flippedCard === 1) {
      firstCard = selected.className;
      selected.style.backgroundColor = selected.classList[0];
      selected.classList.add('flipped');
    } else {
      secondCard = selected.className;
      selected.style.backgroundColor = selected.classList[0];
      selected.classList.add('flipped');
    }
    if(firstCard !== '' && secondCard !== '') {
      if(firstCard === secondCard) {
        setTimeout(match, 1000);
        setTimeout(reset, 1000);
      } else {
        setTimeout(reset, 500);
      }
    }
      previousCard = selected;
      selectedCards.push(previousCard);
  }
};

// TODO: Implement this function!

// when the DOM loads
createDivsForColors(shuffledColors);