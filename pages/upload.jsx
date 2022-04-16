import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import UserRoute from "../components/UserRoute/UserRoute";
import { toast } from 'react-toastify';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../components/firebase/Config";
import axios from "axios";
import {SyncOutlined} from "@ant-design/icons";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), {ssr: false});
import 'react-quill/dist/quill.snow.css';
import { async } from '@firebase/util';

const upload = () => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [filename, setFilename] = useState("");
  const [image, setImage] = useState("");
  const [youtube, setYoutube] = useState("");
  const [progress, setProgress] = useState(0);
  const [imageloading, setImageLoading] = useState(false);
  const [submitloading, setSubmitLoading] = useState(false);

  const handleDocument = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("document", file);
    // console.log([...formData]);
    const filedata = [...formData];
    const filename = filedata[0][1].name;
    const extension = filename.split('.').pop();
    if (extension != "docx" && extension != "DOCX" && extension != "pdf" && extension != "PDF") {
        toast.error("Only word and pdfs are allowed. Try to re-upload");
    } else {
        handleUpload(file);
    }
  }
  const handleUpload = (file) => {
    setImageLoading(true);
    if (!file){
      toast.error("There is no file");
      setImageLoading(false);
    }
    const farray = upperCase(title, subject, chapter, topic);
    const sotrageRef = ref(storage, `${farray[0]}/${farray[1]}/${farray[2]}/${farray[3]}/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
          setFilename(file.name);
          setImageLoading(false);
        });
      }
    );
  }
  const handleYoutubeSubmit = async (e) => {
    const confirm = window.confirm("Are you sure to submit?");
    if (!confirm) {
      return false;
    }
    setSubmitLoading(true);
    const utubeData = {
      topic,
      youtube
    };
    try {
      const {data} = await axios.post("/saveYoutubeLinks", utubeData);
      if (data.ok) {
        toast.success("Youtube Link Saved Successfully");
        setTopic("");
        setYoutube("");
        setSubmitLoading(false);
      } else {
        toast.error("Could not save Youtube Link to database");
        setSubmitLoading(false);
      }
    } catch (error) {
      console.log(error);
      setSubmitLoading(false);
    }
  }
  const upperCase = (title, subject, chapter, topic) => {
    const ftitle = title.toUpperCase();
    const fsubject = subject.toUpperCase();
    const fchapter = chapter.toUpperCase(); 
    const ftopic = topic.toUpperCase();
    const farray = [ftitle, fsubject, fchapter, ftopic];
    return farray;
  }
  const handleSubmit = async (e) => {
    const confirm = window.confirm("Are you sure to submit?");
    if (!confirm) {
      return false;
    }
    setSubmitLoading(true);
    const fileArray = upperCase(title, subject, chapter, topic);
    const filetitle = fileArray[0];
    const filesubject = fileArray[1];
    const filechapter = fileArray[2];
    const filetopic = fileArray[3];
    const documentData = {
      filetitle,
      filesubject,
      filechapter,
      filetopic,
      description,
      filename,
      image
    };
    try {
      const {data} = await axios.post("/addDoc", documentData);
      if (data.ok) {
        toast.success("Document Added Successfully");
        setChapter("");
        setImage("");
        setSubject("");
        setProgress(0);
        setTitle("");
        setTopic("");
        setDescription("");
        setFilename("");
        setSubmitLoading(false);
      } else {
        toast.error("Could not add Document to database");
        setSubmitLoading(false);
      }
    } catch (error) {
      console.log(error);
      setSubmitLoading(false);
    }
  }
  return (
    <UserRoute>
    <div>
        <div className="row regImg">
            <div className="col text-center">
                <h3 className="my-5 text-white">Upload Content</h3>
            </div>
        </div>
        <Tabs defaultActiveKey="document" id="uncontrolled-tab-example" className="contenttab my-3 px-3 justify-content-center">
        <Tab eventKey="document" title="Document">
            <div className="w-50 shadow-sm px-3 py-2 my-2 mx-auto">
            <Form>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={title} onChange={ e => setTitle(e.target.value)} placeholder="MDCAT, PPSC etc" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" value={subject} onChange={ e => setSubject(e.target.value)} placeholder="physics, math etc" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicFileName">
              <Form.Label>FileName</Form.Label>
              <Form.Control type="text" value={chapter} onChange={ e => setChapter(e.target.value)} placeholder="chapter1 etc" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTopic">
              <Form.Control type="text" value={topic} onChange={ e => setTopic(e.target.value)} placeholder="Topic Name" />
            </Form.Group>
            <ReactQuill 
            theme="snow"
            value={description}
            onChange={e => setDescription(e)}
            placeholder="Write Descritpion here..."
            />
          </Form>
            </div>
            <div className="file-input d-flex justify-content-center">
            <input onChange={handleDocument} type="file" id="file" className="file" disabled={!title || !subject || !chapter || !topic || image} />
            <label htmlFor="file">
            { imageloading ? <SyncOutlined spin className="py-1" /> : "Select file" }
            </label>
            </div>
            { progress > 0 && 
            <div className="w-50 mx-auto my-2">
            <div className="progress">
              <div className="progress-bar" role="progressbar" style={{"width": `${progress}%`}} aria-valuemin="0" aria-valuemax="100">{progress}%</div>
            </div>
            </div>
            }
            <div className="text-center my-2">
              <button className='submitBtn' disabled={!title || !subject || !chapter || !topic || !image || !description} onClick={e => handleSubmit(e)}>
              { submitloading ? <SyncOutlined spin className="py-1" /> : "Submit" }
              </button>
            </div>
        </Tab>
        <Tab eventKey="YoutubeLink" title="Youtube Link">
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
        </Tab>
        </Tabs>
    </div>
    </UserRoute>
  )
}

export default upload