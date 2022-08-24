const board = document.querySelector("#chess_container")

function validateKnightMove(lastPiece, newPiece) {
    const startingPosition = lastPiece.attributes["coordination"].nodeValue.split(":")
    const endPosition = newPiece.attributes["coordination"].nodeValue.split(":")

    let rowMove = Math.abs(parseInt(startingPosition[0]) - parseInt(endPosition[0]))
    let colMove = Math.abs(parseInt(startingPosition[1]) - parseInt(endPosition[1]))

    return rowMove + colMove === 3
}

function validateBishopMove(lastPiece, newPiece) {
    const startingPosition = lastPiece.attributes["coordination"].nodeValue.split(":")
    const endPosition = newPiece.attributes["coordination"].nodeValue.split(":")


}

function validateMove(lastPiece, lastPieceSelected, currentPieceSelected) {
    switch (lastPiece) {
        case "Knight":
            return validateKnightMove(lastPieceSelected, currentPieceSelected)
        case "Bishop":

        default:
            return true
    }
}

function selectOtherPiece(currentPiece) {
    lastPieceSelected.style.border = ""
    lastPieceSelected = currentPiece
    lastPieceSelected.style.border = "2px solid red"
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
    currentPiece.style.border = "2px solid red"
}

let turn = "Blue"
let lastPieceSelected = null

board.addEventListener("mousedown", function (ev) {
    console.log(ev)
    let currentPieceSelected = ev.target

    // Reselect parent DIV element (Cube) if IMG tag (Piece image) is selected
    if (currentPieceSelected.nodeName === "IMG") {
        currentPieceSelected = currentPieceSelected.parentElement
    }

    let currentPieceTeam = currentPieceSelected.attributes["team"].nodeValue
    let lastPieceTeam = lastPieceSelected?.attributes["team"]?.nodeValue
    let currentPiece = currentPieceSelected.attributes["piece"].nodeValue
    let lastPiece = lastPieceSelected?.attributes["piece"]?.nodeValue

    // Select a new Piece of the player's team (Red or Blue) if no piece is selected (if lastPieceSelected is null)
    if (lastPieceSelected === null && currentPieceTeam === turn) {
        selectPiece(currentPieceSelected)
    }

    // Move selected piece to an empty territory or enemy territory. Condition fails if selected piece is an ally
    if (lastPieceSelected !== ev.target && lastPieceSelected !== null && currentPieceTeam !== turn) {
        const isValidMove = validateMove(lastPiece, lastPieceSelected, currentPieceSelected)

        if (isValidMove) {
            movePieceToNewPos(currentPieceSelected, lastPieceTeam, lastPiece)
            lastPieceSelected = null
        }
        else {
            lastPieceSelected.style.border = ""
            lastPieceSelected = null
        }
    }

    // Select a new ally piece if previously selected piece is an ally (not the same as lastPieceSelected)
    if (lastPieceSelected !== null && lastPieceTeam === currentPieceTeam) {
        selectOtherPiece(currentPieceSelected)
    }
})
