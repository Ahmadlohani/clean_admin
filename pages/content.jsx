import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import axios from "axios";
import {toast} from "react-toastify";
import Table from 'react-bootstrap/Table';
import Link from "next/link";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { storage } from '../components/firebase/Config';
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context";
import UserRoute from '../components/UserRoute/UserRoute';
import renderHTML from 'react-render-html';

const content = () => {

  const [docs, setDocs] = useState([]);
  const [youtubeLinks, setYoutubeLinks] = useState([]);
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    if (state && state.token)
    { 
      fetchDocuments();
      fetchYoutubeLinks();
    }
  }, [state && state.token]);

  const fetchDocuments = async () => {
    try {
      const {data} = await axios.get("/getAllDocuments");
      setDocs(data);
    } catch (error) {
      console.log(error);
    }
  }
  const fetchYoutubeLinks = async () => {
    try {
      const {data} = await axios.get("/getAllYoutubeLinks");
      setYoutubeLinks(data);
    } catch (error) {
      console.log(error);
    }
  }
  const deleteDoc = (_id, filetitle, filesubject, filechapter, filetopic, filename) => {
    const answer = window.confirm("Are you sure to delete?");
    if(!answer) return;
    // Create a reference to the file to delete
    const desertRef = ref(storage, `${filetitle}/${filesubject}/${filechapter}/${filetopic}/${filename}`);
    // Delete the file
    deleteObject(desertRef).then(() => {
      // File deleted successfully
      // toast.error("File Deleted From Firebase");
      const {data} = axios.delete(`/delete-doc/${_id}`);
      toast.error("Deleted Document Successfully");
      try {
        fetchDocuments();
      } catch (error) {
        fetchDocuments();
      }
    }).catch((error) => {
      // Uh-oh, an error occurred!
      toast.error("File not removed from Firebase");
    });
  }
  const deleteUtubeLink = async (_id) => {
    const answer = window.confirm("Are you sure to delete?");
    if(!answer) return;
    try {
      const {data} = await axios.delete(`/delete-link/${_id}`);
      if (data.ok) {
        toast.error("YouTube Link has been deleted from Database");
        fetchYoutubeLinks();
      } else {
        toast.error("Could not delete Link from Database");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <UserRoute>
    <div>
        <Tabs defaultActiveKey="document" id="uncontrolled-tab-example" className="contenttab my-3 px-3 justify-content-center">
        <Tab eventKey="document" title="Document">
          <Table responsive striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Title</th>
                <th>Subject</th>
                <th>Chapter</th>
                <th>Topic</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {docs && docs.map(val => 
              <tr key={val._id}>
                <td>{val.filetitle}</td>
                <td>{val.filesubject}</td>
                <td>{val.filechapter}</td>
                <td>{val.filetopic}</td>
                <td>{renderHTML(val.description)}</td>
                <td>
                <button className='btn btn-sm btn-danger my-1 mx-2 px-2' onClick={() => deleteDoc(
                  val._id,
                  val.filetitle,
                  val.filesubject,
                  val.filechapter,
                  val.filetopic,
                  val.filename
                  )}>Delete</button>
                <a className='btn btn-sm btn-success mx-2 px-2' href={val.image} target={"_blank"}>Download</a>
                </td>
              </tr>
              )}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="YoutubeLink" title="Youtube Link">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Topic</th>
                <th>YouTube Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {youtubeLinks && youtubeLinks.map((val, key) => 
              <tr key={key}>
                <td>{val.topic}</td>
                <td>
                <a href={val.youtube} target={"_blank"}>{val.youtube}</a>
                </td>
                <td>
                <Link href={`/edit/link/${val._id}`}>
                <a className='btn btn-sm btn-primary mx-2 px-2'>Edit</a>
                </Link>
                <button className='btn btn-sm btn-danger mx-2 px-2' onClick={() => deleteUtubeLink(val._id)}>Delete</button>
                </td>
              </tr>
              )}
            </tbody>
          </Table>
        </Tab>
        </Tabs>
    </div>
    </UserRoute>
  )
}

export default content