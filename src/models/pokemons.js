import Model from './model';

export default class Pokemons extends Model {
	constructor() {
		super();
		this.basepath = '/api/v2/pokemon';
	}

	get(args = '') {
		return this.superagent.get(`${this.API_ROOT + this.basepath + args}`);
	}

	getImages(itens) {
		return new Promise((resolve) => {
			let results = [];

			itens.forEach(async (data) => {
				let id = data.name;

				await this.superagent.get(`${this.API_ROOT + this.basepath }/${ id }`)
					.then(r => {
						results.push({ name: id, image: r.body.sprites.front_default });
					});
			});

			
			resolve(results)
		});
	}
}