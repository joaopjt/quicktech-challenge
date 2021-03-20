import superagent from 'superagent';

export default class Model {
	constructor() {
		this.API_ROOT = 'https://pokeapi.co';
		this.superagent = superagent;

		this.basepath = '';
	}
}