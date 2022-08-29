let possibleMoves = []

function getKnightMoves(startingPosition, territories, turn) {
    const startingRowPos = parseInt(startingPosition[0])
    const startingColPos = parseInt(startingPosition[1])

    const up = [
        (startingRowPos - 2), (startingColPos - 1),
        (startingRowPos - 2), (startingColPos + 1)
    ]
    const right = [
        (startingRowPos - 1), (startingColPos + 2),
        (startingRowPos + 1), (startingColPos + 2)
    ]
    const down = [
        (startingRowPos + 2), (startingColPos - 1),
        (startingRowPos + 2), (startingColPos + 1)
    ]
    const left = [
        (startingRowPos - 1), (startingColPos - 2),
        (startingRowPos + 1), (startingColPos - 2)
    ]

    const allMoves = [up, right, down, left].flat().map(num => num < 0 || num > 7 ? undefined : num)

    for (let i = 0; i < allMoves.length; i += 2) {
        const territory = territories[(allMoves[i] * 8) + allMoves[i + 1]]
        if (territory !== undefined && territory?.getAttribute("team") !== turn) {
            territory.style.border = "2px solid green"
            possibleMoves.push((allMoves[i] * 8) + allMoves[i + 1])
        }
    }
}

function getBishopMoves(startingPosition, territories, turn) {
    const startingRowPos = parseInt(startingPosition[0])
    const startingColPos = parseInt(startingPosition[1])

    function isPossibleMove(row, i) {
        const territory = territories[(row * 8) + i]
        if (territory !== undefined && territory?.getAttribute("team") !== turn) {
            territory.style.border = "2px solid green"
            possibleMoves.push((row * 8) + i)
            return territory.getAttribute("team") !== "Red"
        }

        return false
    }

    function getUpMoves() {
        let row = startingRowPos
        for (let i = startingColPos - 1; i >= 0; i--) {
            row--
            if (!isPossibleMove(row, i)) break;
        }
        row = startingRowPos
        for (let i = startingColPos + 1; i <= 7; i++) {
            row--
            if (!isPossibleMove(row, i)) break;
        }
    }

    function getDownMoves() {
        let row = startingRowPos
        for (let i = startingColPos - 1; i >= 0; i--) {
            row++
            if (!isPossibleMove(row, i)) break;
        }
        row = startingRowPos
        for (let i = startingColPos + 1; i <= 7; i++) {
            row++
            if (!isPossibleMove(row, i)) break;
        }
    }

    getDownMoves()
    getUpMoves()
}

function getRockMoves(startingPosition, territories, turn) {
    const startingRowPos = parseInt(startingPosition[0])
    const startingColPos = parseInt(startingPosition[1])

    function isPossibleMove(row, col) {
        const territory = territories[(row * 8) + col]
        if (territory !== undefined && territory?.getAttribute("team") !== turn) {
            territory.style.border = "2px solid green"
            possibleMoves.push((row * 8) + col)
            return territory.getAttribute("team") !== "Red"
        }

        return false
    }

    function getHorizontalMoves() {
        for (let col = startingColPos - 1; col >= 0; col--) {
            if (!isPossibleMove(startingRowPos, col)) break;
        }
        for (let col = startingColPos + 1; col <= 7; col++) {
            if (!isPossibleMove(startingRowPos, col)) break;
        }
    }

    function getVerticalMoves() {
        for (let row = startingRowPos - 1; row >= 0; row--) {
            if (!isPossibleMove(row, startingColPos)) break;
        }
        for (let row = startingRowPos + 1; row <= 7; row++) {
            if (!isPossibleMove(row, startingColPos)) break;
        }
    }

    getHorizontalMoves()
    getVerticalMoves()
}

function getKingMoves(startingPosition, territories, turn) {
    getRockMoves(startingPosition, territories, turn)
    getBishopMoves(startingPosition, territories, turn)
}

export function clearPossibleMoves(territories) {
    while (possibleMoves.length !== 0) {
        let item = possibleMoves.shift()
        territories[item].style.border = ""
    }
}

export function getPossibleMoves(currentPiece, lastPieceSelected, territories, turn) {
    const startingPosition = lastPieceSelected.getAttribute("coordination").split(":")

    switch (currentPiece) {
        case "Knight":
            return getKnightMoves(startingPosition, territories, turn)
        case "Bishop":
            return getBishopMoves(startingPosition, territories, turn)
        case "Rock":
            return getRockMoves(startingPosition, territories, turn)
        case "King":
            return getKingMoves(startingPosition, territories, turn)
        default:
            return []
    }
}