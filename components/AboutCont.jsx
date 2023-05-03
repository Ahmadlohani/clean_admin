import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const AboutCont = ({ aboutImage }) => {
	return (
		<div>
			<Container className="my-5">
				<Row>
					<Col
						xs={12}
						sm={12}
						md={12}
						lg={6}
						className="p-3"
					>
						<h3>About Us</h3>
						<h5>Food Delivery Program</h5>
						<p>
							Bhook Mitao is a web app which aims to help
							reduce mal nutrition and food shortage for the
							poor and needy people. It will involve certain
							organizations and donor restaurants and
							hotels.Individual persons can also donate
							whenever they want
						</p>
					</Col>
					<Col
						xs={12}
						sm={12}
						md={12}
						lg={6}
						className="parallelogram"
					>
						<img
							src={aboutImage}
							alt="About"
							width="100%"
							height="300px"
						/>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default AboutCont;
