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
    let lastMovedPiece = undefined
    chessboard.pieces.forEach(piece => {
        piece.pieceElement.addEventListener("mousedown", () => {
            x = piece.x
            y = piece.y

            //find available Move
            // console.log(findAvailableMove(piece, x, y))
            // console.log(deleteBlockedMove(piece, chessboard, findAvailableMove(piece, x, y)))
            highlightAvailableMove(chessboard, deleteBlockedMove(piece, chessboard, findAvailableMove(piece, x, y), lastMovedPiece))

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

                if (piece.x != x || piece.y != y) {
                    lastMovedPiece = piece
                }

                movePiece(chessboard, x, y, piece)

                x = undefined
                y = undefined

                // console.log(chessboard.pieces)
                // console.log({ lastMovedPiece })

                unHighlightAvailableMove(chessboard)
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

            removePiece(chessboard, x, y, piece)

            // piece.rePlacePiece(x, y)
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

export function findPiece(chessboard, x, y) {
    return chessboard.pieces.filter((piece) => {
        return piece.x == x && piece.y == y
    })[0]
}

export function findCell(chessboard, x, y) {
    return chessboard.cells.filter((cell) => {
        return cell.x == x && cell.y == y
    })[0]
}

export function movePiece(chessboard, x, y, piece) {
    const targetPiece = findPiece(chessboard, x, y)
    if (targetPiece) {
        if (piece.color != targetPiece.color) {
            targetPiece.pieceElement.remove()
            chessboard.pieces.splice(chessboard.pieces.indexOf(targetPiece), 1)
            piece.rePlacePiece(x, y)
        } else {
            piece.rePlacePiece(piece.x, piece.y)
        }
    } else {
        piece.rePlacePiece(x, y)
    }
}

export function findAvailableMove(piece, x, y) {
    switch (piece.type) {
        // case "king":
        //     const kingCoordinates = [
        //         [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
        //         [x - 1, y], [x + 1, y],
        //         [x - 1, y + 1], [x, y + 1], [x + 1, y + 1]
        //     ]

        //     const kingAvailableCoordinates = kingCoordinates.filter((value) => {
        //         return value[0] >= 0 && value[1] >= 0 && value[0] <= 7 && value[1] <= 7
        //     })

        //     return kingAvailableCoordinates

        case "queen":
            const queenCoordinates = [
                [x, y + 1], [x, y + 2], [x, y + 3], [x, y + 4], [x, y + 5], [x, y + 6], [x, y + 7],
                [x, y - 1], [x, y - 2], [x, y - 3], [x, y - 4], [x, y - 5], [x, y - 6], [x, y - 7],
                [x - 1, y], [x - 2, y], [x - 3, y], [x - 4, y], [x - 5, y], [x - 6, y], [x - 7, y],
                [x + 1, y], [x + 2, y], [x + 3, y], [x + 4, y], [x + 5, y], [x + 6, y], [x + 7, y],
                [x - 1, y - 1], [x - 2, y - 2], [x - 3, y - 3], [x - 4, y - 4], [x - 5, y - 5], [x - 6, y - 6], [x - 7, y - 7],
                [x + 1, y + 1], [x + 2, y + 2], [x + 3, y + 3], [x + 4, y + 4], [x + 5, y + 5], [x + 6, y + 6], [x + 7, y + 7],
                [x + 1, y - 1], [x + 2, y - 2], [x + 3, y - 3], [x + 4, y - 4], [x + 5, y - 5], [x + 6, y - 6], [x + 7, y - 7],
                [x - 1, y + 1], [x - 2, y + 2], [x - 3, y + 3], [x - 4, y + 4], [x - 5, y + 5], [x - 6, y + 6], [x - 7, y + 7]
            ]

            const queenAvailableCoordinates = queenCoordinates.filter((value) => {
                return value[0] >= 0 && value[1] >= 0 && value[0] <= 7 && value[1] <= 7
            })

            return queenAvailableCoordinates
        case "bishop":
            const bishopCoordinates = [
                [x - 1, y - 1], [x - 2, y - 2], [x - 3, y - 3], [x - 4, y - 4], [x - 5, y - 5], [x - 6, y - 6], [x - 7, y - 7],
                [x + 1, y + 1], [x + 2, y + 2], [x + 3, y + 3], [x + 4, y + 4], [x + 5, y + 5], [x + 6, y + 6], [x + 7, y + 7],
                [x + 1, y - 1], [x + 2, y - 2], [x + 3, y - 3], [x + 4, y - 4], [x + 5, y - 5], [x + 6, y - 6], [x + 7, y - 7],
                [x - 1, y + 1], [x - 2, y + 2], [x - 3, y + 3], [x - 4, y + 4], [x - 5, y + 5], [x - 6, y + 6], [x - 7, y + 7]
            ]

            const bishopAvailableCoordinates = bishopCoordinates.filter((value) => {
                return value[0] >= 0 && value[1] >= 0 && value[0] <= 7 && value[1] <= 7
            })

            return bishopAvailableCoordinates
        case "knight":
            const knightCoordinates = [
                [x - 1, y - 2], [x + 1, y - 2],
                [x - 2, y - 1], [x - 2, y + 1],
                [x + 2, y - 1], [x + 2, y + 1],
                [x - 1, y + 2], [x + 1, y + 2]
            ]

            const KnightAvailableCoordinates = knightCoordinates.filter((value) => {
                return value[0] >= 0 && value[1] >= 0 && value[0] <= 7 && value[1] <= 7
            })

            return KnightAvailableCoordinates
        case "rook":
            const rookCoordinates = [
                [x, y + 1], [x, y + 2], [x, y + 3], [x, y + 4], [x, y + 5], [x, y + 6], [x, y + 7],
                [x, y - 1], [x, y - 2], [x, y - 3], [x, y - 4], [x, y - 5], [x, y - 6], [x, y - 7],
                [x - 1, y], [x - 2, y], [x - 3, y], [x - 4, y], [x - 5, y], [x - 6, y], [x - 7, y],
                [x + 1, y], [x + 2, y], [x + 3, y], [x + 4, y], [x + 5, y], [x + 6, y], [x + 7, y]
            ]

            const rookAvailableCoordinates = rookCoordinates.filter((value) => {
                return value[0] >= 0 && value[1] >= 0 && value[0] <= 7 && value[1] <= 7
            })

            return rookAvailableCoordinates
        case "pawn":
            if (piece.color == "white") {
                const whitePawnCoordinates = [[x, y + 1], [x - 1, y + 1], [x + 1, y + 1]]
                if (y == 1) {
                    whitePawnCoordinates.push([x, y + 2])
                }

                const whitePawnAvailableCoordinates = whitePawnCoordinates.filter((value) => {
                    return value[0] >= 0 && value[1] >= 0 && value[0] <= 7 && value[1] <= 7
                })

                return whitePawnAvailableCoordinates
            }
            if (piece.color == "black") {
                const blackPawnCoordinates = [[x, y - 1], [x - 1, y - 1], [x + 1, y - 1]]
                if (y == 6) {
                    blackPawnCoordinates.push([x, y - 2])
                }

                const blackPawnAvailableCoordinates = blackPawnCoordinates.filter((value) => {
                    return value[0] >= 0 && value[1] >= 0 && value[0] <= 7 && value[1] <= 7
                })

                return blackPawnAvailableCoordinates
            }
    }
}

export function deleteBlockedMove(piece, chessboard, coordinates, lastMovedPiece) {
    // lastMovedPiece nhằm tìm nước tốt vừa mới đi để bắt tốt ngang đường
    let topLeftBlocked = false
    let topRightBlocked = false
    let botLeftBlocked = false
    let botRightBlocked = false
    let topBlocked = false
    let botBlocked = false
    let leftBlocked = false
    let rightBlocked = false
    const leftCastlingMoves = []
    const rightCastlingMoves = []
    const availableCoordinates = []

    if (piece.type == "bishop") {
        coordinates.forEach(arr => {
            // chéo lên trái
            if (piece.x - arr[0] > 0 && piece.y - arr[1] > 0) {
                // console.log(arr[0], arr[1])
                if (findPiece(chessboard, arr[0], arr[1]) == undefined) {
                    if (topLeftBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }

                else {
                    if (piece.color == findPiece(chessboard, arr[0], arr[1]).color) {
                        topLeftBlocked = true
                    } else {
                        if (topLeftBlocked == false) {
                            availableCoordinates.push(arr)
                            topLeftBlocked = true
                        }
                    }
                }
            }

            // chéo lên phải
            if (piece.x - arr[0] < 0 && piece.y - arr[1] > 0) {
                // console.log(arr[0], arr[1])
                if (findPiece(chessboard, arr[0], arr[1]) == undefined) {
                    if (topRightBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }

                else {
                    if (piece.color == findPiece(chessboard, arr[0], arr[1]).color) {
                        topRightBlocked = true
                    } else {
                        if (topRightBlocked == false) {
                            availableCoordinates.push(arr)
                            topRightBlocked = true
                        }
                    }
                }
            }

            // chéo xuống trái
            if (piece.x - arr[0] > 0 && piece.y - arr[1] < 0) {
                // console.log(arr[0], arr[1])
                if (findPiece(chessboard, arr[0], arr[1]) == undefined) {
                    if (botLeftBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }

                else {
                    if (piece.color == findPiece(chessboard, arr[0], arr[1]).color) {
                        botLeftBlocked = true
                    } else {
                        if (botLeftBlocked == false) {
                            availableCoordinates.push(arr)
                            botLeftBlocked = true
                        }
                    }
                }
            }

            // chéo xuống phải
            if (piece.x - arr[0] < 0 && piece.y - arr[1] < 0) {
                // console.log(arr[0], arr[1])
                if (findPiece(chessboard, arr[0], arr[1]) == undefined) {
                    if (botRightBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }

                else {
                    if (piece.color == findPiece(chessboard, arr[0], arr[1]).color) {
                        botRightBlocked = true
                    } else {
                        if (botRightBlocked == false) {
                            availableCoordinates.push(arr)
                            botRightBlocked = true
                        }
                    }
                }
            }
        })

        return availableCoordinates
    }

    if (piece.type == "rook") {
        coordinates.forEach(arr => {
            // đi lên
            if (piece.x == arr[0] && piece.y - arr[1] > 0) {
                if (findPiece(chessboard, arr[0], arr[1]) == undefined) {
                    if (topBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }
                else {
                    if (piece.color == findPiece(chessboard, arr[0], arr[1]).color) {
                        topBlocked = true
                    } else {
                        if (topBlocked == false) {
                            availableCoordinates.push(arr)
                            topBlocked = true
                        }
                    }
                }
            }

            // đi xuống
            if (piece.x == arr[0] && piece.y - arr[1] < 0) {
                if (findPiece(chessboard, arr[0], arr[1]) == undefined) {
                    if (botBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }
                else {
                    if (piece.color == findPiece(chessboard, arr[0], arr[1]).color) {
                        botBlocked = true
                    } else {
                        if (botBlocked == false) {
                            availableCoordinates.push(arr)
                            botBlocked = true
                        }
                    }
                }
            }

            // qua trái
            if (piece.x - arr[0] > 0 && piece.y == arr[1]) {
                if (findPiece(chessboard, arr[0], arr[1]) == undefined) {
                    if (leftBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }
                else {
                    if (piece.color == findPiece(chessboard, arr[0], arr[1]).color) {
                        leftBlocked = true
                    } else {
                        if (leftBlocked == false) {
                            availableCoordinates.push(arr)
                            leftBlocked = true
                        }
                    }
                }
            }

            // qua phải
            if (piece.x - arr[0] < 0 && piece.y == arr[1]) {
                if (findPiece(chessboard, arr[0], arr[1]) == undefined) {
                    if (rightBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }
                else {
                    if (piece.color == findPiece(chessboard, arr[0], arr[1]).color) {
                        rightBlocked = true
                    } else {
                        if (rightBlocked == false) {
                            availableCoordinates.push(arr)
                            rightBlocked = true
                        }
                    }
                }
            }
        })

        return availableCoordinates
    }

    if (piece.type == "queen") {
        coordinates.forEach(arr => {
            // chéo lên trái
            if (piece.x - arr[0] > 0 && piece.y - arr[1] > 0) {
                // console.log(arr[0], arr[1])
                if (findPiece(chessboard, arr[0], arr[1]) == undefined) {
                    if (topLeftBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }

                else {
                    if (piece.color == findPiece(chessboard, arr[0], arr[1]).color) {
                        topLeftBlocked = true
                    } else {
                        if (topLeftBlocked == false) {
                            availableCoordinates.push(arr)
                            topLeftBlocked = true
                        }
                    }
                }
            }

            // chéo lên phải
            if (piece.x - arr[0] < 0 && piece.y - arr[1] > 0) {
                // console.log(arr[0], arr[1])
                if (findPiece(chessboard, arr[0], arr[1]) == undefined) {
                    if (topRightBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }

                else {
                    if (piece.color == findPiece(chessboard, arr[0], arr[1]).color) {
                        topRightBlocked = true
                    } else {
                        if (topRightBlocked == false) {
                            availableCoordinates.push(arr)
                            topRightBlocked = true
                        }
                    }
                }
            }

            // chéo xuống trái
            if (piece.x - arr[0] > 0 && piece.y - arr[1] < 0) {
                // console.log(arr[0], arr[1])
                if (findPiece(chessboard, arr[0], arr[1]) == undefined) {
                    if (botLeftBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }

                else {
                    if (piece.color == findPiece(chessboard, arr[0], arr[1]).color) {
                        botLeftBlocked = true
                    } else {
                        if (botLeftBlocked == false) {
                            availableCoordinates.push(arr)
                            botLeftBlocked = true
                        }
                    }
                }
            }

            // chéo xuống phải
            if (piece.x - arr[0] < 0 && piece.y - arr[1] < 0) {
                // console.log(arr[0], arr[1])
                if (findPiece(chessboard, arr[0], arr[1]) == undefined) {
                    if (botRightBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }

                else {
                    if (piece.color == findPiece(chessboard, arr[0], arr[1]).color) {
                        botRightBlocked = true
                    } else {
                        if (botRightBlocked == false) {
                            availableCoordinates.push(arr)
                            botRightBlocked = true
                        }
                    }
                }
            }

            // đi lên
            if (piece.x == arr[0] && piece.y - arr[1] > 0) {
                if (findPiece(chessboard, arr[0], arr[1]) == undefined) {
                    if (topBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }
                else {
                    if (piece.color == findPiece(chessboard, arr[0], arr[1]).color) {
                        topBlocked = true
                    } else {
                        if (topBlocked == false) {
                            availableCoordinates.push(arr)
                            topBlocked = true
                        }
                    }
                }
            }

            // đi xuống
            if (piece.x == arr[0] && piece.y - arr[1] < 0) {
                if (findPiece(chessboard, arr[0], arr[1]) == undefined) {
                    if (botBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }
                else {
                    if (piece.color == findPiece(chessboard, arr[0], arr[1]).color) {
                        botBlocked = true
                    } else {
                        if (botBlocked == false) {
                            availableCoordinates.push(arr)
                            botBlocked = true
                        }
                    }
                }
            }

            // qua trái
            if (piece.x - arr[0] > 0 && piece.y == arr[1]) {
                if (findPiece(chessboard, arr[0], arr[1]) == undefined) {
                    if (leftBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }
                else {
                    if (piece.color == findPiece(chessboard, arr[0], arr[1]).color) {
                        leftBlocked = true
                    } else {
                        if (leftBlocked == false) {
                            availableCoordinates.push(arr)
                            leftBlocked = true
                        }
                    }
                }
            }

            // qua phải
            if (piece.x - arr[0] < 0 && piece.y == arr[1]) {
                if (findPiece(chessboard, arr[0], arr[1]) == undefined) {
                    if (rightBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }
                else {
                    if (piece.color == findPiece(chessboard, arr[0], arr[1]).color) {
                        rightBlocked = true
                    } else {
                        if (rightBlocked == false) {
                            availableCoordinates.push(arr)
                            rightBlocked = true
                        }
                    }
                }
            }
        })

        return availableCoordinates
    }

    if (piece.type == "knight") {
        coordinates.forEach(arr => {
            if (findPiece(chessboard, arr[0], arr[1]) != undefined) {
                if (piece.color != findPiece(chessboard, arr[0], arr[1]).color) {
                    availableCoordinates.push(arr)
                }
            } else {
                availableCoordinates.push(arr)
            }
        })

        return availableCoordinates
    }

    // if (piece.type == "king") {
    //     coordinates.forEach(arr => {
    //         if (Math.abs(piece.x - arr[0]) >= 2 || Math.abs(piece.y - arr[1]) >= 2) {
    //             // qua trai
    //             if (piece.x - arr[0] > 0 && piece.y == arr[1]) {
    //                 if (findPiece(chessboard, arr[0], arr[1]) == undefined) {
    //                     if (leftBlocked == false) {
    //                         leftCastlingMoves.push(arr)
    //                     }
    //                 }
    //                 else {
    //                     leftBlocked = true
    //                 }
    //             }

    //             //qua phai
    //             if (piece.x - arr[0] < 0 && piece.y == arr[1]) {
    //                 if (findPiece(chessboard, arr[0], arr[1]) == undefined) {
    //                     if (rightBlocked == false) {
    //                         if (Math.abs(piece.x - arr[0]) != 3) {
    //                             rightCastlingMoves.push(arr)
    //                         }
    //                     }
    //                 }
    //                 else {
    //                     rightBlocked = true
    //                 }
    //             }
    //         } else {
    //             if (findPiece(chessboard, arr[0], arr[1]) != undefined) {
    //                 //
    //                 //qua trai
    //                 if (piece.x - arr[0] > 0 && piece.y == arr[1]) {
    //                     leftBlocked = true
    //                 }

    //                 //qua phai
    //                 if (piece.x - arr[0] < 0 && piece.y == arr[1]) {
    //                     rightBlocked = true
    //                 }
    //                 //
    //                 if (piece.color != findPiece(chessboard, arr[0], arr[1]).color) {
    //                     availableCoordinates.push(arr)
    //                 }
    //             } else {
    //                 availableCoordinates.push(arr)
    //             }
    //         }
    //     })

    //     if (leftBlocked == false) {
    //         availableCoordinates.push(...leftCastlingMoves)
    //     }

    //     if (rightBlocked == false) {
    //         availableCoordinates.push(...rightCastlingMoves)
    //     }

    //     return availableCoordinates
    // }

    if (piece.type == "pawn") {
        if (piece.color == "white") {
            coordinates.forEach(arr => {
                //nước tiến về phía trước
                if (piece.x == arr[0] && piece.y - arr[1] < 0) {
                    if (findPiece(chessboard, arr[0], arr[1]) == undefined) {
                        if (topBlocked == false) {
                            availableCoordinates.push(arr)
                        }
                    } else {
                        topBlocked = true
                    }
                }
                // các nước đi chéo
                else {
                    if (findPiece(chessboard, arr[0], arr[1]) != undefined) {
                        if (piece.color != findPiece(chessboard, arr[0], arr[1]).color) {
                            availableCoordinates.push(arr)
                        }
                    }
                    // bat tot ngang duong
                    else {
                        if (piece.y == 4) {
                            if (findPiece(chessboard, arr[0], arr[1] - 1) != undefined) {
                                console.log(findPiece(chessboard, arr[0], arr[1] - 1))

                                if (findPiece(chessboard, arr[0], arr[1] - 1).type == "pawn" &&
                                    findPiece(chessboard, arr[0], arr[1] - 1).color == "black" &&
                                    findPiece(chessboard, arr[0], arr[1] - 1) == lastMovedPiece) {
                                    availableCoordinates.push(arr)
                                }
                            }
                        }
                    }
                }
            })
        }

        if (piece.color == "black") {
            coordinates.forEach(arr => {
                //nước tiến về phía trước
                if (piece.x == arr[0] && piece.y - arr[1] > 0) {
                    if (findPiece(chessboard, arr[0], arr[1]) == undefined) {
                        if (topBlocked == false) {
                            availableCoordinates.push(arr)
                        }
                    } else {
                        topBlocked = true
                    }
                }
                // các nước đi chéo
                else {
                    if (findPiece(chessboard, arr[0], arr[1]) != undefined) {
                        if (piece.color != findPiece(chessboard, arr[0], arr[1]).color) {
                            availableCoordinates.push(arr)
                        }
                    }
                    // bat tot ngang duong
                    else {
                        if (piece.y == 3) {
                            if (findPiece(chessboard, arr[0], arr[1] + 1) != undefined) {
                                console.log(findPiece(chessboard, arr[0], arr[1] + 1))
                                if (findPiece(chessboard, arr[0], arr[1] + 1).type == "pawn" &&
                                    findPiece(chessboard, arr[0], arr[1] + 1).color == "white" &&
                                    findPiece(chessboard, arr[0], arr[1] + 1) == lastMovedPiece) {
                                    availableCoordinates.push(arr)
                                }
                            }
                        }
                    }
                }
            })
        }

        return availableCoordinates
    }
}

export function highlightAvailableMove(chessboard, coordinates) {
    coordinates.forEach(coordinate => {
        findCell(chessboard, coordinate[0], coordinate[1]).cellElement.classList.add("available")
    })
}

export function unHighlightAvailableMove(chessboard) {
    chessboard.cells.forEach(cell => {
        if (cell.cellElement.classList.contains("available")) {
            cell.cellElement.classList.remove("available")
        }
    })
}