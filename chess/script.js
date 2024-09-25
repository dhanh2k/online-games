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
            piece.pieceElement.style.setProperty("z-index", "1")

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
            piece.pieceElement.style.setProperty("z-index", "0")

            document.removeEventListener("mousemove", document.fn)
            document.removeEventListener('mouseup', document.fn1)
        })
    })
})

let xTouch = undefined, yTouch = undefined

chessboard.pieces.forEach(piece => {
    piece.pieceElement.addEventListener("touchstart", (e) => {
        e.preventDefault()
        const touch = [...e.changedTouches][0];

        const dot = document.createElement("div")
        dot.classList.add("dot")
        dot.style.top = `${touch.clientY}px`
        dot.style.left = `${touch.clientX}px`
        dot.id = touch.identifier
        document.body.append(dot)

        piece.pieceElement.style.setProperty("transform", "scale(3,3)")
        piece.pieceElement.style.setProperty("z-index", "1")

        piece.pieceElement.addEventListener("touchmove", e => {
            const touch = [...e.changedTouches][0]

            const dot = document.getElementById(touch.identifier)
            dot.style.top = `${touch.clientY}px`
            dot.style.left = `${touch.clientX}px`

            if (touch.clientY < chessboardElement.offsetTop) {
                piece.pieceElement.style.top = -6 + 'vw'
                if (chessboard.reverse) {
                    yTouch = 7
                } else {
                    yTouch = 0
                }
            } else {
                if (touch.clientY > (chessboardElement.offsetTop + (document.documentElement.clientWidth * 0.96))) {
                    piece.pieceElement.style.top = 90 + 'vw'
                    if (chessboard.reverse) {
                        yTouch = 0
                    } else {
                        yTouch = 7
                    }
                } else {
                    piece.pieceElement.style.top = touch.clientY - (chessboardElement.offsetTop) - (document.documentElement.clientWidth * 0.06) + 'px'
                    if (chessboard.reverse) {
                        yTouch = 7 - Math.floor((touch.clientY - (chessboardElement.offsetTop)) / (document.documentElement.clientWidth * 0.12))
                    } else {
                        yTouch = Math.floor((touch.clientY - (chessboardElement.offsetTop)) / (document.documentElement.clientWidth * 0.12))
                    }
                }
            }

            if (touch.clientX < chessboardElement.offsetLeft) {
                piece.pieceElement.style.left = -6 + 'vw'
                if (chessboard.reverse) {
                    xTouch = 7
                } else {
                    xTouch = 0
                }
            } else {
                if (touch.clientX > (chessboardElement.offsetLeft + (document.documentElement.clientWidth * 0.96))) {
                    piece.pieceElement.style.left = 90 + 'vw'
                    if (chessboard.reverse) {
                        xTouch = 0
                    } else {
                        xTouch = 7
                    }
                } else {
                    piece.pieceElement.style.left = touch.clientX - (chessboardElement.offsetLeft) - (document.documentElement.clientWidth * 0.06) + 'px'
                    if (chessboard.reverse) {
                        xTouch = 7 - Math.floor((touch.clientX - (chessboardElement.offsetLeft)) / (document.documentElement.clientWidth * 0.12))
                    } else {
                        xTouch = Math.floor((touch.clientX - (chessboardElement.offsetLeft)) / (document.documentElement.clientWidth * 0.12))
                    }
                }
            }

            console.log("X: ", xTouch, "Y: ", yTouch)
        })

        piece.pieceElement.addEventListener("touchend", e => {
            const touch = [...e.changedTouches][0];
            const dot = document.getElementById(touch.identifier)
            dot.remove()
            piece.pieceElement.style.setProperty("transform", "scale(1,1)")
            piece.pieceElement.style.setProperty("z-index", "0")
        })
    })
})

export function sayHello() {
    console.log("Hello")
}