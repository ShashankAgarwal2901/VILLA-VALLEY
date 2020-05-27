import React from "react";

const LogOutConfirmation = (props) => {
	return (
		<div class="card white">
			<div class="card-content black-text">
				<span class="card-title">Log Out?</span>
				<p>Are you sure you want to Log Out?</p>
			</div>
			<div class="card-action">
				<a href="/api/logout">Yes</a>
				<a onClick={() => props.closeModal()} href="#">
					No
				</a>
			</div>
		</div>
	);
};

export default LogOutConfirmation;
