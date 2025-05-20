import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValiddata } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userslice";
import { Netflix_Background_img, USER_AVTAR } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignupForm, setIsSignupForm] = useState(false); // false = Sign In
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValiddata(
      email.current.value,
      password.current.value,
      isSignupForm ? username.current?.value : null
    );
    setErrorMessage(message);
    if (message) return;

    if (isSignupForm) {
      // Sign Up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          return updateProfile(user, {
            displayName: username.current.value,
            photoURL: USER_AVTAR,
          });
        })
        .then(() => {
          const { uid, email, displayName, photoURL } = auth.currentUser;
          dispatch(
            addUser({ uid, email, displayName, photoURL })
          );
          navigate("/browse");
        })
        .catch((error) => {
          setErrorMessage(`${error.code} - ${error.message}`);
        });
    } else {
      // Sign In
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(() => {
          navigate("/browse");
        })
        .catch((error) => {
          setErrorMessage(`${error.code} - ${error.message}`);
        });
    }
  };

  const toggleFormMode = () => {
    setIsSignupForm(!isSignupForm);
    setErrorMessage(null);
  };

  return (
    <div className="relative h-screen w-full">
      <Header />
      <div className="absolute inset-0 -z-10">
        <img
          src={Netflix_Background_img}
          alt="Netflix background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 backdrop-blur-md bg-opacity-50 p-8 rounded-2xl text-white flex flex-col w-80"
      >
        <h2 className="text-2xl mb-4 font-semibold text-center">
          {isSignupForm ? "Sign Up" : "Sign In"}
        </h2>

        <input
          ref={email}
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 my-2 bg-gray-800 rounded text-white"
        />

        {isSignupForm && (
          <input
            ref={username}
            type="text"
            name="username"
            placeholder="Full Name"
            className="w-full p-3 my-2 bg-gray-800 rounded text-white"
          />
        )}

        <div className="relative w-full my-2">
          <input
            ref={password}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full p-3 pr-10 bg-gray-800 rounded text-white"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm font-semibold my-2">{errorMessage}</p>
        )}

        <button
          className="w-full p-3 my-2 bg-red-600 rounded hover:bg-red-700 transition"
          onClick={handleButtonClick}
        >
          {isSignupForm ? "Sign Up" : "Sign In"}
        </button>

        <p
          className="py-2 text-center text-sm cursor-pointer hover:underline"
          onClick={toggleFormMode}
        >
          {isSignupForm
            ? "Already have an account? Sign In now."
            : "New to Netflix? Sign Up now."}
        </p>
      </form>
    </div>
  );
};

// SVG Icon: Show Password
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// SVG Icon: Hide Password
const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
);

export default Login;
