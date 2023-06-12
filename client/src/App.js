//import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from './components/account/firebase-config';
import HomePage from './components/account/HomePage';
import LoginPage from './components/account/LoginPage';
import RegistrationForm from './components/account/RegistrationForm';
import { useState } from 'react';
import CreateBlog from './components/account/CreateBlog';

function App() {
  const  [isAuth, setIsAuth] = useState(false);


    const signUserOut = () => {
      signOut(auth).then(() => {
        localStorage.clear();
        setIsAuth(false);
        window.location.pathname = ('/');
      });
    };
    
  
  return (
    // <div className='App'>
    //       <LoginPage/>
    // </div>

    <BrowserRouter>
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
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/CreateBlog' element={<CreateBlog/>}/>
     <Route path='/LoginPage' element={<LoginPage setIsAuth={setIsAuth}/>}/>
     <Route path='/RegistrationForm' element={<RegistrationForm/>}/> 
    </Routes>
    </BrowserRouter>
    
  );
}


export default App;
