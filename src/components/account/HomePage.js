 import {
   collection,
   deleteDoc,
   doc,
   getDocs,
   limit,
//   onSnapshot,
   query,
   orderBy,
//   where,
//  startAfter,
 } from "firebase/firestore";
 import React, {useState,useEffect} from "react";
 import BlogSection from "../BlogSection";
 import { auth,db } from "./firebase-config";
 import { toast } from "react-toastify";
// import Search from "../Search";
// import { isEmpty, isNull } from "lodash";
// import { useLocation } from "react-router-dom";
// import Category from "../Category";
import { Link } from 'react-router-dom';
import '../../App';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import CreateBlog from "./CreateBlog";


// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

const HomePage = ({isAuth,setIsAuth}) => {

   const [loading, setLoading] = useState(true);
   const [CreateBlog, setBlogs] = useState([]);
  // const [search, setSearch] = useState("");
   const [lastVisible, setLastVisible] = useState(null);
  // const [totalBlogs, setTotalBlogs] = useState(null);
   const [hide, setHide] = useState(false);
  // const queryString = useQuery();
  // const searchQuery = queryString.get("searchQuery");
  // const location = useLocation();

  useEffect(() => {
    getBlogs();
    setHide(false);
  }, [isAuth]);

   const getBlogs = async () => {
     const blogRef = collection(db, "CreateBlog");
     console.log(blogRef);
     const firstFour = query(blogRef, orderBy("title"), limit(4));
     const docSnapshot = await getDocs(firstFour);
     setBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
     setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1]);
   };

  
  // const updateState = (docSnapshot) => {
  //   const isCollectionEmpty = docSnapshot.size === 0;
  //   if (!isCollectionEmpty) {
  //     const blogsData = docSnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setBlogs((blogs) => [...blogs, ...blogsData]);
  //     setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1]);
  //   } else {
  //     toast.info("No more blog to display");
  //     setHide(true);
  //   }
  // };


  // const fetchMore = async () => {
  //   setLoading(true);
  //   const blogRef = collection(db, "blogs");
  //   const nextFour = query(
  //     blogRef,
  //     orderBy("title"),
  //     limit(4),
  //     startAfter(lastVisible)
  //   );
  //   const docSnapshot = await getDocs(nextFour);
  //   updateState(docSnapshot);
  //   setLoading(false);
  // };

  // const searchBlogs = async () => {
  //   const blogRef = collection(db, "blogs");
  //   const searchTitleQuery = query(blogRef, where("title", "==", searchQuery));
  //   const searchTagQuery = query(
  //     blogRef,
  //     where("tags", "array-contains", searchQuery)
  //   );
  //   const titleSnapshot = await getDocs(searchTitleQuery);
  //   const tagSnapshot = await getDocs(searchTagQuery);

  //   let searchTitleBlogs = [];
  //   let searchTagBlogs = [];
  //   titleSnapshot.forEach((doc) => {
  //     searchTitleBlogs.push({ id: doc.id, ...doc.data() });
  //   });
  //   tagSnapshot.forEach((doc) => {
  //     searchTagBlogs.push({ id: doc.id, ...doc.data() });
  //   });
  //   const combinedSearchBlogs = searchTitleBlogs.concat(searchTagBlogs);
  //   setBlogs(combinedSearchBlogs);
  //   setHide(true);
  //   setIsAuth("");
  // };


  // useEffect(() => {
  //   if (!isNull(searchQuery)) {
  //     searchBlogs();
  //   }
  // }, [searchQuery]);

  
   const handleDelete = async (id) => {
     if (window.confirm("Are you sure wanted to delete that blog ?")) {
       try {
         setLoading(true);
         await deleteDoc(doc(db, "CreateBlog", id));
         toast.success("Blog deleted successfully");
         setLoading(false);
       } catch (err) {
         console.log(err);
       }
     }
   };


  // const handleChange = (e) => {
  //   const { value } = e.target;
  //   if (isEmpty(value)) {
  //     console.log("test");
  //     getBlogs();
  //     setHide(false);
  //   }
  //   setSearch(value);
  // };


  // const counts = totalBlogs.reduce((prevValue, currentValue) => {
  //   let name = currentValue.category;
  //   if (!prevValue.hasOwnProperty(name)) {
  //     prevValue[name] = 0;
  //   }
  //   prevValue[name]++;
  //   // delete prevValue["undefined"];
  //   return prevValue;
  // }, {});

  // const categoryCount = Object.keys(counts).map((k) => {
  //   return {
  //     category: k,
  //     count: counts[k],
  //   };
  // });



    return (
        <React.Fragment>
 <div class="container d-flex m-0 p-0"> 
  
  <div class="col-sm-2 bg-dark">
    <div id="list-example" class="d-flex flex-column align-items-center min-vh-100">
      <Link class="p-3 text-decoration-none text-white" href="#list-item-1"><h5>Categories</h5></Link>
      <a class="p-2 text-decoration-none text-white" href="#simple-list-item-2">Food</a>
      <a class="p-2 text-decoration-none text-white" href="#simple-list-item-2">Science</a>
      <a class="p-2 text-decoration-none text-white" href="#simple-list-item-3">Art</a>
      <a class="p-2 text-decoration-none text-white" href="#simple-list-item-4">Technology</a>
      <a class="p-2 text-decoration-none text-white" href="#simple-list-item-5">Music</a> 
     </div> 
  </div>

   <div class="container-sm d-flex flex-column mb-2 py-3 ">

   <div className="row mx-0">
          <div className="col-md-2">
            <div className="blog-heading text-start py-2 mb-2">Daily Blogs</div>
            {CreateBlog?.map((blog) => (
              <BlogSection
                key={blog.id}
                user={auth.currentUser.uid}
                handleDelete={handleDelete}
                {...blog}
              />
            ))}
          </div>
        </div> 



      </div>  

 </div>


      
        </React.Fragment>
        
    );
};

export default HomePage;