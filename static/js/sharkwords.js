const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;

// Loop over the chars in `word` and create divs.
//

const createDivsForChars = (word) => {
  const wordContainer = $("#word-container");
  for (const letter of word) {
    wordContainer.append(`<div class="letter-box ${letter}"></div>`);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const letterButtonContainer = $("#letter-buttons");
  for (const letter of alphabet) {
    letterButtonContainer.append(`<button>${letter}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  $(buttonEl).attr('disabled', true)
};

// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => {
  return $(`div.${letter}`).length > 0
};

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter) => {
  $(`div.${letter}`).html(letter);
};

//
// Called when `letter` is not in word.
//
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable
// all buttons and show the "play again" message.

const handleWrongGuess = () => {
  numWrong = numWrong + 1;

    $('img').attr('src', `/static/images/guess${numWrong}.png`);

  if (numWrong === 5){
    $('button').attr('disabled', true);
    $('#play-again').show();
    //$('#play-again').css({ display: "block" });
  }
};

// const isWinner = (word) => {
//   for (const letter of word) {
//     const firstLetterDiv = $(`div.${letter}`)[0];
//     // if the letter is not filled in then it has not been guessed yet and there is no winner
//     if (firstLetterDiv.innerHTML !== letter) {
//       return false;
//     }
//   }
//   // if the for loop did not return false then every letter was guessed
//   return true;
// };

const handleWinner = () => {
  const message = $('#play-again');
  message.html('Yay! You won!');
  message.show();

};

//  Reset game state. Called before restarting the game.
const resetGame = () => {
  window.location = '/sharkwords';
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = 'hello';
  const wordLength = word.length;
  let guessCount = 0;

  createDivsForChars(word);
  generateLetterButtons();

  // add an event handler to handle clicking on a letter
  $('button').on('click', (evt) => {
    const clickedBtn = evt.target;
    
    // you should disable the button so the letter can't be clicked again
    disableLetterButton(clickedBtn);
    
    const letter = clickedBtn.innerHTML;

    // you should then check if the currently clicked letter is in the word
    if(isLetterInWord(letter)){
      // if it is, call `handleCorrectGuess`
      handleCorrectGuess(letter);
      for (let i = 0; i< wordLength; i++){
        if (letter == word[i]){
          guessCount = guessCount + 1;
        }
        if(guessCount === wordLength){
          handleWinner();
        }
      }

    } else {
      // if it is not, call `handleWrongGuess`
      handleWrongGuess(letter);
    }
  });

  // add an event handler to handle clicking on the Play Again button
  //document.querySelector('#play-again').addEventListener('click', resetGame);
  $('#play-again').on('click', () => {
    resetGame();
  });

})();
