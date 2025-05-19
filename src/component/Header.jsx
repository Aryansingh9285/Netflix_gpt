import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userslice";
import { LOGO, SUPPORTED_LANGUAGES, USER_AVTAR } from "../utils/constant";
import { toggleGptSearchView } from "../utils/GptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.Gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        navigate("/error");
      });
  };

  const handleGptSearch = () => {
    dispatch(toggleGptSearchView());
  };
  const handelLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <div className="absolute w-full px-2 md:px-8 py-2 bg-gradient-to-b from-black via-black/80 to-transparent flex flex-col md:flex-row justify-between items-center z-50">
      <img 
        className="w-28 sm:w-32 md:w-44 mx-auto md:mx-0" 
        src={LOGO} 
        alt="Netflix Logo" 
      />

      {user && (
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 md:gap-4 mt-4 md:mt-0 w-full md:w-auto">
          <img
            className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover"
            src={user.photoURL || USER_AVTAR}
            alt="User Icon"
          />
          {showGptSearch && (
            <select
              className="w-32 sm:w-auto bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs sm:text-sm md:text-base"
              onChange={handelLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.idetifier} value={lang.idetifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="w-28 sm:w-auto px-2 md:px-4 py-1 md:py-2 bg-blue-400 text-black text-xs sm:text-sm md:text-base font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            onClick={handleGptSearch}
          >
            {showGptSearch ? "Home" : "GPT Search"}
          </button>
          <button
            className="w-28 sm:w-auto px-2 md:px-4 py-1 md:py-2 bg-red-500 text-white text-xs sm:text-sm md:text-base font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
