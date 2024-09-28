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

export function setPlacementForMobile() {
    function myFunction(x) {
        if (x.matches) {
            document.documentElement.style.setProperty("--cell-size", "12vw")
        } else {
            document.documentElement.style.setProperty("--cell-size", "8vh")
        }
    }

    const mmObj = window.matchMedia("(max-width: 425px)")

    myFunction(mmObj)

    mmObj.addEventListener("change", function () {
        console.log("Has Changed")
        myFunction(mmObj);
    });
}

export function dragPieceOnDesktop(chessboard, chessboardElement) {
    let x = undefined, y = undefined
    chessboard.pieces.forEach(piece => {
        piece.pieceElement.addEventListener("mousedown", () => {
            x = piece.x
            y = piece.y
            document.addEventListener("mousemove", document.fn = function fn(e) {
                piece.pieceElement.style.setProperty("cursor", "grabbing")
                piece.pieceElement.style.setProperty("z-index", "1")

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
                        const flag = document.documentElement.style.getPropertyValue('--cell-size')
                        const unit = viewportToPixel(flag) / 2
                        piece.pieceElement.style.setProperty("top", `calc(${e.clientY}px - ${chessboardElement.offsetTop}px - ${unit}px)`)

                        if (chessboard.reverse) {
                            y = 7 - Math.floor((e.clientY - (chessboardElement.offsetTop)) / viewportToPixel(document.documentElement.style.getPropertyValue('--cell-size')))
                        } else {
                            y = Math.floor((e.clientY - (chessboardElement.offsetTop)) / viewportToPixel(document.documentElement.style.getPropertyValue('--cell-size')))
                        }
                    }
                }

                if (e.clientX < chessboardElement.offsetLeft) {
                    piece.pieceElement.style.setProperty("left", "calc(-0.5 * var(--cell-size)")
                    if (chessboard.reverse) {
                        x = 7
                    } else {
                        x = 0
                    }
                } else {
                    if (e.clientX > (chessboardElement.offsetLeft + viewportToPixel(document.documentElement.style.getPropertyValue('--cell-size')) * 8)) {
                        piece.pieceElement.style.setProperty("left", "calc(7.5 * var(--cell-size)")
                        if (chessboard.reverse) {
                            x = 0
                        } else {
                            x = 7
                        }
                    } else {
                        const flag = document.documentElement.style.getPropertyValue('--cell-size')
                        const unit = viewportToPixel(flag) / 2
                        piece.pieceElement.style.setProperty("left", `calc(${e.clientX}px - ${chessboardElement.offsetLeft}px - ${unit}px)`)
                        if (chessboard.reverse) {
                            x = 7 - Math.floor((e.clientX - (chessboardElement.offsetLeft)) / viewportToPixel(document.documentElement.style.getPropertyValue('--cell-size')))
                        } else {
                            x = Math.floor((e.clientX - (chessboardElement.offsetLeft)) / viewportToPixel(document.documentElement.style.getPropertyValue('--cell-size')))
                        }
                    }
                }
                console.log({ x, y })
            })

            document.addEventListener("mouseup", document.fn1 = function fn1() {
                document.removeEventListener("mousemove", document.fn)
                document.removeEventListener('mouseup', document.fn1)

                piece.pieceElement.style.setProperty("cursor", "grab")
                piece.pieceElement.style.setProperty("z-index", "0")

                piece.rePlacePiece(x, y)

                x = undefined
                y = undefined
                console.log(piece)
            })
        })
    })
}

