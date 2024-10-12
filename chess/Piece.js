export default class Piece {
    constructor(x, y, type, color, reverse) {
        this.pieceElement = document.createElement("div")
        this.pieceElement.classList.add("piece")
        const img = document.createElement("img")
        img.setAttribute("src", `images/pieces/${color}/${type}.png`)
        this.pieceElement.append(img)

        this.x = x
        this.pieceElement.style.setProperty("--x", x)

        this.y = y
        this.pieceElement.style.setProperty("--y", y)

        this.reverse = reverse
        if (this.reverse) {
            this.pieceElement.style.setProperty("bottom", "calc(var(--y) * var(--cell-size)")
            this.pieceElement.style.setProperty("right", "calc(var(--x) * var(--cell-size)")
        } else {
            this.pieceElement.style.setProperty("top", "calc(var(--y) * var(--cell-size)")
            this.pieceElement.style.setProperty("left", "calc(var(--x) * var(--cell-size)")
        }

        this.type = type
        this.color = color
        this.moved = false
        this.lastMoved = false
        this.checked = false
    }

    set setX(value) {
        this.x = value
        this.pieceElement.style.setProperty("--x", value)
    }

    set setY(value) {
        this.y = value
        this.pieceElement.style.setProperty("--y", value)
    }

    rePlacePiece(x, y) {
        this.setX = x
        this.setY = y
        if (this.reverse) {
            this.pieceElement.style.removeProperty("top")
            this.pieceElement.style.removeProperty("left")
            this.pieceElement.style.setProperty("bottom", "calc(var(--y) * var(--cell-size)")
            this.pieceElement.style.setProperty("right", "calc(var(--x) * var(--cell-size)")
            
        } else {
            this.pieceElement.style.setProperty("top", "calc(var(--y) * var(--cell-size)")
            this.pieceElement.style.setProperty("left", "calc(var(--x) * var(--cell-size)")
        }
    }
}