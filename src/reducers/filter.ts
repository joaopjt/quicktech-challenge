import { FilterState, FilterActionType } from './types';
import { CHANGE_FILTER } from '../constants';

const initialState: FilterState = {
  start: 0,
  end: 20,
  range: 20,
  length: 0,
  page: 0,
  pagination: true
};

export default function (state = initialState, action: FilterActionType): FilterState {
  switch (action.type) {
  	case CHANGE_FILTER: {
      return {
        ...state,
        ...action.payload
      };
    }

  	default:
  		return state;
  }
};