export function dragPieceOnMobile(chessboard, chessboardElement) {
    let x = undefined, y = undefined
    chessboard.pieces.forEach(piece => {
        piece.pieceElement.addEventListener("touchstart", (e) => {
            e.preventDefault()
            x = piece.x
            y = piece.y

            //for test
            const touch = [...e.changedTouches][0]

            const dot = document.createElement("div")
            dot.classList.add("dot")
            dot.style.top = `${touch.clientY}px`
            dot.style.left = `${touch.clientX}px`
            dot.id = touch.identifier
            document.body.append(dot)
            //for test

            piece.pieceElement.style.setProperty("transform", "scale(3,3)")
            piece.pieceElement.style.setProperty("z-index", "1")
        })

        piece.pieceElement.addEventListener("touchmove", e => {
            const touch = [...e.changedTouches][0]

            //for test
            const dot = document.getElementById(touch.identifier)
            dot.style.top = `${touch.clientY}px`
            dot.style.left = `${touch.clientX}px`
            //for test

            if (touch.clientY < chessboardElement.offsetTop) {
                piece.pieceElement.style.setProperty("top", "calc(-0.5 * var(--cell-size)")
                if (chessboard.reverse) {
                    y = 7
                } else {
                    y = 0
                }
            } else {
                if (touch.clientY > (chessboardElement.offsetTop + viewportToPixel(document.documentElement.style.getPropertyValue('--cell-size')) * 8)) {
                    piece.pieceElement.style.setProperty("top", "calc(7.5 * var(--cell-size)")
                    if (chessboard.reverse) {
                        y = 0
                    } else {
                        y = 7
                    }
                } else {
                    const flag = document.documentElement.style.getPropertyValue('--cell-size')
                    const unit = viewportToPixel(flag) / 2
                    piece.pieceElement.style.setProperty("top", `calc(${touch.clientY}px - ${chessboardElement.offsetTop}px - ${unit}px)`)

                    if (chessboard.reverse) {
                        y = 7 - Math.floor((touch.clientY - (chessboardElement.offsetTop)) / viewportToPixel(document.documentElement.style.getPropertyValue('--cell-size')))
                    } else {
                        y = Math.floor((touch.clientY - (chessboardElement.offsetTop)) / viewportToPixel(document.documentElement.style.getPropertyValue('--cell-size')))
                    }
                }
            }

            if (touch.clientX < chessboardElement.offsetLeft) {
                piece.pieceElement.style.setProperty("left", "calc(-0.5 * var(--cell-size)")
                if (chessboard.reverse) {
                    x = 7
                } else {
                    x = 0
                }
            } else {
                if (touch.clientX > (chessboardElement.offsetLeft + + viewportToPixel(document.documentElement.style.getPropertyValue('--cell-size')) * 8)) {
                    piece.pieceElement.style.setProperty("left", "calc(7.5 * var(--cell-size)")
                    if (chessboard.reverse) {
                        x = 0
                    } else {
                        x = 7
                    }
                } else {
                    const flag = document.documentElement.style.getPropertyValue('--cell-size')
                    const unit = viewportToPixel(flag) / 2
                    piece.pieceElement.style.setProperty("left", `calc(${touch.clientX}px - ${chessboardElement.offsetLeft}px - ${unit}px)`)
                    if (chessboard.reverse) {
                        x = 7 - Math.floor((touch.clientX - (chessboardElement.offsetLeft)) / viewportToPixel(document.documentElement.style.getPropertyValue('--cell-size')))
                    } else {
                        x = Math.floor((touch.clientX - (chessboardElement.offsetLeft)) / viewportToPixel(document.documentElement.style.getPropertyValue('--cell-size')))
                    }
                }
            }

            console.log({ x, y })
        })

        piece.pieceElement.addEventListener("touchend", (e) => {
            const touch = [...e.changedTouches][0]

            piece.pieceElement.style.setProperty("transform", "scale(1,1)")
            piece.pieceElement.style.setProperty("z-index", "0")
            piece.rePlacePiece(x, y)
            x = undefined
            y = undefined

            //for test
            const dot = document.getElementById(touch.identifier)
            dot.remove()
            //for test
        })
    })
}

export function viewportToPixel(unit) {
    switch (unit) {
        case "12vw":
            return window.innerWidth * 12 / 100
        case "8vh":
            return window.innerHeight * 8 / 100
    }
}