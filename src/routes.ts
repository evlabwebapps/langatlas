import {Download, Explore, Home, Language, LocalizerInfo} from "./pages";

export const routes = [
  {
    path: "/",
    label: "Home",
    exact: true,
    child: Home
  },
  {
    path: "/explore",
    label: "Explore",
    child: Explore
  },
  {
    path: "/download",
    label: "Download",
    child: Download
  },
  {
    path: "/language",
    label: "Language",
    child: Language
  },
  {
    path: "/localizer-info",
    label: "Localizer Info",
    child: LocalizerInfo
  }
];
