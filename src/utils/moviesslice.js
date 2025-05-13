import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState:{
    NowPlayingMovies : null
  },
  reducers:{
    addNowPlayingMovies : (state,action)=>{
        state.NowPlayingMovies = action.payload;
    },
    addTralierVideo:(state, action)=>{
      state.trailerVideo = action.payload;
    }
  }
});

export const {addNowPlayingMovies ,addTralierVideo} = moviesSlice.actions;

export default moviesSlice.reducer;