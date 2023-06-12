import React from "react";
import { Link } from "react-router-dom";
import { excerpt } from ".";

const BlogSection = ({
  id,
  title,
  description,
  category,
  imgUrl,
  userId,
  author,
  timestamp,
  user,
  handleDelete,
}) => {
  return (
    <div class="container d-flex m-0 p-0"> 
  
     <div class="container-sm d-flex col">
  
     <div className="row">

    <div class="card m-5">
   <img src={imgUrl} class="card-img-top" alt="..."/>
   <div class="card-body">
   <div class="m-0 p-0">
   <label class="form-label">{category}</label>
   <br/>
   <label for="exampleFormControlInput1" class="form-label">{title}</label>
   <br/>
   <label for="exampleFormControlInput1" class="form-label">{author}</label>
   {timestamp.toDate().toDateString()}
   <p className="form-control">
             {excerpt(description, 120)}
           </p>
 </div>

     <Link to={`/detail/${id}`} class="btn btn-primary m-2">Read More</Link>
     {user && user.uid === userId && (
             <div >
               <input
                 name="trash"
                 onClick={() => handleDelete(id)}
               />
               <Link to={`/update/${id}`}>
                 <input
                   name="edit"
                   style={{ cursor: "pointer" }}
                 />
               </Link>
             </div>
           )}
   </div>
 </div>
 </div>
 
 </div>
            </div>
  );
};

export default BlogSection;