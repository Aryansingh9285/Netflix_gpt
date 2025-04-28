import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignupform, setisSignupform] = useState(true);

  const Signintoggleform = () => {
    setisSignupform(!isSignupform);
  };

  return (
    <div className="relative h-screen w-full">
      <Header />

      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9390f6f6-cf80-4bc9-8981-8c2cc8adf98a/web/IN-en-20250421-TRIFECTA-perspective_dc5bcfdf-88a5-4972-8ffe-b28ff942f76e_small.jpg"
          alt="Netflix background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Login Form */}
      <form className="absolute top-1/4 left-1/2 transform -translate-x-1/2 backdrop-blur-md  bg-opacity-50  p-8 rounded-2xl text-white flex flex-col w-80">
        <h2 className="text-2xl mb-4 font-semibold">
          {isSignupform ? "Sign In" : "Sign Up"}
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="p-2 m-2 bg-gray-800 rounded text-white"
        />
        {!isSignupform && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-2 m-2 bg-gray-800 rounded text-white"
          />
        )}
        <input
          type="password"
          placeholder="Password"
          className="p-2 m-2 bg-gray-800 rounded text-white"
        />
        <button className="p-2 m-2 bg-red-600 rounded-2xl hover:bg-red-700 transition">
          Sign In
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
