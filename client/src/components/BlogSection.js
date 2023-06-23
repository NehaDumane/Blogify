import React from "react";
import { Link } from "react-router-dom";
import { excerpt } from ".";

const BlogSection = ({
  id,
  isAuth,
  title,
  description,
  category,
  imgUrl,
  author,
  timestamp,
  handleDelete,
}) => {
  return (
   <div class="container d-flex m-0 p-0"> 
    <div class="container-sm d-flex col">
    <div className="row">

    <div class="card m-5" style={{width: '30vw'}}>
   <img src={imgUrl} class="card-img-top m-1" alt="..." style={{ height: '22vh', width: '28vw' }}/>
   <div class="card-body">
   <div class="m-0 p-0">
   <label class="form-label"><h4>{category}</h4></label>
   <br/>
   <label for="exampleFormControlInput1" class="form-label"><h4>{title}</h4></label>
   <br/>
   <label for="exampleFormControlInput1" class="form-label">{author}</label>
   {timestamp.toDate().toDateString()}
   <p className="form-control">
             {excerpt(description, 120)}
           </p>
 </div>
   <div>
   <Link to={`/detail/${id}`} class="btn btn-primary m-2">Read More</Link>
   </div>
     
     {isAuth &&  (
             <div >
               <button
                 name="trash"
                 onClick={() => handleDelete(id)}
               />
               <Link to={`/update/${id}`}>
                 <button
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