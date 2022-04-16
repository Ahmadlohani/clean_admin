import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import dynamic from "next/dynamic";
import {CameraOutlined, LoadingOutlined} from "@ant-design/icons"
import {Avatar} from "antd";
const ReactQuill = dynamic(() => import("react-quill"), {ssr: false});
import 'react-quill/dist/quill.snow.css';
const PostsForm = ({content, setContent, postSubmit, handleDocument, image, uploading}) => {
    return (
        <div>
            <Card>
            <Card.Body>
            <Form>
            <ReactQuill 
            theme="snow"
            value={content}
            onChange={e => setContent(e)}
            placeholder="Write Something here..."
            />
            </Form>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between text-muted">
            <Button disabled={!content} variant="primary" className="sm" onClick={postSubmit}>
                Submit
            </Button>
            <label>
                {
                    image ? (<Avatar size={30} src={image} className="mt-1" />) : uploading ? (<LoadingOutlined className="mt-3 pointer" />) : (<CameraOutlined className="mt-3 pointer" />)
                }
                <input onChange={handleDocument} type="file" accept="images/*" hidden />
            </label>  
            </Card.Footer>
            </Card>
        </div>
    )
}

export default PostsForm
