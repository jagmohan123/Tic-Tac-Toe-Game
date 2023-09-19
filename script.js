const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGamebtn = document.querySelector('.btn');
let currentPlayer;
let gameGrid;
const winnigPositions = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
];

// initialize the game 
function initGame() {
   currentPlayer = "X";
   gameGrid = ["", "", "", "", "", "", "", "", ""];

   // new game start karne ke leaye boxes ko empty karna padega
   boxes.forEach((box, index) => {
      box.innerText = "";
      boxes[index].style.pointerEvents = "all";
      // boxes[index].style.classList.remove("win");
    //   after winning the game background color remove 
      box.classList = `box box${index+1}`;
   });

//    after start the new game we have to disapper the new game button
   newGamebtn.classList.remove("active");
   gameInfo.innerText = `Current Player -  ${currentPlayer}`;
}

// initialise the ui value 
initGame();

function swapTurn() {
   if (currentPlayer === 'X') {
      currentPlayer = 'O';
   } else {
      currentPlayer = 'X';
   }
   gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkgameWin() {
   let answer = "";

   winnigPositions.forEach((position) => {
      //all 3 boxes should be non-empty and exactly same in value
      if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&
         (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

         //check if winner is X
         if (gameGrid[position[0]] === "X")
            answer = "X";
         else {
            answer = "O";
         }


         //disable pointer events
         boxes.forEach((box) => {
            box.style.pointerEvents = "none";
         })

         //now we know X/O is a winner
         boxes[position[0]].classList.add("win");
         boxes[position[1]].classList.add("win");
         boxes[position[2]].classList.add("win");
      }
   });

   //it means we have a winner
   if (answer !== "") {
      gameInfo.innerText = `Winner Player - ${answer}`;
      newGamebtn.classList.add("active");
      return;
   }

   //We know, NO Winner Found, let's check whether there is tie
   let fillCount = 0;
   gameGrid.forEach((box) => {
      if (box !== "")
         fillCount++;
   });

   //board is Filled, game is TIE
   if (fillCount === 9) {
      gameInfo.innerText = "Game Tied !";
      newGamebtn.classList.add("active");

   }

}
function handleClick(index) {
   if (gameGrid[index] === "") {
      boxes[index].innerText = currentPlayer;
      gameGrid[index] = currentPlayer;
      // after clicked the box make box unpointer 
      boxes[index].style.pointerEvents = "none";
      // swap the tturn 
      swapTurn();
      // if any one win the game 
      checkgameWin();

   }
}

boxes.forEach((box, index) => {
   box.addEventListener('click', () => {
      handleClick(index);
   })
});


// this is used to check the winner and start the new game 


// new game btn me click karke sab value remove karke new game start kar rhe hai 
newGamebtn.addEventListener('click', initGame);