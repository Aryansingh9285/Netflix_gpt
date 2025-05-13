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
     addPopularMovies : (state,action)=>{
        state.popularMovies = action.payload;
    },
     addTopRatedMovies : (state,action)=>{
        state.topratedmovies = action.payload;
    },
     addUpcommingMovies : (state,action)=>{
        state.upcommingmovies = action.payload;
    },
    addTralierVideo:(state, action)=>{
      state.trailerVideo = action.payload;
    }
  }
});

export const {addNowPlayingMovies ,addTralierVideo, addPopularMovies,addTopRatedMovies,addUpcommingMovies} = moviesSlice.actions;

export default moviesSlice.reducer;