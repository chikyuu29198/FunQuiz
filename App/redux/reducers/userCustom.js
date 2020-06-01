let initalState = {
    background : null,
    btn_color: null,
    sound: null
}

const userCustom = (state = initalState, action) => {
    if (action.type == 'CONFIG_BACKGROUND') 
    return {
        ...state,
        background: action.bg_uri
      };
    if (action.type == 'CONFIG_BTN_COLOR') return {
        ...state,
        btn_color: action.btn_color
    };
    if (action.type == 'RESET_CUSTOM')
    return {
        background: null,
        btn_color: null
    }
    if (action.type == 'CONFIG_SOUND') 
    return {
        ...state,
        sound: action.sound_uri
      };
    return state;
};

export default userCustom;