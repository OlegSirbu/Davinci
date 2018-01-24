import * as types from './actionTypes';
const dataSheet = require('../fakeData/dataSheet.json');

export function showDataSheetWindow(bool) {
    return (dispatch) => {
        return dispatch({
            type: types.IS_SHOW_DATASHEET_WINDOW,
            payload: {isShowDataSheet: bool, grid: dataSheet.data }
        });
    };
}

export function updateDataSheet(params) {
    return (dispatch) => {
        return dispatch({
            type: types.LOAD_DATASHEET_SUCCESS,
            payload: params
        });
    };
}
