import validateMove from "./chess_helpers/pieceMoveValidation";
import {getPossibleMoves, clearPossibleMoves} from "./chess_helpers/getPossibleMoves";

const board = document.querySelector("#chess_container")
const territories = document.querySelectorAll(".cube")

let turn = "Blue"

const blueQueenSpace = []
const redQueenSpace = []

let lastPieceSelected = null
let lastPiece = ""

function selectOtherPiece(currentPiece) {
    lastPieceSelected.style.border = ""
    lastPieceSelected = currentPiece
    lastPieceSelected.style.border = "2px solid red"
    lastPiece = currentPiece.getAttribute("piece")
}

function movePieceToNewPos(currentPiece, lastPieceTeam, lastPiece) {
    lastPieceSelected.style.border = ""

    currentPiece.innerHTML = lastPieceSelected.innerHTML
    currentPiece.setAttribute("team", lastPieceTeam)
    currentPiece.setAttribute("piece", lastPiece)

    lastPieceSelected.innerHTML = ""
    lastPieceSelected.setAttribute("team", "")
    lastPieceSelected.setAttribute("piece", "")
}

function selectPiece(currentPiece) {
    lastPieceSelected = currentPiece
    lastPiece = currentPiece.getAttribute("piece")
    currentPiece.style.border = "2px solid red"
}

board.addEventListener("mousedown", function (ev) {
    //console.log(ev)
    let currentPieceSelected = ev.target

    // Reselect parent DIV element (Cube) if IMG tag (Piece image) is selected
    if (currentPieceSelected.nodeName === "IMG") {
        currentPieceSelected = currentPieceSelected.parentElement
    }

    let currentPieceTeam = currentPieceSelected.getAttribute("team")
    let lastPieceTeam = lastPieceSelected?.getAttribute("team")

    let currentPiece = currentPieceSelected.getAttribute("piece")

    // Select a new Piece of the player's team (Red or Blue) if no piece is selected (if lastPieceSelected is null)
    if (lastPieceSelected === null && currentPieceTeam === turn) {
        selectPiece(currentPieceSelected)
        getPossibleMoves(currentPiece, lastPieceSelected, territories, turn)
    }

    // Move selected piece to an empty territory or enemy territory. Condition fails if selected piece is an ally
    if (lastPieceSelected !== currentPieceSelected && lastPieceSelected !== null && currentPieceTeam !== turn) {
        const isValidMove = validateMove(lastPiece, lastPieceSelected, currentPieceSelected, territories, turn)

        if (isValidMove) {
            movePieceToNewPos(currentPieceSelected, lastPieceTeam, lastPiece)
            lastPieceSelected = null
            clearPossibleMoves(territories)
        }
        else {
            lastPieceSelected.style.border = ""
            lastPieceSelected = null
            clearPossibleMoves(territories)
        }
    }

    // Select a new ally piece if previously selected piece is an ally (not the same as lastPieceSelected)
    if (currentPieceSelected !== lastPieceSelected && lastPieceTeam === currentPieceTeam) {
        selectOtherPiece(currentPieceSelected)
        clearPossibleMoves(territories)
        getPossibleMoves(currentPiece, lastPieceSelected, territories, turn)
    }
})
