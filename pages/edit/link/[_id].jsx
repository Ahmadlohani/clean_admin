import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import UserRoute from "../../../components/UserRoute/UserRoute";
import axios from "axios";
import {toast} from "react-toastify";
import Form from 'react-bootstrap/Form';

const EditLink = () => {

    const [topic, setTopic] = useState("");
    const [youtube, setYoutube] = useState("");
    const [submitloading, setSubmitLoading] = useState(false);

    const router = useRouter();
    const _id = router.query._id;
    useEffect(() => {
        if (_id && _id.length == 24){ 
            fetchYoutubeLink();
        } else {
            router.push("/content");
        }
    }, [_id])
    const fetchYoutubeLink = async () => {
        try {
            const {data} = await axios.get(`/utube-link/${_id}`);
            setTopic(data.topic);
            setYoutube(data.youtube);
        } catch (error) {
            console.log(error);
            router.push("/content");
        }
    }
    const handleYoutubeSubmit = async (e) => {
        try {
            const {data} = await axios.put(`/update-link/${_id}`, {topic, youtube});
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success("Link Updated Successfully");
                router.push("/content");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h4 className="text-center py-5">Add Youtube Links Here</h4>
                </div>
            </div>
            <div className="w-50 mx-auto">
            <Form>
                <Form.Group className="mb-3">
                <Form.Control type="text" value={topic} onChange={ e => setTopic(e.target.value)} placeholder="Topic Name" />
                </Form.Group>
            </Form>
            </div>
            <div className="w-50 mx-auto">
            <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="YouTube Links Here" className='textInputField' value={youtube} onChange={e => setYoutube(e.target.value)} />
            </Form.Group>
            </div>
            <div className="text-center my-2">
                <button className='submitBtn' disabled={ !topic || !youtube } onClick={e => handleYoutubeSubmit(e)}>
                { submitloading ? <SyncOutlined spin className="py-1" /> : "Submit" }
                </button>
            </div>
        </div>
    )
}

export default EditLink
