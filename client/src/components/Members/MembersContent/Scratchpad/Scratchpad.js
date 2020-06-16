import React from "react";
import { connect } from "react-redux";
import classes from "./Scratchpad.module.css";
import Scratch from "./Scratch/Scratch.js";
import Modal from "../../../HOC/Modal.js";
import axios from "axios";
import NewScratch from "./NewScratch/NewScratch.js";

class Scratchpad extends React.Component {
	state = {
		scratchList: [],
		viewNewScratch: false,
	};
	componentDidMount() {
		this.fetchScratches();
	}
	showNewScratch = () => {
		return this.state.viewNewScratch ? (
			<Modal func={this.setFalse}>
				<NewScratch fetch={this.fetchScratches} />
			</Modal>
		) : null;
	};
	setFalse = () => {
		this.setState({ viewNewScratch: false });
	};

	fetchScratches = () => {
		axios
			.post("/api/get_scratches")
			.then((res) => this.setState({ scratchList: res.data }));
	};
	getScratches = () => {
		return this.state.scratchList.length > 0 ? (
			this.state.scratchList.map((scratch, i) => (
				<li
					key={"Scratch " + i.toString()}
					className={classes.listItem}
				>
					<Scratch fetch={this.fetchScratches} scratch={scratch} />
				</li>
			))
		) : (
			<h5> No Scratches Found</h5>
		);
	};
	render() {
		return this.props.auth ? (
			<div className={classes.parent}>
				{this.showNewScratch()}
				<h4 className="center">Scratchpad </h4>
				<ul className={classes.uList} style={{ marginTop: "3em" }}>
					{this.getScratches()}{" "}
				</ul>
				<button
					onClick={() => {
						this.setState({ viewNewScratch: true });
					}}
					className={classes.Button}
				>
					<i className="material-icons">add</i>
					<p className={classes.text}>Write a Scratch</p>
				</button>
			</div>
		) : (
			<h4> You are not Logged in </h4>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth,
	};
}

export default connect(mapStateToProps)(Scratchpad);
