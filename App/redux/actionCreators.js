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

export function getData(){
    return { type: 'GET_DATA'}
}

export function loginSuccess(){
    return { type: 'LOGIN_SUCCESS'}
}

export function signupSuccess(){
    return { type: 'SIGNUP_SUCCESS'}
}

export function syncAuthStatus(){
    return { type: 'SYNC_AUTH_STATUS'}
}
export function logoutSuccess(){
    return { type: 'LOGOUT_SUCCESS'}
}

export function updateLevel() {
    return { type: 'UPDATE_LEVEL'}
}

export function resetLevel() {
    return { type: 'RESET_LEVEL'}
}

export function levelUp() {
    return { type: 'LEVEL_UP'}
}


export function setCurrentLevel() {
    return { type: 'SET_CURRENT_LEVEL'}
}

export function flagWin() {
    return { type: 'FLAG_WIN'}
}

export function unflaggedWin() {
    return { type: 'UNFLAGGED_WIN'}
}

export function configBackground() {
    return { type: 'CONFIG_BACKGROUND'}
}

export function configBtnColor() {
    return { type: 'CONFIG_BTN_COLOR'}
}
export function pause() {
    return { type: 'PAUSE'}
}

export function unPause() {
    return { type: 'UN_PAUSE'}
}
export function runaway() {
    return { type: 'RUNAWAY'}
}

export function punchMouse() {
    return { type: 'PUNCH_MOUSE'}
}