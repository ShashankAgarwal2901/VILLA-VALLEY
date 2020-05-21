import React from "react";
import { Link } from "react-router-dom";
import classes from "./Pending.module.css";

const Pending = () => {
	return (
		<div className="container center">
			<h3>Thank you!</h3>
			<h4>Your account is pending for verification by admin</h4>
			<Link to={"/"} className="waves-effect waves-light btn-large">
				{" "}
				Return to home{" "}
			</Link>
		</div>
	);
};

export default Pending;
