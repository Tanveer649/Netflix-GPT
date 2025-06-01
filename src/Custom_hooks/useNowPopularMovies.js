import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useNowPopularMovies = () => {
  // Fetch the movie list from the TMDB API and stored in the movies store
  const dispatch = useDispatch();
  const nowPopularMovies = useSelector((store) => store.movie.nowPopularMovies);
  const getNowPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json.results)
    dispatch(addNowPopularMovies(json.results));
  };

  useEffect(() => {
    !nowPopularMovies && getNowPopularMovies();
  }, []);
};

export default useNowPopularMovies;
