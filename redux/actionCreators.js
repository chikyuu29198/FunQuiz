export function plusScore() {
    return { type: 'PLUS_SCORE' };
}

export function handleCorrect() {
    return { type: 'HANDLE_CORRECT' };
}

export function handleInCorrect() {
    return { type: 'HANDLE_INCORRECT'};
    
}

export function reset() {
    return { type: 'RESET'};
    
}

// export function plusSore() {
//     return { type: 'PLUS_SCORE'};
    
// }