import filter from './reducers/filter.ts';
import pokemons from './reducers/pokemons.ts';
import pokemonsList from './reducers/pokemonsList.ts';

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  filter,
  pokemons,
  pokemonsList,
  router: routerReducer
});