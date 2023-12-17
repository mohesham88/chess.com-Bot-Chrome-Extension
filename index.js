// Get active tab's hostname
const site = window.location.href;



// Websites list to inject
const injectTo = [
    'www.chess.com/game/',
    'www.chess.com/play/computer'
];


function playerPeicesColor(){
  const kingPeice = document.querySelector('.square-88');
  if(kingPeice)
    return (kingPeice.classList.contains('wr') ? 'white' : 'black');
}



/* function movePiece(initialPosition, distination){
  // clickPiece = new MouseEvent('click', {clientX: board.getBoundingClientRect().x+72.8, clientY: board.getBoundingClientRect().y + 580 ,bubbles:true});

} */









async function getBestMove(moves){
  console.log(JSON.stringify(moves));
  const bestMoveApiResponse = await fetch('http://localhost:2014/bot', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({moves}),
  }) 
  let bestMove = await bestMoveApiResponse.json();
  return bestMove.bestMove;
}



async function moveThePiece(moves) {
  const bestMove = await getBestMove(moves);
  // alert(bestMove);


  // split the moves into array [first position, second position]
  const positions = bestMove.match(/.{1,2}/g) || [];



  
  /*
  if we want to make it a suggestion bot
  <div class="piece square-46" style="border: 1px solid red;"></div>
  */


}




function getMoveFromDiv(moveDiv){
  let piece = "";
  if(moveDiv.firstElementChild !== null){
    piece = moveDiv.firstElementChild.dataset.figurine;
  }
  return piece + moveDiv.lastChild.textContent;
}



function getGameMoves(){
  let moves = [];
  const movesDOM = document.querySelectorAll('wc-vertical-move-list .move');

  for(let i =0 ; i < movesDOM.length ; i++){
    const children = movesDOM[i].children;
    for(let j = 0 ; j < children.length;j++){
      moves.push(getMoveFromDiv(children[j]));
    }
  }
  return moves;
}


function myTurn(playerColor){
  const moves = document.querySelectorAll('wc-vertical-move-list .move');
  const lastTwoMovesRow = moves[moves.length - 1];


  const numberOfMovesInLastTwoMovesRow = lastTwoMovesRow.children.length;
  console.log(numberOfMovesInLastTwoMovesRow);
  
  if(playerColor === "black"){
    if(numberOfMovesInLastTwoMovesRow === 2){
      return null;
    }else if(numberOfMovesInLastTwoMovesRow === 1){
      return getMoveFromDiv(lastTwoMovesRow.firstElementChild);
      
    }
  }else{
    if(numberOfMovesInLastTwoMovesRow === 2){
      return getMoveFromDiv(lastTwoMovesRow.lastElementChild)
      /* if(lastTwoMovesRow.firstElementChild.firstElementChild !== null){
        piece = lastTwoMovesRow.lastElementChild.firstElementChild.dataset.figurine;
      }
      return piece + lastTwoMovesRow.lastElementChild.lastChild.textContent; */
    }else if(numberOfMovesInLastTwoMovesRow === 1){
      return null;
    }
  }
}




function ui(){
  const sidebar = document.getElementById("sidebar-ad");
  sidebar.innerHTML = `
  <div style="
  background: grey;
  /* color: white; */
  /* display: flex; */
  /* flex-direction: column; */
  /* height: 100%; */
">
      <h1 style="
  color: white;
">Chess.com Bot
      </h1>
</div>

  <div> 

      <div style="
  color: white;
" class="">
          <input name="choice" value="Suggestion" type="radio" checked="">
  <label for="Suggestion">Suggest Best Move Only</label><br>
  <input name="choice" checked="" value="Play" type="radio">
  <label for="Play">Play</label>
          </div>
      

  </div>

  

  <h3 style="
  color: white;
  text-align: center;
">By Mohamed Hesham</h3>
  `;
}



async function main(){
  

  // add the ui
  ui();
  
  const moves = document.querySelector('wc-vertical-move-list');
  
  alert('bot is working')

  const playerColor = playerPeicesColor();

  if(playerColor == 'white') {
      // playFirstMove();
      const fenForStartingPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  }else{
    //startGame();
  }

  
  const observer = new MutationObserver( () => {
      // alert('player moved')
      const gameMoves = getGameMoves(playerColor);
      console.log(gameMoves);

      if(myTurn(playerColor) !== null){
        const gameMoves = getGameMoves();
        if(gameMoves.length > 1){
          moveThePiece(gameMoves);
        }
      }
      /* if(opponentMove !== null){
        moveThePiece(opponentMove);
      } */
  });


  
  observer.observe(moves, {childList: true, subtree: true});
  

}





function myTimer() {
  if(document.querySelector('wc-vertical-move-list')){
    main();
    console.log(site)
    clearInterval(interval);
  }
}

if (site.includes(injectTo[0]) || site.includes(injectTo[1])) {
  var interval = setInterval(myTimer,1000);
  
}







