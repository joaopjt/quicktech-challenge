import { CHANGE_FILTER, ADD_POKEMON, LOADING, UPDATE_POKEMONS } from '../constants';

// Filter
export interface FilterState {
  start: number,
  end: number,
  range: number,
  length: number,
  page: number,
  pagination: boolean
}

interface UpdateFilterState {
  type: typeof CHANGE_FILTER,
  payload: FilterState 
}

export type FilterActionType = UpdateFilterState;