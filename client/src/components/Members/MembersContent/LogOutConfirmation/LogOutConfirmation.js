import React from "react";

const LogOutConfirmation = (props) => {
	return (
		<div className="card white">
			<div className="card-content black-text">
				<span className="card-title">Log Out?</span>
				<p>Are you sure you want to Log Out?</p>
			</div>
			<div className="card-action">
				<a href="/api/logout">Yes</a>
				<a onClick={() => props.closeModal()} href="#">
					No
				</a>
			</div>
		</div>
	);
};

export default LogOutConfirmation;
