const board = document.querySelector("#chess_container")
const territories = document.querySelectorAll(".cube")
let turn = "Blue"
const RedTeam = "Red"
const BlueTeam = "Blue"

function validateKnightMove(startingPosition, endPosition) {

    let rowMove = Math.abs(parseInt(startingPosition[0]) - parseInt(endPosition[0]))
    let colMove = Math.abs(parseInt(startingPosition[1]) - parseInt(endPosition[1]))

    return rowMove + colMove === 3
}

function validateBishopMove(startingPosition, endPosition, territories) {

    const rowMove = Math.abs(parseInt(startingPosition[0]) - parseInt(endPosition[0]))
    const colMove = Math.abs(parseInt(startingPosition[1]) - parseInt(endPosition[1]))

    const startingRowPos = parseInt(startingPosition[0])
    const startingColPos = parseInt(startingPosition[1])

    const endingRowPos = parseInt(endPosition[0])
    const endingColPos = parseInt(endPosition[1])

    const isBlocked = function () {
        let col = startingColPos

        if (startingRowPos > endingRowPos) {
            for (let i = startingRowPos - 1; i > endingRowPos; i--) {
                if (endingColPos > startingColPos) {
                    col++
                    if (territories[(i * 8) + col].attributes["team"].nodeValue !== "") return true
                } else {
                    col--
                    if (territories[(i * 8) + col].attributes["team"].nodeValue !== "") return true
                }
            }
        } else {
            for (let i = startingRowPos + 1; i < endingRowPos; i++) {
                if (endingColPos > startingColPos) {
                    col++
                    if (territories[(i * 8) + col].attributes["team"].nodeValue !== "") return true
                } else {
                    col--
                    if (territories[(i * 8) + col].attributes["team"].nodeValue !== "") return true
                }
            }
        }

        return false
    }

    return rowMove === colMove && !isBlocked()
}

function validateRockMove(startingPosition, endPosition) {

    const startingRowPos = parseInt(startingPosition[0])
    const startingColPos = parseInt(startingPosition[1])

    const endingRowPos = parseInt(endPosition[0])
    const endingColPos = parseInt(endPosition[1])

    const rowMove = startingRowPos !== endingRowPos && startingColPos === endingColPos
    const colMove = startingRowPos === endingRowPos && startingColPos !== endingColPos

    function isBlocked() {
        if (endingRowPos > startingRowPos) {
            for (let i = startingRowPos + 1; i < endingRowPos; i++) {
                if (territories[(i * 8) + startingColPos].attributes["team"].nodeValue !== "") return true
            }
        } else {
            for (let i = startingRowPos - 1; i > endingRowPos; i--) {
                if (territories[(i * 8) + startingColPos].attributes["team"].nodeValue !== "") return true
            }
        }
        if (endingColPos > startingColPos) {
            for (let i = startingColPos + 1; i < endingColPos; i++) {
                console.log(territories[(i * 8) + startingRowPos])
                if (territories[(i * 8) + startingRowPos].attributes["team"].nodeValue !== "") return true
            }
        } else {
            for (let i = startingColPos - 1; i > endingColPos; i--) {
                console.log(territories[(startingRowPos * 8) + i])
                if (territories[(startingRowPos * 8) + i].attributes["team"].nodeValue !== "") return true
            }
        }

        return false
    }

    return rowMove || colMove ? !isBlocked() : false
}

function validateKingMove(startingPosition, endPosition) {
    if (startingPosition[0] === endPosition[0] || startingPosition[1] === endPosition[1])
        return validateRockMove(startingPosition, endPosition)

    else return validateBishopMove(startingPosition, endPosition, territories)
}

function validateQueenMove(startingPosition, endPosition) {
    const rowMove = Math.abs(parseInt(startingPosition[0]) - parseInt(endPosition[0]))
    const colMove = Math.abs(parseInt(startingPosition[1]) - parseInt(endPosition[1]))

    return (rowMove === 0 || rowMove === 1) && (colMove === 0 || colMove === 1)
}

function validatePawnMove(startingPosition, endPosition, isSelectedTerritoryTeam) {

    const startingRowPos = parseInt(startingPosition[0])
    const startingColPos = parseInt(startingPosition[1])
    const endingRowPos = parseInt(endPosition[0])
    const endingColPos = parseInt(endPosition[1])

    const rowMove = Math.abs(startingRowPos - endingRowPos)
    const colMove = Math.abs(startingColPos - endingColPos)

    if (turn === "Blue") {

        if (endingRowPos < startingRowPos) return false
        if (colMove === 1 && rowMove === 1) return isSelectedTerritoryTeam === RedTeam
        if (startingRowPos === 1) {
            return colMove === 0 && isSelectedTerritoryTeam !== RedTeam && rowMove === 1 || rowMove === 2
        }
        return colMove === 0 && isSelectedTerritoryTeam !== RedTeam && rowMove === 1

    } else {

        if (endingRowPos > startingRowPos) return false
        if (colMove === 1 && rowMove === 1) return isSelectedTerritoryTeam === BlueTeam
        if (startingRowPos === 6 && colMove === 0) {
            return isSelectedTerritoryTeam !== BlueTeam && rowMove === 1 || rowMove === 2
        }
        return colMove === 0 && isSelectedTerritoryTeam !== BlueTeam && rowMove === 1

    }
}

function validateMove(lastPiece, lastPieceSelected, currentPieceSelected) {
    const isSelectedTerritoryTeam = currentPieceSelected.attributes["team"].nodeValue
    const startingPosition = lastPieceSelected.attributes["coordination"].nodeValue.split(":")
    const endPosition = currentPieceSelected.attributes["coordination"].nodeValue.split(":")

    switch (lastPiece) {
        case "Knight":
            return validateKnightMove(startingPosition, endPosition)
        case "Bishop":
            return validateBishopMove(startingPosition, endPosition, territories)
        case "Rock":
            return validateRockMove(startingPosition, endPosition)
        case "King":
            return validateKingMove(startingPosition, endPosition)
        case "Pawn":
            return validatePawnMove(startingPosition, endPosition, isSelectedTerritoryTeam)
        case "Queen":
            return validateQueenMove(startingPosition, endPosition)
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
