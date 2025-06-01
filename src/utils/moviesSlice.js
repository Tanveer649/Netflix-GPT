import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        trailerVideo : null,
        nowPopularMovies : null,
        nowUpcomingMovies : null
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addtrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        },
        addNowPopularMovies : (state,action) =>{
            state.nowPopularMovies = action.payload;
        },
        addNowUpcomingMovies : (state,action) =>{
            state.nowUpcomingMovies = action.payload
        }
    },
});

export const { addNowPlayingMovies, addtrailerVideo, addNowPopularMovies,addNowUpcomingMovies } = movieSlice.actions;

export default movieSlice.reducer;
