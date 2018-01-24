import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function dataSheetReducer(state = initialState.datasheet, action) {
  switch (action.type) {
    case types.IS_SHOW_DATASHEET_WINDOW:
      return Object.assign({}, state, action.payload);
    case types.LOAD_DATASHEET_SUCCESS:
      return Object.assign({}, state, {newGrid: action.payload});
    default:
      return state;
  }
}
