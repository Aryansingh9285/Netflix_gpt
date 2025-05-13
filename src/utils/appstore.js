import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice";
import moviesReducer from "./moviesslice";

const appstore = configureStore({
  reducer: {
    user: userReducer,
    movies : moviesReducer,
  }, 
});

export default appstore;
