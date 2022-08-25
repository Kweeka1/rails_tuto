const board = document.querySelector("#chess_container")
let turn = "Red"
const RedTeam = "Red"
const BlueTeam = "Blue"

function validateKnightMove(lastPieceSelected, currentPieceSelected) {
    const startingPosition = lastPieceSelected.attributes["coordination"].nodeValue.split(":")
    const endPosition = currentPieceSelected.attributes["coordination"].nodeValue.split(":")

    let rowMove = Math.abs(parseInt(startingPosition[0]) - parseInt(endPosition[0]))
    let colMove = Math.abs(parseInt(startingPosition[1]) - parseInt(endPosition[1]))

    return rowMove + colMove === 3
}

function validateBishopMove(lastPieceSelected, currentPieceSelected) {
    const startingPosition = lastPieceSelected.attributes["coordination"].nodeValue.split(":")
    const endPosition = currentPieceSelected.attributes["coordination"].nodeValue.split(":")

    const rowMove = Math.abs(parseInt(startingPosition[0]) - parseInt(endPosition[0]))
    const colMove = Math.abs(parseInt(startingPosition[1]) - parseInt(endPosition[1]))

    return rowMove === colMove
}

function validateRockMove(lastPieceSelected, currentPieceSelected) {
    const startingPosition = lastPieceSelected.attributes["coordination"].nodeValue.split(":")
    const endPosition = currentPieceSelected.attributes["coordination"].nodeValue.split(":")

    const startingRowPos = parseInt(startingPosition[0])
    const startingColPos = parseInt(startingPosition[1])
    const endingRowPos = parseInt(endPosition[0])
    const endingColPos = parseInt(endPosition[1])

    const rowMove = startingRowPos !== endingRowPos && startingColPos === endingColPos
    const colMove = startingRowPos === endingRowPos && startingColPos !== endingColPos

    return rowMove || colMove
}

function validateKingMove(lastPieceSelected, currentPieceSelected) {
    const isRockMove = validateRockMove(lastPieceSelected, currentPieceSelected)
    const isBishopMove = validateBishopMove(lastPieceSelected, currentPieceSelected)

    return isRockMove || isBishopMove
}

function validatePawn(lastPieceSelected, currentPieceSelected) {
    const startingPosition = lastPieceSelected.attributes["coordination"].nodeValue.split(":")
    const endPosition = currentPieceSelected.attributes["coordination"].nodeValue.split(":")

    const startingRowPos = parseInt(startingPosition[0])
    const startingColPos = parseInt(startingPosition[1])
    const endingRowPos = parseInt(endPosition[0])
    const endingColPos = parseInt(endPosition[1])

    const rowMove = Math.abs(startingRowPos - endingRowPos)
    const colMove = Math.abs(startingColPos - endingColPos)

    const isSelectedTerritoryTeam = currentPieceSelected.attributes["team"].nodeValue

    if (turn === "Blue") {
        if (endingRowPos < startingRowPos) return false
        if (colMove === 1 && rowMove === 1) return isSelectedTerritoryTeam === RedTeam
        if (startingRowPos === 1)
            return colMove === 0 && isSelectedTerritoryTeam !== RedTeam && rowMove === 1 || rowMove === 2

        return colMove === 0 && isSelectedTerritoryTeam !== RedTeam && rowMove === 1

    } else {

        if (endingRowPos > startingRowPos) return false
        if (colMove === 1 && rowMove === 1) return isSelectedTerritoryTeam === BlueTeam
        if (startingRowPos === 6 && colMove === 0)
            return  isSelectedTerritoryTeam !== BlueTeam && rowMove === 1 || rowMove === 2

        return colMove === 0 && isSelectedTerritoryTeam !== BlueTeam && rowMove === 1
    }
}

function validateMove(lastPiece, lastPieceSelected, currentPieceSelected) {
    switch (lastPiece) {
        case "Knight":
            return validateKnightMove(lastPieceSelected, currentPieceSelected)
        case "Bishop":
            return validateBishopMove(lastPieceSelected, currentPieceSelected)
        case "Rock":
            return validateRockMove(lastPieceSelected, currentPieceSelected)
        case "King":
            return validateKingMove(lastPieceSelected, currentPieceSelected)
        case "Pawn":
            return validatePawn(lastPieceSelected, currentPieceSelected)
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
    if (lastPieceSelected !== currentPieceSelected && lastPieceSelected !== null && currentPieceTeam !== turn) {
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
