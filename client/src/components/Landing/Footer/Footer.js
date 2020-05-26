import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
	return (
		<footer className={"page-footer " + classes.color}>
			<div className="container">
				<div className="row">
					<div className="col l6 s12">
						<h5 className="white-text">Villa Valley Website</h5>
						<p className="grey-text text-lighten-4">
							10th B Main road , Nisarga layout , Yelahanka,
							Bangalore - 560064
						</p>
					</div>
					<div className="col l4 offset-l2 s12">
						<h5 className="white-text">Links</h5>
						<ul>
							<li>
								<a
									href="#"
									className="grey-text text-lighten-3"
								>
									Link 1
								</a>
							</li>
							<li>
								<a
									href="#"
									className="grey-text text-lighten-3"
								>
									Link 2
								</a>
							</li>
							<li>
								<a
									href="#"
									className="grey-text text-lighten-3"
								>
									Link 3
								</a>
							</li>
							<li>
								<a
									href="#"
									className="grey-text text-lighten-3"
								>
									Link 4
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="footer-copyright">
				<div className="container">
					© 2014 Copyright Text
					<a
						href="#"
						className="grey-text text-lighten-4 right"
						href="#!"
					>
						More Links
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
