import { LOADING, UPDATE_POKEMONS } from '../constants';

const initialState = {
  loading: true,
  list: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        loading: true
      };
    }

  	case UPDATE_POKEMONS: {
  		if (state.loading) return {...state, loading: false, list: state.list.concat(action.payload).unique() };

     	return {
        ...state,
        list: state.list.concat(action.payload).unique()
      };
    }

  	default:
  		return state;
  };
};