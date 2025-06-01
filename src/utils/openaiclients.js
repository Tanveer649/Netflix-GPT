// import OpenAI from "openai";
// import { OPENAI_API } from "./constants";


// const openai = new OpenAI({
//   apiKey: process.env.REACT_APP_OPENAI_API_KEY, // This is the default and can be omitted
//   dangerouslyAllowBrowser:true
// });

// export default openai;

import Groq from "groq-sdk";


 const groq = new Groq({ apiKey: process.env.REACT_APP_GROQ_API_KEY, dangerouslyAllowBrowser: true});
//const groq = new Groq({ apiKey: "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", dangerouslyAllowBrowser: true});


export default groq;
