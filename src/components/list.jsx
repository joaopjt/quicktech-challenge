import Stylesheet from '../styles/main.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import qs from 'qs';

import Pagination from './pagination'

import { Pokemons } from '../models';
import { LOADING, UPDATE_POKEMONS, CHANGE_FILTER } from "../constants";

const mapStateToProps = (state) => {
	return {
		filter: state.filter,
		loading: state.pokemons.loading,
		page: parseInt(qs.parse(state.router.location.search, { ignoreQueryPrefix: true }).page) || 1,
		pokemons: state.pokemons.list,
	}
};

const mapDispatchToProps = dispatch => ({
  changeFilter: value => {
  	dispatch({ type: CHANGE_FILTER, payload: { length: value }});
  },
  updateFilterPage: (endValue, pageValue) => {
  	dispatch({ type: CHANGE_FILTER, payload: { end: endValue, page: pageValue }});
  },
  loadingPokemons: () => {
  	dispatch({ type: LOADING });
  },
  updatePokemons: list => {
  	dispatch({ type: UPDATE_POKEMONS, payload: list });
  }
});

class List extends Component {
	constructor(props) {
		super(props);
		this.list = React.createRef();
		this.loading = true;

		let pages = this.props.filter.end / this.props.filter.range;
		pages = (!Number.isInteger(pages)) ? parseInt(pages) + 1 : pages;

		this.state = {
			start: (this.props.filter.page) ? this.props.filter.range * (this.props.page - 1) : this.props.filter.start,
			end: (this.props.filter.page) ? this.props.filter.range * (this.props.filter.page + 1) : this.props.filter.range,
			pages: pages
		};

		if (!this.props.pokemons.length && this.loading) {
			this.loading = false;
			this.getPokemons();
		}

		if (this.props.filter.pagination && this.props.filter.page !== this.props.page - 1) {
			let countEnd = (this.props.filter.range * this.props.page > this.props.filter.end) ? this.props.filter.range * this.props.page : this.props.filter.end;
			this.props.updateFilterPage(countEnd, this.props.page - 1);
		}

		if (this.props.pokemons.length && this.props.filter.end > this.props.pokemons.length) {
			let count = this.props.filter.end - this.props.pokemons.length;
			let offset = this.props.pokemons.length;

			this.getPokemons(count, offset);
		}
	}

	getPokemons(limit = this.props.filter.end - this.props.filter.start, offset = this.props.filter.start) {
		let model = new Pokemons();
		
		if (limit) {
			this.props.loadingPokemons();

			model.get(`?limit=${limit}&offset=${offset}`)
				.then((res) => {
					let data = res.body.results;

					model.getImages(data)
						.then((r) => {
							this.props.updatePokemons(r);
						});
				});
		}
	}

	render() {
		let Items = this.props.pokemons.map((pokemon, index) => {
			let link = '/' + pokemon.name;

			return (
				<li key={index} className={Stylesheet['c-list__item']}>
					<Link to={link}>
						<div className={Stylesheet['c-list__item-header']}>
							<img src={pokemon.image} className={Stylesheet['c-list__item-picture']} />
						</div>
						<div className={Stylesheet['c-list__item-details']}>
							<h3 className={Stylesheet['c-list__item-title']}>{pokemon.name}</h3>
						</div>
					</Link>
				</li>
			)
		});

		return (
			<div className={Stylesheet['c-list']}>
				{!this.props.pokemons.length && (
					<div className={Stylesheet['c-empty']}>
						<h3 className={Stylesheet['c-empty__message']}>Empty list!</h3>
					</div>
				)}

				<ul className={Stylesheet['c-list__items']} ref={this.list}>
					{ this.props.pokemons.length && (Items.slice(this.state.start, this.state.end)) }
				</ul>

				{ this.props.loading && (
					<p>Loading...</p>
				)}

				<Pagination index={this.props.page || this.props.filter.page + 1}
					pages={this.state.pages}
				/>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(List);