import React, { useState, useEffect } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { db, auth, storage } from "./firebase-config";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";

const initialState = {
  title: "",
  languague: "",
  category: "",
  description: "",
  comments: [],
  likes: []
};

const categoryOption = [
  "Food",
  "Science",
  "Arts",
  "Technology",
  "Music",
];

const languagueOption = [
  "English",
  "Hindi",
  "Marathi",
];

const CreateBlog = ({ setisAuth }) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const { title, category, languague, description } = form;

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            console.log("Image upload to firebase successfully");
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "CreateBlog", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
    setisAuth(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const onLanguagueChange = (e) => {
    setForm({ ...form, languague: e.target.value });
  };
 
  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && languague && title && description) {
      if (!id) {
        try {
          await addDoc(collection(db, "CreateBlog"), {
            ...form,
            timestamp: serverTimestamp(),
            author: auth.currentUser.displayName,
            userId: auth.currentUser.uid,
          });
          console.success("Blog created successfully");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await updateDoc(doc(db, "CreateBlog", id), {
            ...form,
            timestamp: serverTimestamp(),
            author: auth.currentUser.displayName,
            userId: auth.currentUser.uid,
          });
          console.log("Blog updated successfully");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      return console.error("All fields are mandatory to fill");
    }

    navigate("/");
  };

  return (
    <div className="container-fluid col-6">
      <div className="container shadow m-2 align-self-center">
        <div className="col-12">
          <div className="text-center heading p-2">
            {id ? "Update Blog" : "Create Blog"}
          </div>
        </div>
        <div className="row h-50 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row blog-form" onSubmit={handleSubmit}>
              <div className="col-12 py-3">
                <input
                  type="text"
                  className="form-control input-text-box"
                  placeholder="Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 py-3 form-select-padding-y">
                <select
                  value={category}
                  onChange={onCategoryChange}
                  className="catg-dropdown"
                >
                  <option>Please select category</option>
                  {categoryOption.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 py-3">
                <select
                  value={languague}
                  onChange={onLanguagueChange}
                  className="catg-dropdown"
                >
                  <option>Please select languague</option>
                  {languagueOption.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 py-3">
                <textarea
                  className="form-control description-box"
                  placeholder="Description"
                  value={description}
                  name="description"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control bg-success"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div className="col-12 py-3 text-center">
                <button
                  className="btn btn-outline-success m-2"
                  type="submit"
                  disabled={progress !== null && progress < 100}
                >
                  {id ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
