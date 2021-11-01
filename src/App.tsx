import React from "react";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import MainContent from "./components/MainContent";

export default function SidebarExample() {
  return (
    <Router>
      <Navigation/>
      <MainContent/>
    </Router>
  );
}