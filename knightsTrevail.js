class queue {
    constructor() {
        this.list = [];
        this.frontIndex = 0;
        this.backIndex = 0;
        this.size = 0;
    }

    // adds item to the end of the array
    enqueue(item) {
        this.list[this.backIndex] = item;
        this.backIndex++;
        this.size++;
    }

    // remove the first item from array and return it
    dequeue() {
        const temp = this.list[this.frontIndex];
        this.frontIndex++;
        this.size--;
        return temp;
    }
}

// Node keeps track of visited status as well as possible moves 
class Node {
    constructor(x, y) {
        this.coordinates = [x, y];
        this.possibleMoves = this.possibleMoves(x, y);
        this.visited = false;
    }

    // return an array of the possible moves based on the node's current co-ordinates
    possibleMoves(x, y) {
        const array = [];
        this.createPossibleMove(x - 1, y + 2, array);
        this.createPossibleMove(x - 2, y + 1, array);
        this.createPossibleMove(x - 2, y - 1, array);
        this.createPossibleMove(x - 1, y - 2, array);
        this.createPossibleMove(x + 1, y + 2, array);
        this.createPossibleMove(x + 2, y + 1, array);
        this.createPossibleMove(x + 2, y - 1, array);
        this.createPossibleMove(x + 1, y - 2, array);
        return array;
    }

    // check if the square is out of bounds
    createPossibleMove(x, y, array) {
        if (x < 0 || x > 7 || y < 0 || y > 7) {
            return;
        }
        array.push([x, y]);
    }


}

// create a board and fill each square with a node
class board {
    constructor() {
        this.board = this.initialiseBoard();
    }

    initialiseBoard() {
        let board = [];
        for (let x = 0; x < 8; x++) {
            board[x] = [];
            for (let y = 0; y < 8; y++) {
                board[x].push(new Node(x, y));
            }
        }
        return board;
    }
}


// takes a start and end point. returns the path taken to reach the endpoint
function findPath(board, startPoint, endPoint) {

    // queue will contain squares to visit next as well as their previous paths
    const q = new queue();
    const boardArray = board.board;

    // enqueue the starting square as well as current path
    q.enqueue([startPoint, []]);
    boardArray[startPoint[0]][startPoint[1]].visited = true;
    
    while (q.size) {

        // pop current square
        const queueItem = q.dequeue();
        const currSquare = queueItem[0];
        let path = queueItem[1];

        // if square is the end point, return path
        if (currSquare[0] == endPoint[0] && currSquare[1] == endPoint[1]) {
            path = [...path, currSquare];
            return path;
        }
        // get all possible moves of current square
        const possibleMovesArray = boardArray[currSquare[0]][currSquare[1]].possibleMoves;

        // loop through the array and push them to queue unless visited
        possibleMovesArray.forEach((element) => {
            if (!boardArray[element[0]][element[1]].visited) {
                q.enqueue([element, [...path, currSquare]]);
                boardArray[element[0]][element[1]].visited = true;
            }
        });
    }
}

// const initialise the new board
const newBoard = new board();

console.log(findPath(newBoard, [0,0], [7,7]));






