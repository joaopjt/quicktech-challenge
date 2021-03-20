import { ADD_POKEMON } from '../constants';

const initialState = {
  loading: true,
  list: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
  	case ADD_POKEMON:
      let { name, image, base_experience, abilities, specs } = action.payload;

      if (!state.list[name]) {
        let newState = { loading: false, list: state.list };
        let pokemon = Object.assign({ name, image, base_experience, abilities, specs });

        newState.list[name] = pokemon;

        return newState;
      } else {
        return state;
      }
      break;

  	default:
  		return state;
  }
};