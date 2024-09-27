import ChessBoard from "./ChessBoard.js";
import { setPlacementForMobile, dragPieceOnDesktop, dragPieceOnMobile } from "./function.js";

const chessboardElement = document.getElementById("chessboard")

const chessboard = new ChessBoard(chessboardElement)

setPlacementForMobile(chessboard)
// dragPieceOnDesktop(chessboard, chessboard.chessboardElement)