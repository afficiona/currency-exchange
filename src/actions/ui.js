import * as TYPES from './../constants/ActionTypes';

export const setUIData = (path, data) => dispatch => {
    dispatch({
        type: TYPES.SET_UI_DATA,
        path,
        data
    });
}