export function validateOldBoardModel(plate: string) {
    return isNaN(Number(plate.substring(2, 3)));
}