
export enum Results {
    INVALID_ROW,
    INVALID_COLUMN,
    INVALID_SQUARE,
    VALID,
}

export function checkValid(board: number[]) {

    // Use sets to check if rows/cols are complete
    const rowSet = new Set();
    const colSet = new Set();

    // Check rows and cols with the same loops
    for (let i=0; i<9; i++) {
        for (let j=0; j<9; j++) {
            rowSet.add(board[i*9 + j]);
            colSet.add(board[j*9 + i]);
        }
        if (rowSet.size != 9) {
            return Results.INVALID_ROW;
        }
        if (colSet.size != 9) {
            return Results.INVALID_COLUMN;
        }
        colSet.clear();
        rowSet.clear();
    }

    // Now check squares
    const subSquareSet = new Set();

    // Outer loops for squares
    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {

            // Inner loops per square
            for (let k=0; k<3; k++) {
                for (let l=0; l<3; l++) {
                    subSquareSet.add(board[
                        i*3*9 + // Outer row
                        j*3 +   // Outer column
                        k*9 +   // Inner row
                        l       // Inner column
                    ])
                }
            }

            if (subSquareSet.size != 9) {
                return Results.INVALID_SQUARE;
            }
            subSquareSet.clear();
        }
    }
    return Results.VALID;
}