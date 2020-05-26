import React from "react";

const Card = (props) => {
	return (
		<div className="card">
			<div className="card-image">
				<img src={props.image} alt="Card image" />
			</div>
		</div>
	);
};

export default Card;
