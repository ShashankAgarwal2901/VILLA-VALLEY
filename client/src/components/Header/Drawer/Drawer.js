import React from "react";
import classes from "./Drawer.module.css";
import "./drawerTransitions.css";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";

class Drawer extends React.Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return [
					<li key="1">
						<a
							href="/auth/google"
							className={
								classes.Google +
								" " +
								"collection-item  transparent "
							}
						>
							<h5>Log in with Google</h5>
						</a>
					</li>,
					<li key="2">
						<a href="#" className="collection-item transparent">
							<h6>Sample</h6>
						</a>
					</li>,
					<li key="3">
						<a href="#" className="collection-item  transparent">
							<h6>Sample</h6>
						</a>
					</li>,
					<li key="4">
						<a href="#" className="collection-item  transparent">
							<h6>Sample</h6>
						</a>
					</li>,
				];

			default:
				return [
					<li key="1" style={{ padding: "0 5px" }}>
						<a
							className={
								classes.Google +
								" " +
								"collection-item  transparent"
							}
							href="/api/logout"
						>
							Log Out
						</a>
					</li>,
					<li key="2" style={{ padding: "0 5px" }}>
						<a
							className={
								classes.Google +
								" " +
								"collection-item  transparent"
							}
							href="#"
						>
							Sample
						</a>
					</li>,
					<li key="3" style={{ padding: "0 5px" }}>
						<a
							className={
								classes.Google +
								" " +
								"collection-item  transparent"
							}
							href="#"
						>
							sample
						</a>
					</li>,
				];
		}
	}
	render() {
		return (
			<div>
				<CSSTransition
					in={this.props.show}
					timeout={300}
					classNames="drawer"
					unmountOnExit
				>
					<div className={classes.parent}>
						<a
							href="#"
							onClick={(e) => this.props.showFunction(e, false)}
							className={classes.Xmark}
						>
							X
						</a>
						<div className="row">
							<h3 className="white-text">Logo</h3>
							<div className={classes.a}>
								<div
									className={
										"collection " + classes.Collection
									}
								>
									<ul className="col s12">
										{this.renderContent()}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</CSSTransition>
				<CSSTransition
					in={this.props.show}
					timeout={300}
					classNames="backdrop"
					unmountOnExit
				>
					<div
						onClick={(e) => this.props.showFunction(e, false)}
						className={classes.parent2}
					></div>
				</CSSTransition>
			</div>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Drawer);
