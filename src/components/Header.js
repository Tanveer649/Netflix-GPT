import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { LOGO, SUPPORTED_LAN } from "../utils/constants";
import { clearGptMovies, toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // navigate("/")  handle by onauthstatechanged
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  //  In a React app using Firebase, the useEffect(() => {...}, []) hook runs only once when the component mounts.
  //  Inside it, the onAuthStateChanged function sets up a listener that monitors authentication state changes.
  //  This listener is triggered immediately with the current auth state (e.g., null if not logged in) and again
  //  whenever the auth state changes, such as after a successful sign-in or sign-out. Even though the component
  //  may re-render due to state or Redux updates, the useEffect does not run again. The user data is typically
  //  stored in Redux inside the listener callback, ensuring the app reacts to login status changes.

  // createBrowserRouter or BrowserRouter + <Routes> define which components render for which URLs.
  // navigate("/browse") only changes the URL and triggers rendering — but it will only work if React Router knows what to show at that route.

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse"); //update the store
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    //unsubscribed when components unmount (component unmounting means that a component is being removed from the UI and its associated resources are cleaned up)
    return () => unsubscribed();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
    dispatch(clearGptMovies());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute px-8 w-screen py-2  bg-gradient-to-b from-black z-40 flex flex-col md:flex-row justify-between">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
      {
        // basically when user is present means someone sign in then only its image and photo should be visible
        user && (
          <div className="flex justify-between -mt-3 md:mt-0">
            {showGptSearch && (
              <select
                className="text-white bg-gray-700 py-2 px-4 mx-4 my-4"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LAN.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}
            <button
              className="py-2 px-4 mx-4 my-4 text-white rounded-lg bg-purple-700"
              onClick={handleGptSearchClick}
            >
              {showGptSearch ? "Home Page" : "GPT Search"}
            </button>
            <img
              className="w-12 h-12 mt-3 mr-1 rounded-lg hidden md:block"
              alt="user-icon"
              src={user.photoURL}
            />
            <button
              className="bg-slate-900 h-8 mt-6 text-white p-1 rounded-md hover:bg-orange-400 px-2"
              onClick={handleSignout}
            >
              Sign Out
            </button>
          </div>
        )
      }
    </div>
  );
};
export default Header;
