import Stylesheet from '../styles/main.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { CHANGE_FILTER } from '../constants';

const mapStateToProps = (state) => {
	return {
		filter: state.filter
	}
};

const mapDispatchToProps = dispatch => ({
  changeFilterPagination: () => {
  	dispatch({ type: CHANGE_FILTER, payload: { pagination: false }});
  }
});

class Pagination extends Component {
	constructor(props) {
		super(props);

		this.state = {
			back: this.props.index,
			index: (parseInt(this.props.index / 10)) + 1,
			next: (parseInt(this.props.index / 10)) + 11
		};
	}

	handleInfiniteScroll() {
		this.props.changeFilterPagination();
	}

	render() {
		let Pages = [];

		let backPage = `?page=${this.state.back}`
		let indexPage = (i) => `?page=${this.state.index + i}`;
		let nextPage = `?page=${this.state.next}`;
		let end = (this.props.pages > 10) ? 10 : this.props.pages;

		for (let i = 0; i < end; i++) {
			Pages.push(
				<li key={i} className={Stylesheet['c-pagination__item']}>
					<Link to={indexPage(i)}>
						{this.state.index + i}
					</Link>
				</li>
			);
		}

		return (
			<div className={Stylesheet['c-pagination']}>
				{ this.props.filter.pagination && (
					<ol className={Stylesheet['c-pagination__list']}>
						{ (this.state.back >= 10) && (<li className={Stylesheet['c-pagination__item']}><Link to={backPage}>{this.state.back}</Link></li>) }
						{ Pages }
						{ (this.state.next <= this.props.pages) && (<li className={Stylesheet['c-pagination__item']}><Link to={nextPage}>{this.state.next}</Link></li>) }
					</ol>
				)}
				{ this.props.filter.pagination && (
					<button className={Stylesheet['c-pagination__see-all']} onClick={this.handleInfiniteScroll.bind(this)}>Ver todos</button>
				)}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);