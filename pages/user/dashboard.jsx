import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/UserRoute/UserRoute";
import PostsForm from "../../components/Form/PostsForm";
import axios from "axios";
import {toast} from "react-toastify";
import PostList from "../../components/Card/PostList";
import { ref, getDownloadURL, uploadBytesResumable, getStorage, deleteObject } from "firebase/storage";
import { storage } from "../../components/firebase/Config";

const dashboard = () => {
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [filename, setFilename] = useState("");
    const [uploading, setUploading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [state, setState] = useContext(UserContext);

    useEffect(() => {
        if (state && state.token) fetchUserPosts();
    }, [state && state.token]);
    const fetchUserPosts = async () => {
        try {
            const {data} = await axios.get("/user-posts");
            setPosts(data);
        } catch (error) {
            console.log(error);
        }
    }
    const postSubmit = async (e) => {
        e.preventDefault();
        // console.log("data=>", content);
        try {
            const {data} = await axios.post("/create-post", {content, image, filename});
            if (data.error) {
                toast.error(data.error);
            } else {
                fetchUserPosts();
                toast.success("Post Created Successfully");
                setContent("");
                setImage("");
                setFilename("");
            }
        } catch (error) {
            console.log(error); 
        }
    }
    const reqPostDel = (postId) => {
        const {data} = axios.delete(`/delete-post/${postId}`);
        fetchUserPosts();
        toast.error("Post has been deleted");
    };

    const handleDelete = (postId, filename) => {
        const answer = window.confirm("Are you sure to delete?");
        if(!answer) return;
        if (filename) {
            //Create a reference to the file to delete
            const desertRef = ref(storage, `Blogs/${filename}`);
            // Delete the file
            deleteObject(desertRef).then(() => {
                // File deleted successfully
                // toast.error("File Deleted From Firebase");
                reqPostDel(postId);
            }).catch((error) => {
                // Uh-oh, an error occurred!
                toast.error("Image not removed from Firebase");
            });
        } else {
            reqPostDel(postId);
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
            {/* <div className="row">
                <div className="col">
                    <h4 className="text-center py-5">Blogs</h4>
                </div>
            </div> */}
            <div className="row regImg">
                <div className="col text-center">
                    <h3 className="my-5 text-white">Blogs</h3>
                </div>
            </div>
            <div className="row">
                <PostsForm 
                content={content} 
                setContent={setContent} 
                postSubmit={postSubmit} 
                handleDocument={handleDocument}
                image={image}
                uploading={uploading}
                updateImage={updateImage} 
                />
                <br />
                <PostList posts={posts} handleDelete={handleDelete} />
            </div>
        </div>
        </UserRoute>
    )
}

export default dashboard
