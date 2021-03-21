import { UserContext } from './../../App';
import React from 'react';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const [newUser, setNewUser] = useState(false);

    const[user,setUser] = useState({
        isSignedIn: false,
        name: "",
        email: "",
        password: "",
        photo: ""
      })

      const handleSubmit = (e)=>{
          if(newUser && user.email && user.password){
              firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
              .then(res=> {
                  console.log(res)
                  const newUserInfo = {...user}
                  newUserInfo.error = '';
                  newUserInfo.success = true;
                  setUser(newUserInfo);
                  updateUser(user);
              })
              .catch((error) => {
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                setUser(newUserInfo);
                // const errorCode = error.code
                // var errorMessage = error.message;
                // console.log(errorCode, errorMessage)
            });
          }
          if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
            console.log('user signed in')
            })
            .catch(function(error) {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo);
            });
            
          }
          e.preventDefault()

      }

    const provider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleLogin = ()=>{
        firebase.auth().signInWithPopup(provider)
        .then(res => {
          const {displayName, email, photoURL} = res.user;
          const signedInUser = 
          {isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL}
          setUser(signedInUser);
          setLoggedInUser(signedInUser)
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            // ...
        });
    }

    const handleBlur = (e)=>{
        console.log(e.target.name, e.target.value)
        let isFormValid;
        if(e.target.name === 'email'){
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
            console.log(isFormValid)
        }
        if(e.target.name === 'password'){
            isFormValid = e.target.value.length > 6;
            console.log(isFormValid)
        }
        if(isFormValid){
            const newUserInfo = {...user}
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    
    const updateUser = name =>{
        var user = firebase.auth().currentUser;

        user.updateProfile({
        displayName: name
        }).then(function() {
            console.log('updated successfuly')
        // Update successful.
        }).catch(function(error) {
        // An error happened.
        });
    }
    
    
    return (
        <div className='form-div'>
            <h1>{user.name}</h1>
           <form className='form-field'>
                <h3>Create new account</h3>
                <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
                <label htmlFor="newUser">New User Sign up</label>
                <input onBlur={handleBlur} className='form-control' type="text" name="text" placeholder='Name'/>
                <br/>
                <input onBlur={handleBlur} className='form-control' type="email" name="email" id="" placeholder='Your email' required/>
                <br/>
                <input onBlur={handleBlur} className='form-control' type="password" name="password" id="" placeholder='Your Password' required/>
                <small>**Password contains must be 6 character**</small>
                <br/>
                <input onClick={handleSubmit} className='submit btn btn-success' type="submit" value="Create account"/>
                { user.success && <p style={{color: 'green'}}>User { newUser ? 'created' : 'Logged In'} successfully</p>}
           </form>
           <p>Or</p> <br/>
           <button onClick={handleGoogleLogin} className='google-btn btn btn-warning'><FontAwesomeIcon icon={faGoogle} /><h6>Sign in with Google</h6></button>
            {/* { user.success && <p style={{color: 'green'}}>User { newUser ? 'created' : 'Logged In'} successfully</p>} */}
        </div>
    );
};

export default Login;