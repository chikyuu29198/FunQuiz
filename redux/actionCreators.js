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

export function updateIndex() {
    return { type: 'UPDATE_INDEX'}
}

export function resetIndex() {
    return { type: 'RESET_INDEX'}
}

export function updateSound() {
    return { type: 'UPDATE_SOUND' }
}

export function enableAnswer(){
    return { type: 'ENABLE_ANSWER' }
}

export function disableAnswer(){
    return { type: 'DISABLE_ANSWER' }
}

