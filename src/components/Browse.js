import Header from "./Header";
import GptSearch from "./GptSearch";
import useNowPlayingMovies from "../Custom_hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useNowPopularMovies from "../Custom_hooks/useNowPopularMovies";
import useNowUpcomingMovies from "../Custom_hooks/useNowUpcomingMovies";
import { useSelector } from "react-redux";

const Browse = () => {
  useNowPlayingMovies(); // This will fetch the movies and upadte the store. After that Main container
  useNowPopularMovies(); // and secondary container start using the store.
  useNowUpcomingMovies();

  const showGptSearchButton = useSelector((store) => store.gpt.showGptSearch);
  return (
    <div>
      <Header />
      {showGptSearchButton ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />{" "}
          {/**when you have to wrap the both container as single unit */}
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
