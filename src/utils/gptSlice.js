import { createSlice } from "@reduxjs/toolkit";


const gptSlice = createSlice({
    name : 'gpt',
    initialState : {
        showGptSearch : false,
        movieNames: null,
        movieResults : null
    },
    reducers :{
        toggleGptSearchView : (state) =>{  // no action needed remove action
            state.showGptSearch = !state.showGptSearch;
        },
        addGptMovieResult :(state, action) =>{
            const {movieNames, movieResults} = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults
        },

        // the store is holding the data, when we click gpt search button the it showing the previous search data.
        clearGptMovies : (state)=> {
            state.movieNames = null;
            state.movieResults = null
        }
    },
});


export const {toggleGptSearchView, addGptMovieResult, clearGptMovies} = gptSlice.actions;
export default gptSlice.reducer