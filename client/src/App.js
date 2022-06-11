import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from "./components/layout/Layout";

import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

import DeckPage from "./pages/DeckPage";
import CreateDeckPage from "./pages/CreateDeckPage";
import CardFlipPage from "./pages/CardFlipPage";
import Category from './components/ui/Category'
import ProductDisplay from './components/cart/ProductDisplay'

function App() {
  return (

    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/dashboard" element={<DashboardPage />}/>
          <Route path="/signup" element={<SignupPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/deck/:id/edit" element={<DeckPage />}/>
          <Route path="/create-deck" element={<CreateDeckPage />}/>
          <Route path="/deck/:title/:id" element={<CardFlipPage />}/>
          <Route path="/category" element={<Category />}/>
          <Route path="/product" element={<ProductDisplay />}/>

          {/* <Route path='/user/:userId' element={<User />}/> */}
        </Routes>
      </Layout>
     
    </Router>

  );
}

export default App;



