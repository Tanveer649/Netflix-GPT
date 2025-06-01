const VideoTitle = ({title, overview}) =>{
    return (
        <div className="pt-[30%] md:w-screen aspect-video md:pt-[18%] px-6 md:px-16 absolute text-white bg-gradient-to-r from-black">
            <h1 className="text-xl md:text-5xl font-bold">{title}</h1>
            <p className="py-6 text-lg w-1/4 hidden md:block"> {overview?.length > 50 ? overview.slice(0, 139) + '.' : overview}</p>
            <div className="mt-2 md:mt-0">
                <button className="px-3 bg-white text-black md:p-4 md:px-8 md:text-xl rounded-lg py-2 font-semibold opacity-80 hover:opacity-30">
                    Play
                </button>
                <button className="px-1 text-sm mx-3 md:mx-4 bg-white text-black md:p-4 md:px-4 md:text-xl rounded-lg py-2 font-semibold opacity-40 hover:opacity-30">
                    More Info
                </button>
            </div>
        </div>
    );
};
export default VideoTitle;