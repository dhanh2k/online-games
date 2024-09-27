import Piece from "./Piece.js"

export function createCellElements(chessboardElement) {
    const cells = []
    for (let i = 0; i < 64; i++) {
        const cell = document.createElement("div")
        chessboardElement.appendChild(cell)
        cells.push(cell)
    }
    return cells
}

export function createPieceElements(chessboardElement, reverse) {
    const pieces = []

    pieces.push(new Piece(3, 0, "king", "white", reverse))
    pieces.push(new Piece(3, 7, "king", "black", reverse))

    pieces.push(new Piece(4, 0, "queen", "white", reverse))
    pieces.push(new Piece(4, 7, "queen", "black", reverse))

    pieces.push(new Piece(2, 0, "bishop", "white", reverse))
    pieces.push(new Piece(5, 0, "bishop", "white", reverse))
    pieces.push(new Piece(2, 7, "bishop", "black", reverse))
    pieces.push(new Piece(5, 7, "bishop", "black", reverse))

    pieces.push(new Piece(1, 0, "knight", "white", reverse))
    pieces.push(new Piece(6, 0, "knight", "white", reverse))
    pieces.push(new Piece(1, 7, "knight", "black", reverse))
    pieces.push(new Piece(6, 7, "knight", "black", reverse))

    pieces.push(new Piece(0, 0, "rook", "white", reverse))
    pieces.push(new Piece(7, 0, "rook", "white", reverse))
    pieces.push(new Piece(0, 7, "rook", "black", reverse))
    pieces.push(new Piece(7, 7, "rook", "black", reverse))

    pieces.push(new Piece(0, 1, "pawn", "white", reverse))
    pieces.push(new Piece(1, 1, "pawn", "white", reverse))
    pieces.push(new Piece(2, 1, "pawn", "white", reverse))
    pieces.push(new Piece(3, 1, "pawn", "white", reverse))
    pieces.push(new Piece(4, 1, "pawn", "white", reverse))
    pieces.push(new Piece(5, 1, "pawn", "white", reverse))
    pieces.push(new Piece(6, 1, "pawn", "white", reverse))
    pieces.push(new Piece(7, 1, "pawn", "white", reverse))
    pieces.push(new Piece(0, 6, "pawn", "black", reverse))
    pieces.push(new Piece(1, 6, "pawn", "black", reverse))
    pieces.push(new Piece(2, 6, "pawn", "black", reverse))
    pieces.push(new Piece(3, 6, "pawn", "black", reverse))
    pieces.push(new Piece(4, 6, "pawn", "black", reverse))
    pieces.push(new Piece(5, 6, "pawn", "black", reverse))
    pieces.push(new Piece(6, 6, "pawn", "black", reverse))
    pieces.push(new Piece(7, 6, "pawn", "black", reverse))

    // //for testing
    // pieces.push(new Piece(3, 5, "king", "black", reverse))
    // pieces.push(new Piece(4, 3, "king", "white", reverse))

    pieces.forEach(piece => {
        chessboardElement.appendChild(piece.pieceElement)
    })

    return pieces
}

export function setPlacementForMobile(chessboard) {
    function myFunction(x) {
        if (x.matches) {
            chessboard.pieces.forEach(piece => {
                // piece.pieceElement.style.setProperty("--cell-size", "12vw")
                // chessboard.chessboardElement.style.setProperty("--cell-size", "12vw")
                document.documentElement.style.setProperty("--cell-size", "12vw")

            })
            dragPieceOnMobile(chessboard, chessboard.chessboardElement)
        } else {
            chessboard.pieces.forEach(piece => {
                // piece.pieceElement.style.setProperty("--cell-size", "8vh")
                document.documentElement.style.setProperty("--cell-size", "8vh")
            })
            dragPieceOnDesktop(chessboard, chessboard.chessboardElement)
        }
    }

    const mmObj = window.matchMedia("(max-width: 425px)")

    myFunction(mmObj)

    mmObj.addEventListener("change", function () {
        console.log("Has Changed")
        myFunction(mmObj);
    });
}

export function dragPieceOnDesktop(chessboard, chessboardElement){
    let x = undefined, y = undefined
    chessboard.pieces.forEach(piece => {
        piece.pieceElement.addEventListener("mousedown", () => {
            x = piece.x
            y = piece.y
            document.addEventListener("mousemove", document.fn = function fn(e) {
                piece.pieceElement.style.setProperty("cursor", "grabbing")
                piece.pieceElement.style.setProperty("z-index", "1")
                
                // console.log(viewportToPixel(document.documentElement.style.getPropertyValue('--cell-size')))

                if (e.clientY < chessboardElement.offsetTop) {
                    piece.pieceElement.style.setProperty("top", "calc(-0.5 * var(--cell-size)")
                    if (chessboard.reverse) {
                        y = 7
                    } else {
                        y = 0
                    }
                } else {
                    if (e.clientY > (chessboardElement.offsetTop + viewportToPixel(document.documentElement.style.getPropertyValue('--cell-size')) * 8)) {
                        piece.pieceElement.style.setProperty("top", "calc(7.5 * var(--cell-size)")
                        if (chessboard.reverse) {
                            y = 0
                        } else {
                            y = 7
                        }
                    } else {
                        // piece.pieceElement.style.top = e.clientY - (chessboardElement.offsetTop) - (document.documentElement.clientHeight * 0.04) + 'px'
                        // piece.pieceElement.style.setProperty("top", `calc(${e.clientY} - ${chessboardElement.offsetTop} - ${viewportToPixel(document.documentElement.style.getPropertyValue('--cell-size'))}/2`)

                        if (chessboard.reverse) {
                            y = 7 - Math.floor((e.clientY - (chessboardElement.offsetTop)) / (document.documentElement.clientHeight * 0.08))
                        } else {
                            y = Math.floor((e.clientY - (chessboardElement.offsetTop)) / viewportToPixel(document.documentElement.style.getPropertyValue('--cell-size')))
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
    
                piece.rePlacePiece(x, y)
                x = undefined
                y = undefined
                console.log(piece)
            })
        })
    })
}

export function dragPieceOnMobile(chessboard, chessboardElement){
    let xTouch = undefined, yTouch = undefined
    chessboard.pieces.forEach(piece => {
        piece.pieceElement.addEventListener("touchstart", (e) => {
            e.preventDefault()
            xTouch = piece.x
            yTouch = piece.y
    
            piece.pieceElement.style.setProperty("transform", "scale(3,3)")
            piece.pieceElement.style.setProperty("z-index", "1")
        })
    
        piece.pieceElement.addEventListener("touchmove", e => {
            const touch = [...e.changedTouches][0]
    
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
    
        piece.pieceElement.addEventListener("touchend", () => {
            piece.pieceElement.style.setProperty("transform", "scale(1,1)")
            piece.pieceElement.style.setProperty("z-index", "0")
            piece.rePlacePiece(xTouch, yTouch)
            xTouch = undefined
            yTouch = undefined
        })
    })
}

export function viewportToPixel(unit){
    switch(unit){
        case "12vw":
            return window.innerWidth * 12 / 100
        case "8vh":
            return window.innerHeight * 8 / 100
    }
}