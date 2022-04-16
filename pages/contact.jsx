import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), {ssr: false});
import 'react-quill/dist/quill.snow.css';
const contact = () => {
    return (
        <div className="container">
            <div className="row">
            <div className="col-md-6 offset-md-3 border my-3 py-3">
            <h3 className="text-center">Contact Form</h3>
            <hr />
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <ReactQuill 
            theme="snow"
            className='my-2'
            placeholder="Write Message Here..."
            />
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
            </div>
            </div>  
        </div>
    )
}

export default contact



