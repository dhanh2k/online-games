import ChessBoard from "./ChessBoard.js";
import { setPlacementForMobile } from "./function.js";

const chessboardElement = document.getElementById("chessboard")

const chessboard = new ChessBoard(chessboardElement)

setPlacementForMobile(chessboard)

let x = undefined, y = undefined

chessboard.pieces.forEach(piece => {
    piece.pieceElement.addEventListener("mousedown", () => {
        document.addEventListener("mousemove", document.fn = function fn(e) {
            piece.pieceElement.style.setProperty("cursor", "grabbing")

            if (e.clientY < chessboardElement.offsetTop) {
                piece.pieceElement.style.top = -4 + 'vh'
                if (chessboard.reverse) {
                    y = 7
                } else {
                    y = 0
                }
            } else {
                if (e.clientY > (chessboardElement.offsetTop + (document.documentElement.clientHeight * 0.64))) {
                    piece.pieceElement.style.top = 60 + 'vh'
                    if (chessboard.reverse) {
                        y = 0
                    } else {
                        y = 7
                    }
                } else {
                    piece.pieceElement.style.top = e.clientY - (chessboardElement.offsetTop) - (document.documentElement.clientHeight * 0.04) + 'px'
                    if (chessboard.reverse) {
                        y = 7 - Math.floor((e.clientY - (chessboardElement.offsetTop)) / (document.documentElement.clientHeight * 0.08))
                    } else {
                        y = Math.floor((e.clientY - (chessboardElement.offsetTop)) / (document.documentElement.clientHeight * 0.08))
                    }
                }
            }

            if (e.clientX < chessboardElement.offsetLeft) {
                piece.pieceElement.style.left = -4 + 'vh'
                if (chessboard.reverse) {
                    x = 7
                } else {
                    x = 0
                }
            } else {
                if (e.clientX > (chessboardElement.offsetLeft + (document.documentElement.clientHeight * 0.64))) {
                    piece.pieceElement.style.left = 60 + 'vh'
                    if (chessboard.reverse) {
                        y = 0
                    } else {
                        y = 7
                    }
                } else {
                    piece.pieceElement.style.left = e.clientX - (chessboardElement.offsetLeft) - (document.documentElement.clientHeight * 0.04) + 'px'
                    if (chessboard.reverse) {
                        x = 7 - Math.floor((e.clientX - (chessboardElement.offsetLeft)) / (document.documentElement.clientHeight * 0.08))
                    } else {
                        x = Math.floor((e.clientX - (chessboardElement.offsetLeft)) / (document.documentElement.clientHeight * 0.08))
                    }
                }
            }
            console.log("X: ", x, "Y: ", y)
        })

        document.addEventListener("mouseup", document.fn1 = function fn1() {
            piece.pieceElement.style.setProperty("cursor", "grab")

            document.removeEventListener("mousemove", document.fn)
            document.removeEventListener('mouseup', document.fn1)
        })
    })
})

export function sayHello(){
    console.log("Hello")
}