import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';


const App: React.FC = () => {
  // Mock authentication state
  const [user, setUser] = useState<User | undefined>();

  const handleLogout = () => {
    setUser(undefined);
  };

  // Protected Route Component
  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // return user ? <>{children}</> : <Navigate to="/login" />;
    return <>{children}</>
  };

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
        
          <Route path="/" element={<Home />} />
          

          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;