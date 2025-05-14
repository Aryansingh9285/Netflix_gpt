import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice";
import moviesReducer from "./moviesslice";
import GptReducer from "./GptSlice"
import configReducer from "./configSlice";

const appstore = configureStore({
  reducer: {
    user: userReducer,
    movies : moviesReducer,
    Gpt : GptReducer,
    config : configReducer
  }, 
});

export default appstore;
