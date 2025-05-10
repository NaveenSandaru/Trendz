import React from 'react';
import { useLocation } from 'react-router-dom';
import App from './App.jsx';
import { Header } from './components/header.jsx';
import { Footer } from './components/footer.jsx';

export default function Layout() {
  const location = useLocation();
  const hideLayout = location.pathname === '/' || location.pathname === '/register';

  return (
    <>
      {!hideLayout && <Header />}
      <App />
      {!hideLayout && <Footer />}
    </>
  );
}
