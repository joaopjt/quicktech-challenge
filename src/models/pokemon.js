import Model from './model';

export default class Pokemon extends Model {
	constructor(name) {
		super();
		this.id = name;
		this.basepath = '/api/v2/';
	}

	get() {
		const res = { name: this.id };
		const model = this;

		return new Promise((resolve) => {
			this.superagent.get(`${ this.API_ROOT + this.basepath }pokemon/${ this.id }`)
			.then(r => {
				model.getAbilities(r.body)
					.then((abilities) => {
						resolve(Object.assign(res, r.body, { abilities: abilities, image: r.body.sprites.front_default }));
					});
			});
		});
	}

	getAbilities(data) {
		return new Promise((resolve) => {
			let abilities = [];

			data.abilities.forEach((data) => {
				let id = data.ability.url.replace('https://pokeapi.co/api/v2/ability/', '').replace('/', '');

				this.superagent.get(`${ this.API_ROOT + this.basepath }ability/${ id }`)
				.then(r => {
					let effectEntries = r.body.effect_entries.filter((effect) => {
						return effect.language.name === "en";
					});

					abilities.push({
						name: data.ability.name,
						effect: effectEntries[0].effect
					});
				})
			});
				
			resolve(abilities);
		});
	}
}