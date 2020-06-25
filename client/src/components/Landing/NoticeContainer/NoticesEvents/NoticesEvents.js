import React from "react";
import classes from "./NoticesEvents.module.css";
import Notices from "./Notices/Notices.js";
import Events from "./Events/Events.js";
import { CSSTransition } from "react-transition-group";

const NoticesEvents = (props) => {
	{
		return (
			<div className={"row " + classes.overflow}>
				{props.notices ? <Notices /> : <Events />}
			</div>
		);
	}
};

export default NoticesEvents;
