import Header from "./Header";
import { useState, useRef } from "react";
import ValidateForm from "../utils/validateForm";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVTAAR } from "../utils/constants";
import { BACKGROUND_IMG } from "../utils/constants";
const Login = () => {
  const [showLearntext, setshowLearntext] = useState(false);
  const [isSignInForm, setisSignInForm] = useState(true);
  const [isOpen, setisOpen] = useState(false);
  const [errorMessage, seterrorMessage] = useState(null);
  const dispatch = useDispatch();

  const emailOrPhone = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);
  const mobileNo = useRef(null);

  const changeToSignUpForm = () => {
    setisSignInForm(!isSignInForm);
    emailOrPhone.current.value = "";
    password.current.value = "";
  };

  const validateForm = () => {
    let FullName = "",
      MobileNo = "",
      EmailOrPhone = "",
      Password = "";

    // Safely retrieve values from refs
    if (emailOrPhone?.current?.value) EmailOrPhone = emailOrPhone.current.value;
    if (password?.current?.value) Password = password.current.value;
    if (fullName?.current?.value) FullName = fullName.current.value;
    if (mobileNo?.current?.value) MobileNo = mobileNo.current.value;

    // console.log(FullName, MobileNo, EmailOrPhone, Password, isSignInForm)

    const message = ValidateForm(
      EmailOrPhone,
      Password,
      FullName,
      MobileNo,
      isSignInForm
    );
    seterrorMessage(message);

    if (message) return; // basically it return if contain any message

    // sign in /sign up logic  , if message contain null means email and password is ok then we go for signin or sign up
    // to write the logic first need to check whether the form is signin or signup form

    if (!isSignInForm) {
      // for signup form logic
      createUserWithEmailAndPassword(
        //code from  https://firebase.google.com/docs/auth/web/password-auth?hl=en
        auth,
        emailOrPhone.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;

          // update display name

          //createUserWithEmailAndPassword(...) is called.
          // This creates the user and triggers onAuthStateChanged (because auth state has changed).
          // At this point, Firebase returns the default user info: email and UID (✅), but not yet the updated displayName and photoURL, because updateProfile(...) hasn't completed yet.
          // Then, you call updateProfile(...), which runs asynchronously.
          // But since onAuthStateChanged already ran once, your Redux store gets only the partial user info.
          // After a page reload, Firebase gives the full user (with name and photo), because the updated data is now saved and loaded freshly.

          // Question: When the updateProfile API is called, does onAuthStateChanged run again?

          // 👉 Answer: No, it does not trigger onAuthStateChanged.

          // onAuthStateChanged only runs when:
          // A user signs in
          // A user signs out
          // The page loads and the auth state is restored

          // When you create a user with createUserWithEmailAndPassword, the onAuthStateChanged listener runs with basic user info,
          //  often before updateProfile has completed. This can cause the Redux store to be updated with only email and UID.
          //  Because updateProfile does not trigger onAuthStateChanged again, you must manually refresh the user data
          //   using user.reload() and then dispatch the updated auth.currentUser to the store.
          //   This ensures the store immediately reflects the full user info (name and photo) without needing a page reload.

          updateProfile(user, {
            displayName: fullName.current.value,
            photoURL: USER_AVTAAR, // it is not jsx thats why we don't put in curly braces.
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );

              //navigate("/browse")  handle by onauthstatechanged
            })
            .catch((error) => {
              seterrorMessage(error.message);
            });

          // console.log(user)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + "-" + errorMessage);
        });
    } // for signin form logic
    else {
      signInWithEmailAndPassword(
        auth,
        emailOrPhone.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          // console.log(user)
          //navigate("/browse")           handle by onauthstatechanged
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="relative">
        <div className=" brightness-50">
          <img
            className="w-full h-screen object-cover md:h-auto"
            src={BACKGROUND_IMG}
            alt="background-img"
          />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="-mt-[60%] pl-12 md:mt-0 w-[500px] bg-black absolute md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:p-12 text-white bg-opacity-80 rounded-md "
        >
          <h1 className="text-xl md:text-3xl m-2 p-1 font-bold mb-6 ">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          <p className="mx-5 my-1 p-2 text-red-800 font-xl font-mono font-semibold hidden md:block">
            {errorMessage}
          </p>
          {!isSignInForm && (
            <input
              ref={fullName}
              type="text"
              placeholder="Full Name"
              className="mx-4 my-2 p-3 w-[370px] rounded-md bg-neutral-800 bg-opacity-75"
            />
          )}
          <input
            ref={emailOrPhone}
            type="text"
            placeholder={
              isSignInForm ? "Email or mobile number" : "Email Address"
            }
            className="mx-4 my-2 p-3 w-[370px] rounded-md bg-neutral-800 bg-opacity-75"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="mx-4 my-2 p-3 w-[370px] rounded-md bg-neutral-800 bg-opacity-75"
          />
          {!isSignInForm && (
            <input
              ref={mobileNo}
              type="number"
              placeholder="Mobile Number"
              className="mx-4 my-2 p-3 w-[370px] rounded-md bg-neutral-800 bg-opacity-75"
            />
          )}
          <button
            className="mx-4 my-2 p-3 w-[370px] bg-red-800 rounded-md font-semibold"
            onClick={validateForm}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p className="text-center p-1 m-1 font-semibold">OR</p>
          <button className="bg-slate-800 mx-4 my-2 p-3 w-[370px] rounded-md font-semibold hover:bg-slate-700">
            {isSignInForm ? "Use a sign-in code" : "Use a sign-up code"}
          </button>
          <p className="text-center m-1 p-1 font-semibold underline text-[17px] cursor-pointer hover:text-slate-300">
            Forgot Password?
          </p>
          <input
            className="ml-4 mr-2 mt-4 w-4 h-4 accent-red-500"
            type="checkbox"
          />
          <span className="p-1 text-[17px]">Remember me</span>
          <p className="ml-4 mt-2 p-1">
            {isSignInForm ? "New to Netflix? " : "Already registered? "}
            <span
              className="font-semibold cursor-pointer hover:underline"
              onClick={changeToSignUpForm}
            >
              {isSignInForm ? "Sign up now." : "Sign in now"}
            </span>
          </p>
          <p className=" pr-4 ml-4 md:p-1 mt-2 mr-2 text-[13px]">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
          </p>
          <p
            className="ml-4 text-[12px] p-1 underline text-blue-500 cursor-pointer"
            onClick={() => {
              setshowLearntext(!showLearntext);
            }}
          >
            Learn more
          </p>
          {showLearntext && (
            <p className="mr-6 ml-4 md:p-1 mt-2 md:mr-2 text-[13px]">
              The information collected by Google reCAPTCHA is subject to the
              Google
              <span className="text-blue-500 cursor-pointer hover:underline">
                {" "}
                Privacy Policy{" "}
              </span>{" "}
              and
              <span className="text-blue-500 cursor-pointer hover:underline">
                {" "}
                Terms of Service{" "}
              </span>
              , and is used for providing, maintaining, and improving the
              reCAPTCHA service and for general security purposes (it is not
              used for personalised advertising by Google).
            </p>
          )}
        </form>
      </div>

      <div className="bg-neutral-900 p-24 text-slate-200 pl-10 pr-10 md:pl-40 md:pr-80">
        <p className="pb-8">Questions? Call 000-800-919-1743 (Toll-Free)</p>
        <ol className="flex space-x-64 pb-4 underline text-sm ">
          <li className="cursor-pointer">FAQ</li>
          <li className="cursor-pointer">Help Centre</li>
          <li className="cursor-pointer">Terms of Use</li>
          <li className="cursor-pointer">Privacy</li>
        </ol>
        <ol className="flex space-x-40 pb-8 underline text-sm ">
          <li className="cursor-pointer">Cookie Preferences</li>
          <li className="cursor-pointer">Corporate Information</li>
        </ol>
        <div className="relative inline-block">
          <button
            className="border border-white p-1 rounded-sm flex items-center"
            onClick={() => {
              setisOpen(!isOpen);
            }}
          >
            🌐 English ▼
          </button>
          {isOpen && (
            <div className="absolute mt-2 border-white rounded shadow-lg w-full">
              <ul className="text-black bg-white">
                <li className="px-4 py-2 hover:bg-blue-600 cursor-pointer">
                  English
                </li>
                <li className="px-4 py-2 hover:bg-blue-600 cursor-pointer">
                  हिंदी
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
