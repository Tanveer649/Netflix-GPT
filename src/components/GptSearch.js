import GptSearchBar from "./GptSearchBar";
import GptMoviesSuggestions from "./GptMoviesSuggestions";
import { BACKGROUND_IMG } from "../utils/constants";
const GptSearch = () => {
  return (
    <div>
      <div className="fixed -z-10 brightness-50 opacity-95">
        <img className="h-screen object-cover md:w-full md:h-auto" src={BACKGROUND_IMG} alt="background-img" />
      </div>
      <div>
        <GptSearchBar />
        <GptMoviesSuggestions />
      </div>
    </div>
  );
};

export default GptSearch;
