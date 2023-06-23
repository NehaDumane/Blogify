import React, {useState} from "react";
import { Link } from 'react-router-dom';
import { auth } from "./firebase-config";
import { signOut } from "firebase/auth";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({isAuth, signUserOut}) => {
    
   

return (
    <React.Fragment>
       <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <Link to="/" class="navbar-brand">Blogify</Link>
      
       
          <select class="form-select-padding-y" aria-label="Default select example">
      <option selected>English</option>
      <option value="1">Marathi</option>
      <option value="2">Hindi</option>
    </select>
    
   
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" 
          //value={Categories}
              //onChange={handleSearchInputChange} 
              />
          <button class="btn btn-outline-success" type="submit" >Search</button>
        </form>
        {!isAuth ||
       <Link to="/CreateBlog">
            <button class="btn btn-outline-success" type="submit">CreateBlog</button></Link> 
            }

    { !isAuth ? <Link to="/LoginPage">
            <button class="btn btn-outline-success" type="submit">Login</button></Link> : <button class="btn btn-outline-success" type="submit" onClick={signUserOut}>Logout</button>}
      </div>
    </nav>
    </React.Fragment>
);
};

export default Navbar;