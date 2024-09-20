import { createCellElements, createPieceElements } from "./function.js"

export default class ChessBoard {
    constructor(chessboardElement) {
        this.reverse = false
        this.cells = this.reverse == false ? createCellElements(chessboardElement).map((cellElement, index) => {
            return new Cell(index % 8, Math.floor(index / 8), cellElement)
        }) : createCellElements(chessboardElement).reverse().map((cellElement, index) => {
            return new Cell(index % 8, Math.floor(index / 8), cellElement)
        })
        this.pieces = createPieceElements(chessboardElement, this.reverse)
        this.chessboardElement = chessboardElement
    }
}

class Cell {
    constructor(x, y, cellElement) {
        this.x = x
        this.y = y
        this.cellElement = cellElement
        if (this.x % 2 == 0 && this.y % 2 == 0 || this.x % 2 == 1 && this.y % 2 == 1) {
            this.cellElement.classList.add("white")
        } else {
            this.cellElement.classList.add("black")
        }
        this.cellElement.innerHTML = this.x + "•" + this.y
    }
}