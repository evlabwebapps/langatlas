import React from "react";
import {
  HashRouter as Router,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import MainContent from "./components/MainContent";

export default function App() {
  return (
    <Router>
      <Navigation/>
      <MainContent/>
    </Router>
  );
}