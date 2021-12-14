import {Download, ExploreNeuralMarkers, Home, Language, LocalizerInfo, ExploreActivationMaps} from "./pages";

export const routes = [
  {
    path: "/",
    label: "Home",
    exact: true,
    child: Home
  },
  {
    path: "/explore-neural-markers",
    label: "Explore Neural Markers",
    child: ExploreNeuralMarkers
  },
  {
    path: "/explore-activation-maps",
    label: "Explore Activation Maps",
    child: ExploreActivationMaps
  },
  {
    path: "/download",
    label: "Download",
    child: Download
  },
  {
    path: "/language",
    label: "Language Network",
    child: Language
  },
  {
    path: "/localizer-info",
    label: "Localizer Info",
    child: LocalizerInfo
  }
];
