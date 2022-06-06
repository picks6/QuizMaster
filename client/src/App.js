import React from "react";
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/Header/header';
// import Navbar from './components/Nav/navbar';
import SignUpPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DeckPage from "./pages/DeckPage";
import CardFlipPage from "./pages/CardFlipPage";
import CreateDeckPage from "./pages/CreateDeckPage";


import Layout from "./components/layout/Layout";

const App = () => {
  return (
    <>
      {/* <Header /> */}
      {/* <Main /> */}
      {/* <SignUpPage /> */}
      {/* <LoginPage /> */}
      {/* <Logout /> */}
      {/* <CardFlipPage /> */}
      {/* <DeckPage /> */}
      <CreateDeckPage />
    </>
  );
};

export default App;
