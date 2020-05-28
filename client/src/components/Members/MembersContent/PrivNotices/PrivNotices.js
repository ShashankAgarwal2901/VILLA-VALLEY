import React from "react";
import NewNotice from "./NewNotice/NewNotice.js";
import Modal from "../../../HOC/Modal.js";
import classes from "./PrivNotices.module.css";

class PrivNotices extends React.Component {
	state = {
		showNewNotice: false,
	};
	componentDidMount() {}
	render() {
		return (
			<div>
				<a
					onClick={() => this.setState({ showNewNotice: true })}
					href="#"
					className={"btn-floating btn-large red " + classes.Button}
				>
					<i className="large material-icons">add</i>
				</a>
				{this.state.showNewNotice ? (
					<Modal>
						<NewNotice />
					</Modal>
				) : null}
			</div>
		);
	}
}

export default PrivNotices;
