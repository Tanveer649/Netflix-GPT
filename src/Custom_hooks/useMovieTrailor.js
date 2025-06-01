import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addtrailerVideo } from "../utils/moviesSlice";

const useMovieTrailor = (movieid) => {
  const dispatch = useDispatch();
  // const [trailerId, settrailerId] = useState(null); for setting trailerId

  const trailerVideo = useSelector((store) => store.movie.trailerVideo);
  const getMovieVideos = async () => {
    //950387 first movieid
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieid + "/videos",
      API_OPTIONS
    );
    //(`https://api.themoviedb.org/3/movie/${movieId}/videos`, API_OPTIONS) dynamically
    const json = await data.json();
    // console.log(json);

    const filterData = json.results.filter(
      (videos) => videos.type === "Trailer"
    );
    const trailer = filterData.length ? filterData[0] : json.results[0];
    // console.log(trailer);

    // settrailerId(trailer.key);

    // The trailer object contain key which is basically a you tube key. run any youtube video and the paste the youtube key
    // in the url of current video, then click share and go to embaded code
    dispatch(addtrailerVideo(trailer));
  };

  useEffect(() => {
    // if(!trailerVideo){
    //     getMovieVideos();
    // }
    !trailerVideo && getMovieVideos();
  }, []);
};

export default useMovieTrailor;
