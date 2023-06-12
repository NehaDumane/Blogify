import React, { useState } from 'react';
//import { auth } from './firebase-config';
import { addDoc, collection } from 'firebase/firestore';
import { db,auth } from './firebase-config';
import {useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
//import { Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';


const RegistrationForm = ({isAuth}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

   let navigate = useNavigate();
  
//   const register = async() => {
//     if (!isAuth) {
//       if (username && email && password && confirmPassword) {
//     await addDoc(userRegister, {username, email, password, confirmPassword});
//     navigate("/LoginPage");
//   }
// }
//   }


  const signUp = (event) => {
    event.preventDefault();
    const errors = validate();
      setErrors(errors);
      if (!isAuth) {
      createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        navigate("/LoginPage");
      })
         .catch(error => {
           console.error(error);
         });
        }
  };

  const validate = () => {
    const errors = {};
    if (email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (password.trim() === '') {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    return errors;
  };

  return (
    <div class="wrapper d-flex align-items-center justify-content-center m-5">
      <div class="row align-self-center justify-content-center m-2 shadow p-3 bg-body rounded">
      <form class="p-2" onSubmit={signUp}>
        <label class="p-1">
          Email:
          <input class="form-control mb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <div class="text-danger">{errors.email}</div>}
        </label>
        <br />
        <label class="p-1">
          Password:
          <input class="form-control mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <div class="text-danger">{errors.password}</div>}
        </label>
        <br />
        {errors.registration && <div class="text-danger">{errors.registration}</div>}
        <button class="btn btn-outline-success m-2" type="submit" onClick={signUp}>Register</button>
      </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
