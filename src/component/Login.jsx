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

const Login = () => {
  const [isSignupform, setisSignupform] = useState(true);
  const [errorMessage, seterrorMessage] = useState(null);

  const dispatch = useDispatch()

  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handelbuttonclick = () => {
    // validate form data
    const message = checkValiddata(
      email.current.value,
      password.current.value,
      username.current?.value
    );
    seterrorMessage(message);

    if (message) return;

    if (!isSignupform) {
      // Sign Up flow
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          // Add updateProfile here for new users
          return updateProfile(user, {
            displayName: username.current.value,
            photoURL: USER_AVTAR
          });
        })
        .then(() => {
           const { uid, email, displayName, photoURL } = auth.currentUser;
                  dispatch(
                    addUser({
                      uid: uid,
                      email: email,
                      displayName: displayName,
                      photoURL: photoURL,
                    })
                  );
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + " - " + errorMessage);
        });
    } else {
      // Sign In flow
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + " - " + errorMessage);
        });
    }
  };

  const Signintoggleform = () => {
    setisSignupform(!isSignupform);
  };

  return (
    <div className="relative h-screen w-full">
      <Header />

      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={Netflix_Background_img}
          alt="Netflix background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Login Form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 backdrop-blur-md  bg-opacity-50  p-8 rounded-2xl text-white flex flex-col w-80"
      >
        <h2 className="text-2xl mb-4 font-semibold">
          {isSignupform ? "Sign In" : "Sign Up"}
        </h2>
        <input
          ref={email}
          type="email"
          placeholder="Email"
          className="p-2 m-2 bg-gray-800 rounded text-white"
        />
        {!isSignupform && (
          <input
            ref={username}
            type="username"
            placeholder="Full Name"
            className="p-2 m-2 bg-gray-800 rounded text-white"
          />
        )}
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 m-2 bg-gray-800 rounded text-white"
        />
        <p className="text-red-500 p-2 font-bold  ">{errorMessage}</p>

        <button
          className="p-2 m-2 bg-red-600 rounded-2xl hover:bg-red-700 transition"
          onClick={handelbuttonclick}
        >
          {isSignupform ? "Sign In" : "Sign up"}
        </button>

        <p className="py-4 cursor-pointer" onClick={Signintoggleform}>
          {" "}
          {isSignupform
            ? "New to Netflix? Signup Now"
            : "Already have a Account? Signin Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
