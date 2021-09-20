class Board {
    constructor() {
        // 3x3
        this.gameBoard = [
            "", "", "",
            "", "", "",
            "", "", ""
        ]
    }

    // Should print the board to screen
    printBoard(){
        let out = '\n\t';
        let separator = '-----------------'
        for (let i = 0; i < this.gameBoard.length; i++){
            let tmp;
            let pos = this.gameBoard[i]
            if (pos){
                tmp = `  ${pos}  |`
            }else {
                tmp = `     |`
            }

            if ((i + 1) % 3 === 0){
                tmp = `  ${pos}\n\t`
            }

            out += tmp;

            if ((i + 1) % 3 === 0 && i !== 8){
                out += separator + '\n\t'
            }
        }

        console.log(out)
    }

    // Should reset screen
    resetScreen(){
        console.clear()
    }

    // Should return all available positions in the board
    availablePositions(){
         return this.gameBoard.map((pos, index) => {
             if (pos === ''){
                 return index
             }
         }).filter(v => v !== undefined);
    }
}

class Game extends Board{
    constructor(player1, player2) {
        super();
        this.winner = null;
        this.players = [player1, player2]
        // winning combinations
        this.triples = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
    }

    // Should return either true or false
    hasWon(){
        for (let i = 0; i < this.triples.length; i++){
            // has winning moves for x
            let x = this.triples[i].every(pos => this.gameBoard[pos] === 'X');
            if (x){
                this.winner = 'X';
                return true;
            }
            // has winning moves for o
            let o = this.triples[i].every(pos => this.gameBoard[pos] === 'O');
            if (o){
                this.winner = 'O';
                return true
            }
        }
        return false;
    }

    // Should return either true or false
    isDraw(){
        return this.gameBoard.every(pos => pos !== '')
    }

    // Should mark the position in the board
    markPlace(pos, mark){
        this.gameBoard[pos] = mark
    }

    // Sleep for given milliseconds
    sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }
    play(){
        // play the game until there's a draw or a win
        while (this.hasWon() === false || this.isDraw() === false){
            for (let p = 0; p < this.players.length; p++) {
                const player = this.players[p];
                
                if (player.name === 'HumanPlayer'){
                    // 
                }else if (player.name === 'AIPlayer'){
                    let pos = this.aiMove(player);
                    this.markPlace(pos, player.symbol)
                    
                }
                this.sleep(2000);
                this.resetScreen();
                this.printBoard();
                if (this.hasWon()){
                    console.log(`Player ${this.winner} wins!`)
                    return;
                }else if (this.isDraw()){
                    console.log("Draw")
                    return;
                }
            }
        }
    }
    aiMove(player){
        /*
            Keep the AI Simple
            Making a winning move if available
            Otherwise just move random place
        */
        // Step 1 - If there's at least two apperance in a triple and an empty space is available
        // Make a move
        for (let i = 0; i < this.triples.length; i++){
            let tripleBoard = this.triples[i].map(
                (index) => this.gameBoard[index]
            )

            let hasAtleastTwoTriple = tripleBoard.filter(( pos, index ) => 
                pos === player.symbol
            ).length === 2


            let availablePositionIsEmpty = tripleBoard.includes('');

            if (hasAtleastTwoTriple && availablePositionIsEmpty){
                return this.triples[i][tripleBoard.indexOf('')]
            }
        }
        let availablePositions = this.availablePositions();
        return availablePositions[Math.floor(Math.random() * availablePositions.length)]
    }
}


class HumanPlayer{
    constructor(symbol){
        this.name = 'HumanPlayer';
        this.symbol = symbol
    }
}

class AIPlayer{
    constructor(symbol){
        this.name = 'AIPlayer';
        this.symbol = symbol
    }
}

const player1 = new AIPlayer('X');
const player2 = new AIPlayer('O');

const game = new Game(player1, player2);
game.play();