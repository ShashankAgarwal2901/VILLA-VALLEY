import React from "react";
import * as actions from "../../../../actions";
import { connect } from "react-redux";

class Authorizations extends React.Component {
	componentDidMount() {
		this.props.fetchAuthList();
	}

	render() {
		return (
			<div className="row">
				<h4 className="center"> New Users to add </h4>
				{this.props.pendingUsers
					? this.props.pendingUsers.map((user, i) => {
							return (
								<div key={i} className="col s12 m6">
									<div className="card blue-grey white">
										<div className="card-content black-text">
											<span className="card-title">
												{user.name}
											</span>
											<p>{user.email}</p>
										</div>
										<div className="card-action">
											<a
												href="#"
												onClick={(e) => {
													e.persist();
													this.props.addUser(
														e,
														user._id
													);
													this.forceUpdate();
												}}
											>
												Accept
											</a>
											<a href="#">Deny</a>
										</div>
									</div>
								</div>
							);
					  })
					: null}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		pendingUsers: state.pendingUsers,
	};
}

export default connect(mapStateToProps, actions)(Authorizations);
