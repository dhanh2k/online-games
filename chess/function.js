import Piece from "./Piece.js"

export function createCellElements(chessboardElement){
    const cells = []
    for(let i = 0; i < 64; i++){
        const cell = document.createElement("div")
        chessboardElement.appendChild(cell)
        cells.push(cell)
    }
    return cells
}

export function createPieceElements(chessboardElement, reverse){
    const pieces = []

    // pieces.push(new Piece(3, 0, "king", "white", reverse))
    // pieces.push(new Piece(3, 7, "king", "black", reverse))

    // pieces.push(new Piece(4, 0, "queen", "white", reverse))
    // pieces.push(new Piece(4, 7, "queen", "black", reverse))

    // pieces.push(new Piece(2, 0, "bishop", "white", reverse))
    // pieces.push(new Piece(5, 0, "bishop", "white", reverse))
    // pieces.push(new Piece(2, 7, "bishop", "black", reverse))
    // pieces.push(new Piece(5, 7, "bishop", "black", reverse))

    // pieces.push(new Piece(1, 0, "knight", "white", reverse))
    // pieces.push(new Piece(6, 0, "knight", "white", reverse))
    // pieces.push(new Piece(1, 7, "knight", "black", reverse))
    // pieces.push(new Piece(6, 7, "knight", "black", reverse))

    // pieces.push(new Piece(0, 0, "rook", "white", reverse))
    // pieces.push(new Piece(7, 0, "rook", "white", reverse))
    // pieces.push(new Piece(0, 7, "rook", "black", reverse))
    // pieces.push(new Piece(7, 7, "rook", "black", reverse))

    // pieces.push(new Piece(0, 1, "pawn", "white", reverse))
    // pieces.push(new Piece(1, 1, "pawn", "white", reverse))
    // pieces.push(new Piece(2, 1, "pawn", "white", reverse))
    // pieces.push(new Piece(3, 1, "pawn", "white", reverse))
    // pieces.push(new Piece(4, 1, "pawn", "white", reverse))
    // pieces.push(new Piece(5, 1, "pawn", "white", reverse))
    // pieces.push(new Piece(6, 1, "pawn", "white", reverse))
    // pieces.push(new Piece(7, 1, "pawn", "white", reverse))
    // pieces.push(new Piece(0, 6, "pawn", "black", reverse))
    // pieces.push(new Piece(1, 6, "pawn", "black", reverse))
    // pieces.push(new Piece(2, 6, "pawn", "black", reverse))
    // pieces.push(new Piece(3, 6, "pawn", "black", reverse))
    // pieces.push(new Piece(4, 6, "pawn", "black", reverse))
    // pieces.push(new Piece(5, 6, "pawn", "black", reverse))
    // pieces.push(new Piece(6, 6, "pawn", "black", reverse))
    // pieces.push(new Piece(7, 6, "pawn", "black", reverse))

    //for testing
    pieces.push(new Piece(3, 7, "king", "black", reverse))
    pieces.push(new Piece(3, 3, "king", "white", reverse))

    pieces.forEach(piece => {
        chessboardElement.appendChild(piece.pieceElement)
    })

    return pieces
}