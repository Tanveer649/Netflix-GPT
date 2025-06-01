import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowUpcomingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useNowUpcomingMovies = () => {
  // Fetch the movie list from the TMDB API and stored in the movies store
  const dispatch = useDispatch();
  const nowUpcomingMovies = useSelector(
    (store) => store.movie.nowUpcomingMovies
  );
  const getNowUpcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json.results)
    dispatch(addNowUpcomingMovies(json.results));
  };

  useEffect(() => {
    !nowUpcomingMovies && getNowUpcomingMovies();
  }, []);
};

export default useNowUpcomingMovies;
