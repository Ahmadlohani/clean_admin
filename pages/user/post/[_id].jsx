import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import UserRoute from "../../../components/UserRoute/UserRoute";
import PostsForm from "../../../components/Form/PostsForm";
import axios from "axios";
import {toast} from "react-toastify";
const EditPost = () => {
    const [post, setPost] = useState({});
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [filename, setFilename] = useState("");
    const [uploading, setUploading] = useState(false);
    const router = useRouter();
    const _id = router.query._id;
    useEffect(() => {
        if (_id) fetchPost(); 
    }, [_id])
    const fetchPost = async () => {
        try {
            const {data} = await axios.get(`/user-post/${_id}`);
            setPost(data);
            setContent(data.content);
            setImage(data.image);
            setFilename(data.filename);
        } catch (error) {
            console.log(error);
        }
    }
    const postSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.put(`/update-post/${_id}`, {content, image});
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success("Post Updated Successfully");
                router.push("/user/dashboard");
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleDocument = (e) => {
        setUploading(true);
        if (filename === "") {
            updateImage(e);
        } else {
            //Create a reference to the file to delete
            const desertRef = ref(storage, `Blogs/${filename}`);
            // Delete the file
            deleteObject(desertRef).then(() => {
                // File deleted successfully
                // toast.error("File Deleted From Firebase");
                setFilename("");
                setImage("");
                updateImage(e);
            }).catch((error) => {
                // Uh-oh, an error occurred!
                toast.error("Image not removed from Firebase");
                setUploading(false);
            });
        }
    }
    const updateImage = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("document", file);
        // console.log([...formData]);
        const filedata = [...formData];
        const filename = filedata[0][1].name;
        const extension = filename.split('.').pop();
        if (extension != "png" && extension != "PNG" && extension != "jpg" && extension != "JPG" && extension != "jpeg" && extension != "JPEG" && extension != "tiff" && extension != "TIFF") {
            toast.error("Only PNG, JPG, JPEG and TIFF are allowed. Try to re-upload");
            setUploading(false);
        } else {
            handleImage(file);
        }
    }
    const handleImage = (file) => {
        if (!file){
            toast.error("There is no file");
            setUploading(false);
        }
        const sotrageRef = ref(storage, `Blogs/${file.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, file);
    
        uploadTask.on(
        "state_changed",
        (snapshot) => {
            const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
        },
        (error) => console.log(error),
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImage(downloadURL);
            setFilename(file.name);
            setUploading(false);
            });
        }
        );
    }
    return (
        <UserRoute>
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h4 className="text-center py-5">NewsFeed</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                <PostsForm 
                content={content} 
                setContent={setContent} 
                postSubmit={postSubmit} 
                handleDocument={handleDocument}
                image={image}
                uploading={uploading} 
                />
                </div>
            </div>
        </div>
        </UserRoute>
    )
}

export default EditPost
