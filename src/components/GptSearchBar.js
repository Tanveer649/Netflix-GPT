import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/lanConstants";
import { useRef } from "react";
import groq from "../utils/openaiclients";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {

  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=true&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    // console.log(searchText.current.value)
    // Make an Open GPT API call to get search text result.

    // const gptResults = await openai.chat.completions.create({
    //   model: "gpt-4o",
    //   messages: [
    //     { role: "developer", content: "Talk like a pirate." },
    //     { role: "user", content: "Are semicolons optional in JavaScript?" },
    //   ],
    // });

    //console.log(gptResults.choices[0].message.content)

    const query =
      "Act as a Movie recommendation system and suggest some movies for thr query: " +
      searchText.current.value +
      ". Only give the name of maximum 8 movies.Don't mention any declerative sentences ,only give the movies name in the output and the output should be comma separated like the example result given ahead. Result Example: Amar, D15, Don, Jawan, Thangalan ";
    // prompt such like the gpt can understand in proper format.

    const gptResults = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "user",
          content: query,
        },
      ],
      // model: "llama3-8b-8192",
      // temperature: 0.5,
      // max_tokens: 1024,
      // top_p: 1,
      // stop: null,
      // stream: false,
    });
     console.log(gptResults.choices[0]?.message?.content || "");
    if (!gptResults.choices) return "ERROR";

    const gptMovies = gptResults.choices[0]?.message?.content.split(",");
    // console.log(gptMovies);

    // for each movie i'll search in TMDB API
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie) )

    // return array of promises [promise, promise, promise, promise, promise] as it is calling async function.
    //map will call the function very fast , since searchmovietmdb is async thats why it take time, therefore return pro,ise

    const tmdbResults = await Promise.all(promiseArray); // resolve the all 5 promise then store the data in tmdbResults.

    console.log(tmdbResults);
    dispatch(addGptMovieResult({movieNames : gptMovies, movieResults : tmdbResults}))
  };
  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="ml-5 md:ml-0 p-4 m-1 col-span-9 border-[2px] border-solid border-red-500 hover:border-red-600 transition duration-300"
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
        ></input>
        <button
          className=" py-2 px-4 m-3 bg-red-600 text-white rounded-lg col-span-3 text-xl hover:scale-105 transition duration-300 "
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
