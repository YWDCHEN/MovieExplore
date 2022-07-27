import React from 'react';

const AuthContext = React.createContext();

const useAuth = () => {
  const [authenticated, setAuthenticated] = React.useState(true);
  const login = async (token) => {
    setAuthenticated(true);
    localStorage.setItem('token', token);
  }
  const logout = async () => {
    localStorage.removeItem('token');
  }
  return {
    logout,
    login,
    authenticated
  }
}

export const AuthProvider = ({children}) => {
  const value = useAuth();
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

const AuthConsumer = () => {
  return React.useContext(AuthContext);
}

export default AuthConsumer;