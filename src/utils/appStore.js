import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice";
import movieReducer from "./moviesSlice";
import gptReducer from "./gptSlice";
import langReducer from "./configSlice";



const appStore = configureStore({
    reducer : {
        user : userReducer,
        movie : movieReducer,
        gpt :  gptReducer,
        config : langReducer
    },
});

export default appStore