export const LOGO =
  "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const USER_AVTAAR =
  "https://w7.pngwing.com/pngs/251/416/png-transparent-gray-wolf-wolf-mammal-animals-carnivoran-thumbnail.png";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer " + process.env.REACT_APP_TMDB_KEY,
  },
};

export const IMAGE_CDN_URL = "https://image.tmdb.org/t/p/w500";
export const BACKGROUND_IMG =
  "https://pub-f354ec240bea480db7320bd0e29d972e.r2.dev/sites/2/2023/05/Background-size1920x1080-4e1694a6-75aa-4c36-9d4d-7fb6a3102005-bc5318781aad7f5c8520.png";

export const SUPPORTED_LAN = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "urdu", name: "Urdu" },
  { identifier: "arabic", name: "Arabic" },
  { identifier: "sanskrit", name: "Sanskrit" },
];
export const OPENAI_API = process.env.REACT_APP_OPENAI_API_KEY;
