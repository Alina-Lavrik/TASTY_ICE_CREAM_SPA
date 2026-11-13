import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import FavoritesPage from './pages/FavoritesPage';
import StatsPage from './pages/StatsPage';
import AuthPage from './pages/AuthPage';
import ice_cream from './images/ice_cream.png'


function App() {
  return (
    <BrowserRouter>
        <div>
          <h1>🍦 TASTY ICE CREAM <small>Just buy it and try</small></h1>
          <Navigation />
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
    </BrowserRouter>
  );
};

export default App;

