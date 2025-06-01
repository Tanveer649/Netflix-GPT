import { useSelector } from "react-redux";
import useMovieTrailor from "../Custom_hooks/useMovieTrailor";


const VideoBackground = ({ movieId }) => {

    const trailerVideo = useSelector(store => store.movie?.trailer)

    useMovieTrailor(movieId)

    // first access the store then trailor video = null, after the function executed, then the state of store is changed.
    // when the state of store is changed then it automatically re-render component then the trailor video will show
  return (
    <div>
      <iframe className="w-screen aspect-video pt-0"
 
            //src={"https://www.youtube.com/embed/8B1EtVPBSMw?si=PpzbOvoQhtbkORP3"}  static
            //src={"https://www.youtube.com/embed/8B1EtVPBSMw?si=" + trailer.key} dynamic but the trailer is defined in the function, not accessbile. 
            
            //src={"https://www.youtube.com/embed/8B1EtVPBSMw?si=" + trailerId}  using state variable

            src={
                "https://www.youtube.com/embed/8B1EtVPBSMw?si=" + 
                trailerVideo?.key +
                "?&autoplay=1&mute=1"}  //using reduxe store , autoplay = 1 to run video

            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"> // use camel case to remove error
        </iframe>
    </div>
  );
};

export default VideoBackground;
