import React, { Component } from "react";
import classes from "./MembersContainer.module.css";
import MembersOptions from "./MembersOptions/MembersOptions.js";
import { CSSTransition } from "react-transition-group";
import MembersContent from "./MembersContent/MembersContent.js";

class MembersContainer extends Component {
	constructor() {
		super();
		this.state = { screenWidth: null, ContentState: "all-users" };
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateWindowDimensions());
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({ screenWidth: window.innerWidth });
		if (window.innerWidth <= 800) {
			this.setState({ showDrawer: false });
		}
	}

	closeDrawer = () => {
		this.setState({ showDrawer: false });
	};

	MembersContentState = (e, a) => {
		this.setState({ ContentState: a });
		e.preventDefault();
	};

	contentToRender = () => {
		if (this.state.screenWidth > 800) {
			return (
				<div className={classes.parent}>
					<div className={"col s4 " + classes.LargeOptions}>
						<MembersOptions
							closeDrawerfunc={() => null}
							content={this.state.ContentState}
							func={this.MembersContentState}
						/>
					</div>
					<div className={"col s8 " + classes.Content}>
						<MembersContent content={this.state.ContentState} />
					</div>
				</div>
			);
		} else {
			return (
				<div className={classes.parent}>
					<a
						href="#"
						onClick={(e) => {
							e.persist();
							this.setState({ showDrawer: true });
						}}
						className={
							"btn-floating btn-large red " + classes.Button
						}
					>
						<i className="large material-icons">reorder</i>
					</a>
					<CSSTransition
						in={this.state.showDrawer}
						timeout={300}
						classNames="drawer"
						unmountOnExit
					>
						<div className={classes.MembersDrawerParent}>
							<MembersOptions
								closeDrawerfunc={this.closeDrawer}
								content={this.state.ContentState}
								func={this.MembersContentState}
							/>
						</div>
					</CSSTransition>
					<div
						onClick={(e) => {
							e.persist();
							this.setState({ showDrawer: false });
						}}
						className={"col s12 " + classes.Content}
					>
						<MembersContent content={this.state.ContentState} />
					</div>
				</div>
			);
		}
	};

	render() {
		return <div className="row">{this.contentToRender()}</div>;
	}
}

export default MembersContainer;
