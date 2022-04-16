import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
const AboutCont = ({aboutImage}) => {
    return (
        <div>
        <Container className="my-5">
        <Row>
            <Col className="col-lg-6 col-sm-12 p-3">
                <h3>About Us</h3>
                <h5>We are Professional Teams to Growth your Business</h5>
                <p>
                But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of
                </p>
            </Col>
            <Col className="col-lg-6 col-sm-12 parallelogram">
            <img src={aboutImage} alt="About" width="100%" height="300px" />
            </Col>
        </Row>
        </Container>  
        </div>
    )
}

export default AboutCont
