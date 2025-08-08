import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { User } from '../../types';

interface LayoutProps {
  children: React.ReactNode;
  user?: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const location = useLocation();
  const hideHeaderFooter = ['/login', '/register', '/assessment'].some(path => 
    location.pathname.startsWith(path)
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* {!hideHeaderFooter && <Header user={user?user:{}} onLogout={onLogout} />} */}
      
      <main className="flex-grow">
         {children}
      </main>
      
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

export default Layout;