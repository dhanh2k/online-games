import ChessBoard from "./ChessBoard.js";

const chessboardElement = document.getElementById("chessboard")

const chessboard = new ChessBoard(chessboardElement)

// Create a match Function
function myFunction(x) {
    if (x.matches) {
        chessboard.pieces.forEach(piece => {
            piece.pieceElement.style.setProperty("--cell-size", "11vw")
        })
    } else {
        chessboard.pieces.forEach(piece => {
            piece.pieceElement.style.setProperty("--cell-size", "8vh")
        })
    }
}

// Create a MediaQueryList object
const mmObj = window.matchMedia("(max-width: 400px)")

//   // Call the match function at run time
//   myFunction(mmObj);

// Add the match function as a listener for state changes
mmObj.addEventListener("change", function () {
    myFunction(mmObj);
});

console.log(chessboard)