var candies = ["blue", "purple", "red", "yellow", "orange", "green"];
var board = [];
var rows = 10;
var columns = 10;
var score = 0;
var invalidTurns, validTurn = 0;
var allowedMoves = 20;

window.onload = function () {
    document.getElementById("startGame").click();
    startGame();
    window.setInterval(function () {
        popCandy();
        slideCandy();
        spawnCandy();
    }, 100);
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // <img id="0-0" src="./images/Red.png">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); //click on a candy, initialize drag process
            tile.addEventListener("dragover", dragOver);  //clicking on candy, moving mouse to drag the candy
            tile.addEventListener("dragenter", dragEnter); //dragging candy onto another candy
            tile.addEventListener("dragleave", dragLeave); //leave candy over another candy
            tile.addEventListener("drop", dragDrop); //dropping a candy over another candy
            tile.addEventListener("dragend", dragEnd); //after drag process completed, we swap candies

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}
function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)];
}

function popCandy() {
    popFourCandys();
    popThreeCandys();
    document.getElementById("score").innerText = score;
    document.getElementById("turns").innerText = validTurn;
}
function slideCandy() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = columns - 1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }

        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./images/blank.png";
        }
    }
}
function spawnCandy() {
    for (let c = 0; c < columns; c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./images/" + randomCandy() + ".png";
        }
    }
}
function checkValid() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    return false;
}
//#region Crush candy functions
function popThreeCandys() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
                console.log("trei")
                playSoundEffect("popThreeCandys");
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
                console.log("trei")
                playSoundEffect("popThreeCandys");
            }
        }
    }

}
function popFourCandys() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            let candy4 = board[r][c + 3];
            if (candy1.src == candy2.src
                && candy2.src == candy3.src
                && candy3.src == candy4.src
                && !candy1.src.includes("blank")) {

                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                score += 40;
                console.log("patru")
                playSoundEffect("popFourCandys");
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            let candy4 = board[r + 3][c];

            if (candy1.src == candy2.src
                && candy2.src == candy3.src
                && candy3.src == candy4.src
                && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                score += 40;
                console.log("patru")
                playSoundEffect("popFourCandys");
            }
        }
    }
}
//#endregion
//#region event listener functions
function dragStart() {
    //this refers to tile that was clicked on for dragging
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    //this refers to the target tile that was dropped on
    otherTile = this;
}
function dragEnd() {

    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }

    let currCoords = currTile.id.split("-"); // id="0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c - 1 && r == r2;
    let moveRight = c2 == c + 1 && r == r2;

    let moveUp = r2 == r - 1 && c == c2;
    let moveDown = r2 == r + 1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();
        if (!validMove) {

            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;


        } else {

            validTurn++;
            let remaningMoves = allowedMoves - validTurn;
            playSoundEffect("popThreeCandys");
            //document.getElementById("remaningTurns").innerText = remaningMoves;
            if (remaningMoves == 0) {
                document.getElementById("board").innerText = "Game over fraier! Scor: " + score;
                playSoundEffect("gameOver");
            }
        }

    }

    invalidTurns++;
}
//#endregion

//#region Sound Effects

function playSoundEffect(effect) {
    var soundEfectPop;
    switch (effect) {
        case "popThreeCandys":
            soundEfectPop = new Audio("./sounds/popThreeCandys.wav")
            break;
        case "popFourCandys":
            soundEfectPop = new Audio("./sounds/popFourCandys.wav")
            break;
        case "gameOver":
            soundEfectPop = new Audio("./sounds/gameOver.wav")
            break;
        default:
            alert("sound effect dosnt exist")
            break
    }
    soundEfectPop.play();
}
//#endregion