import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userslice";
import { LOGO ,USER_Avtar} from "../utils/constant";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user)

  const handelsignout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };
   useEffect(() => {
      const unsubscribed = onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid, email, displayName, photoURL } = user;
          dispatch(
            addUser({
              uid: uid,
              email: email,
              displayName: displayName,
              photoURL: photoURL,
            })
          );
          navigate("/browse");
        } else {
          dispatch(removeUser());
          navigate("/");
        }
      });
      return () =>unsubscribed();
    }, []);
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black via-black/80 to-transparent flex justify-between">
      <img
        className="w-44"
        src={LOGO}
        alt="Netflix Logo"
      />

      {user && (<div className="flex items-center space-x-4">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={user?.photoURL || USER_Avtar}
          alt="User Icon"
        />
        <button
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          onClick={handelsignout}
        >
          Sign out
        </button>
      </div>)}
    </div>
  );
};

export default Header;
