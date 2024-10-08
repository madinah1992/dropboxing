import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase'; // Ensure you have Firebase initialized
import { onAuthStateChanged } from 'firebase/auth';

// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Export the AuthContext in case you want to use it directly
export { AuthContext };

// Export the AuthProvider as default
export default AuthProvider;
