// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import Profile from './components/Profile'; 
import Search from './components/Search'; 
import { AuthProvider, AuthContext } from './contexts/AuthProvider'; 
import ProfileEdit from './components/ProfileEdit'; // Add this line


const ProtectedRoute = ({ element }) => {
  const { currentUser } = React.useContext(AuthContext); 
  return currentUser ? element : <Navigate to="/signin" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route 
            path="/" 
            element={<ProtectedRoute element={<Home />} />} 
          >
            
            <Route path="profile" element={<Profile />} /> {/* Profile route */}
            <Route path="profile/edit" element={<ProfileEdit />} /> {/* Add this line */}
            <Route path="search" element={<Search />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
