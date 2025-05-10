import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import MovieDetailsPage from './pages/movieDetailsPage';
import RegisterPage from './pages/registerPage';
import AboutUs from './pages/aboutUsPage';
import ContactUs from './pages/contactUsPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/movie/:id' element={<MovieDetailsPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/about' element={<AboutUs />} />
      <Route path='/contact' element={<ContactUs />} />
    </Routes>
  );
}

export default App;
