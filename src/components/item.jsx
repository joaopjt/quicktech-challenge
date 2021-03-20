import Stylesheet from '../styles/main.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Pokemon } from '../models';
import { ADD_POKEMON } from "../constants";

const initialState = {
	name: 'Pokemon',
	image: '',
	base_experience: 0,
	abilities: [], 
	specs: []
};

const mapStateToProps = (state) => {
	return {
		loading: state.pokemonsList.loading,
		pokemonsList: state.pokemonsList.list,
	}
}

class Item extends Component {
	constructor(props) {
		super(props);
		this.state = initialState;

		let pokemon = { name: this.props.pokemon };

		if (!this.props.pokemonsList[pokemon.name]) {
			let model = new Pokemon(pokemon.name);

			model.get()
				.then((res) => {
					pokemon = res;

					this.props.dispatch({
						type: ADD_POKEMON,
						payload: pokemon
					});
				});
		} else {
			this.syncState();
		}
	}

	componentWillReceiveProps() {
		this.syncState();
	}

	syncState() {
		let { name, image, base_experience, abilities, specs } = this.props.pokemonsList[this.props.pokemon];
		this.setState({ name, image, base_experience, abilities, specs });
	}

	render() {
		return (
			<div className={(this.props.loading) ? 'c-item c-item--loading' : 'c-item'}>
				<div className="c-item__header">
					<h2 className="c-item__title">{ this.state.name }</h2>
					<span className="c-item__xp">{ this.state.base_experience }</span>
					<img src={this.state.image} alt={this.state.name}/>
				</div>
			</div>
		)
    }
}

export default connect(mapStateToProps)(Item);