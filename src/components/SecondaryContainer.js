import { useSelector } from "react-redux";
import MovieList from "./MovieList";
const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movie);
  return (
    movies.nowPlayingMovies && (
      <div className="bg-black ">
        <div className="mt-0 md:-mt-64 relative z-20">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          {/* <MovieList title={"Trending"}    movies ={movies.nowPlayingMovies} /> */}
          <MovieList title={"Popular"} movies={movies.nowPopularMovies} />
          <MovieList title={"Upcoming"} movies={movies.nowUpcomingMovies} />

        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
