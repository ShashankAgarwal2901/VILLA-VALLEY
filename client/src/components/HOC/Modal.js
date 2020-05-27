import React from "react";
import classes from "./Modal.module.css";
import { CSSTransition } from "react-transition-group";
import "./Modaltransitions.css";

class Modal extends React.Component {
	constructor() {
		super();
		this.state = {
			show: false,
		};
	}
	componentDidMount() {
		this.setState({ show: true });
	}
	closeModal = () => {
		this.setState({ show: false });
	};
	state = {
		show: false,
	};

	render() {
		let renderChild = React.cloneElement(this.props.children, {
			...this.props,
			closeModal: this.closeModal,
		});
		return (
			<CSSTransition
				in={this.state.show}
				timeout={300}
				classNames="modal"
				unmountOnExit
			>
				<div className={classes.ModalParent}>
					<div className={classes.Modal}>{renderChild}</div>
				</div>
			</CSSTransition>
		);
	}
}

export default Modal;
