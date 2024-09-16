export default class Piece {
    constructor(x, y, type, color, reverse){
        this.pieceElement = document.createElement("div")
        this.pieceElement.classList.add("piece")
        const img = document.createElement("img")
        img.setAttribute("src", `images/pieces/${color}/${type}.png`)
        this.pieceElement.append(img)

        if(reverse){
            this.pieceElement.style.setProperty("bottom", "calc(var(--y) * var(--cell-size)")
            this.pieceElement.style.setProperty("right", "calc(var(--x) * var(--cell-size)")
        }else{
            this.pieceElement.style.setProperty("top", "calc(var(--y) * var(--cell-size)")
            this.pieceElement.style.setProperty("left", "calc(var(--x) * var(--cell-size)")
        }

        console.log(window.screen.width)
 
        this.x = x
        this.pieceElement.style.setProperty("--x", x)

        this.y = y
        this.pieceElement.style.setProperty("--y", y)

        this.type = type
        this.color = color
    }
}