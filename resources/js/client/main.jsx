import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/SignUp';
import PostDetail from './components/ui/PostDetail';
import MyProfile from './components/ui/profile/MyProfile';
import OtherProfile from './components/ui/profile/OtherProfile';
const ClientApp = () => (
  <Router>
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/profile/:userId" element={<OtherProfile />} />
        </Routes>
      </div>
      <Footer />
    </div>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById('client'));
root.render(<ClientApp />);