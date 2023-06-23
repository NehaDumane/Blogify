
import React, { useState } from 'react';
import { auth, provider } from './firebase-config';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const LoginPage = ({setIsAuth, isAuth}) => {
  
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth,provider).then(() => {
      localStorage.setItem("isAuth", true);
     setIsAuth(true);
     navigate("/");
    });
  };
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const signIn = (event) => {
    event.preventDefault();
    const errors = validate();
    setErrors(errors);
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    console.log(userCredential);
    localStorage.setItem("isAuth", true);
    setIsAuth(true);
    navigate("/");
   })
     .catch(error => {
       console.error(error);
     });
    };
  

  const validate = () => {
    const errors = {};
    if (email.trim() === '') {
      errors.username = 'Email is required';
    }
    if (password.trim() === '') {
      errors.password = 'Password is required';
    }
    return errors;
  };


  return (
    <div class="wrapper d-flex align-items-center justify-content-center m-5">
      <div class="row align-self-center justify-content-center m-3 shadow p-3 bg-body rounded">
        {!isAuth ? "Login" : "Register"}
      <form class="p-2" onClick={signIn}>
        <label class="p-2">
          Email:
          <input class="form-control mb-2" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <div class="text-danger">{errors.email}</div>}
        </label >
        <br />
        <label class="p-2">
          Password:
          <input class="form-control mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <div class="text-danger">{errors.password}</div>}
        </label>
        <br />
        {errors.login && <div class="text-danger">{errors.login}</div>}
         <button type="submit" class="btn btn-outline-success m-2" onClick={signIn}>Login</button>
        <br/>
        <button  class="btn btn-outline-success m-2" onClick={signInWithGoogle}>Sign in with google</button>
         <p class="m-3">Don't have an account? </p>
         <Link to="/RegistrationForm">
        <button class="btn btn-outline-success m-2" type="submit">Register</button></Link>
      </form>
      </div>
    </div>
  );
};

export default LoginPage;


