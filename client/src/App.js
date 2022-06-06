import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DeckPage from "./pages/DeckPage";
import CreateDeckPage from "./pages/CreateDeckPage";
import CardFlipPage from "./pages/CardFlipPage";
import Landing from './components/quizmaster/Landing';




function App() {
  return (
    <Router>
         
        <Routes>
          {/* <Route path="/" element={<Landing />}/> */}
          <Route path="/" element={<SignupPage />}/>
          <Route path="/Signup" element={<SignupPage />}/>
          <Route path="/Login" element={<LoginPage />}/>
          <Route path="/Deck" element={<DeckPage />}/>
          <Route path="/CreateDeck" element={<CreateDeckPage />}/>
          <Route path="/CardFlip" element={<CardFlipPage />}/>
         
          {/* <Route path='/user/:userId' element={<User />}/> */}
        </Routes>
     
    </Router>
  );
}

export default App;



