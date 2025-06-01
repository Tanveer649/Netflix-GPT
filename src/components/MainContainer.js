import React from 'react'
import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';


const MainContainer = () => {

    const movies = useSelector(store => store.movie?.nowPlayingMovies)
     
    if(!movies) return;  // known as early return
    
    const mainMovie = movies[0]; // selecting first index movie for the background  
    // console.log(mainMovie)

    const {original_title, overview , id} = mainMovie
  return (
    <div className=" bg-black pt-[30%] md:pt-0 overflow-hidden">
       <VideoTitle  title ={original_title} overview={overview}/>
       <VideoBackground movieId = {id}/>
    </div>
  );
};

export default MainContainer