import React from "react";
import classes from "./ContainerHeader.module.css";

const ContainerHeader = (props) => {
	return (
		<div className="row">
			<div className="col l3 m3 s6">
				<a
					name="Notices"
					href="#"
					onClick={(e) => {
						e.persist();
						props.clicked(e, true);
					}}
					className={
						"left " +
						classes.Button +
						" " +
						(props.active ? classes.active : null)
					}
				>
					<i className="material-icons left">assignment</i>Notices
				</a>
			</div>
			<div className="col l3 m3 s6">
				<a
					href="#"
					onClick={(e) => {
						e.persist();
						props.clicked(e, false);
					}}
					className={
						"left " +
						classes.Button +
						" " +
						(props.active ? null : classes.active)
					}
				>
					<i className="material-icons left">event_seat</i>Events
				</a>
			</div>
		</div>
	);
};

export default ContainerHeader;
