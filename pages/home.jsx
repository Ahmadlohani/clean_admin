import Card from 'react-bootstrap/Card';
import AboutCont from '../components/AboutCont';
import UserRoute from "../components/UserRoute/UserRoute";

const Home = () => {
    const aboutImage = "/images/about.jpg";
    return (
        <UserRoute>
        <div className="container-fluid">
            <div className="row my-3">
                <div className="col d-flex justify-content-center">
                <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" height={"150px"} src="/images/smi1.jpg" />
                <Card.Body>
                    <Card.Title className='text-center'>Social Media Site</Card.Title>
                    <Card.Text>
                    This is a social media site where you can create posts. Add Images
                    and change content at any time.
                    </Card.Text>
                </Card.Body>
                </Card>
                </div>
                <div className="col d-flex justify-content-center">
                <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" height={"150px"} src="/images/smi2.jpg" />
                <Card.Body>
                    <Card.Title className='text-center'>Activity</Card.Title>
                    <Card.Text>
                    You can follow others. See their Posts and comment on Posts
                    to deliver what you feel about them.
                    </Card.Text>
                </Card.Body>
                </Card>
                </div>
                <div className="col d-flex justify-content-center">
                <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" height={"150px"} src="/images/smi3.jpg" />
                <Card.Body>
                    <Card.Title className='text-center' >Authentication</Card.Title>
                    <Card.Text>
                    Login for best User Experience. Feel the Magic
                    of Social Media Activities.
                    </Card.Text>
                </Card.Body>
                </Card>
                </div>
            </div>
            <div className="row">
                <div className="col">
                <AboutCont aboutImage={aboutImage} />
                </div>
            </div>
        </div>
        </UserRoute>
    )
}

export default Home;
