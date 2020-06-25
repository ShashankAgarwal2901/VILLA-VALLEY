import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header/Header.js";
import Landing from "./Landing/Landing.js";
import Pending from "./Pending/Pending.js";
import MembersContainer from "./Members/MembersContainer.js";
import { connect } from "react-redux";
import * as actions from "../actions";
import "./App.css";

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}
	render() {
		return (
			<div>
				<BrowserRouter>
					<Route exact path="/" component={Header} />
					<Route exact path="/" component={Landing} />
					<Route exact path="/pending" component={Pending} />
					<Route exact path="/members" component={MembersContainer} />
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(null, actions)(App);
