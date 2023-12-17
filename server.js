const express = require('express');
const app = express();
const PORT = 2014;
const path = require('path')
const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '30mb',extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended : true}))



var cors = require('cors')
const corsOptions = {
  origin : 'https://www.chess.com/'
}
app.use(cors());






// the purpose of this server is to convert algebric notation to fen string
const { Chess } = require('chess.js')




function convertAlgebricToFen(moves){
  const chess = new Chess();
  if(moves){
    for(let i = 0 ; i < moves.length; i++) {
      chess.move(moves[i]);
    }
  }
  return chess.fen();
}


async function getBestMove(fen){
  const chessAPIResponse = await fetch(`https://stockfish.online/api/stockfish.php?fen=${fen}&depth=12&mode=bestmove`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
  },
  });
  
  console.log(chessAPIResponse);
  const htmlText = await chessAPIResponse.text();
  const bestMove = JSON.parse(htmlText).data.split(' ')[1]; 
  console.log(bestMove);
  return bestMove;
}



// main router
app.post('/bot', async (req,res) => {
  const moves = req.body.moves;
  const fen = convertAlgebricToFen(moves);
  console.log(`fein string : ${fen}`)

  const bestMove = await getBestMove(fen);

  res.status(200).json({bestMove});
})


// <script type="text/javascript" src="http://localhost:2014/bot.js" language="javascript"></script>

app.listen(PORT, () => { 
  console.log('listening on port ' +PORT);
})