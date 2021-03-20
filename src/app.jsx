import Stylesheet from './styles/main.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import arrayUniqueObjects from './polyfills/arrayUniqueObjects';
import qs from 'qs';

import Filter from "./components/filter";
import List from "./components/list";
import Item from "./components/item";

import { CHANGE_FILTER } from './constants';

const mapStateToProps = (state) => {
	return {
		filter: state.filter,
		location: state.router.location.pathname.replace('/', ''),
		page: parseInt(qs.parse(state.router.location.search, { ignoreQueryPrefix: true }).page) || 1,
	}
}

class Main extends Component {
	constructor(props) {
		super(props);

		if (this.props.filter.page !== this.props.page - 1)
			this.props.dispatch({
				type: CHANGE_FILTER,
				payload: {
					end: this.props.filter.end * this.props.page,
					page: this.props.page - 1
				}
			});
	}

	render() {
		return (
			<div className={Stylesheet['b-container']}>
				<Filter location={this.props.location} />
				<Switch>
					<Route exact path="/" component={() => {
						return (<List />)
					}} />
					<Route path="/:pokemon" component={() => {
						return (<Item pokemon={this.props.location} />);
					}} />
				</Switch>
			</div>
		)
	}
}

export default connect(mapStateToProps)(Main);