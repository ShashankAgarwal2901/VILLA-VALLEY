import React from "react";
import axios from "axios";
import { connect } from "react-redux";

class DeleteScratch extends React.Component {
	deleteScratch = async () => {
		const res = await axios.post("/api/delete_scratch", {
			id: this.props.id,
		});
		if (res.data.success) {
			alert("Scratch has been deleted");
			this.props.closeModal();
			this.props.fetch();
		} else {
			alert("Some error occured");
		}
	};
	render() {
		return this.props.auth && this.props.adminStatus === true ? (
			<div className="card white">
				<div className="card-content black-text">
					<span className="card-title">Delete?</span>
					<p>Are you sure you want to Delete this Scratch :</p>
				</div>
				<div className="card-action">
					<a
						href="#"
						onClick={() => {
							this.deleteScratch();
						}}
					>
						Yes
					</a>
					<a onClick={() => this.props.closeModal()} href="#">
						No
					</a>
				</div>
			</div>
		) : null;
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth,
		adminStatus: state.adminStatus,
	};
}

export default connect(mapStateToProps)(DeleteScratch);
