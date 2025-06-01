# Netflix-GPT

> Use VPN to make TMDB APIs work.

---

## 📌 Steps

- Create the basic setup using command `npx create-react-app netflix-gpt`
- Setup Tailwind CSS
- Header
- Routing of /browse and /
- Login/Signup form
- Form validation
- Firebase setup and deployment
- Authentication
- Work on react-redux  
  - Created redux store with `useSlice`
- Implemented Signout feature  
  - Update displayName and profile icon
- Fixed the navigation bug  
  - Unsubscribed on `onAuthStateChanged` callback
- Register on TMDB
- Get data for Now Playing movies  
  - Custom hook for `nowPlayingMovies`
- Create movie store
- Update store with movie data
- Fetch data for trailer video
- Update store with trailer data
- Embedded the YouTube video and made it autoplay and mute
- Build secondary UI component
- Build movie list
- Build movie card
- GPT Search Page
- GPT Search Bar
- Multi-language feature in GPT page ⭐
- Setup OpenAI API call function
- GPT Search API call
- Fetched movie title/suggestions from TMDB
- Added TMDB data into GPTSlice store
- Passed Movie list component to movie suggestion container
- Added API key file
- Monetization

---

## 🚀 Features

### Login/Sign up
- Sign In / Sign Up Form
- Redirect to Browse Page

### Browse (after authentication)
- **Header**
  - Main Movie
    - Title & Background
    - Trailer & Autoplay
  - Movie Suggestions
    - MovieList: `N`

- **NetflixGPT**
  - Search Bar
  - Movie Suggestions
