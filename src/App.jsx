import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import AuthModal from './components/auth/AuthModal';
import HomePage from './pages/HomePage';
import TeeSheetPage from './pages/TeeSheetPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import StayAndPlayPage from './pages/StayAndPlayPage';
import ProShopPage from './pages/ProShopPage';
import MembershipPage from './pages/MembershipPage';
import CaddyBuggyPage from './pages/CaddyBuggyPage';
import FnbVoucherPage from './pages/FnbVoucherPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {/* Global overlays */}
          <CartDrawer />
          <AuthModal />

          {/* Layout */}
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/"               element={<HomePage />} />
                <Route path="/tee-sheet"      element={<TeeSheetPage />} />
                <Route path="/stay-and-play"  element={<StayAndPlayPage />} />
                <Route path="/pro-shop"       element={<ProShopPage />} />
                <Route path="/membership"     element={<MembershipPage />} />
                <Route path="/caddy-buggy"    element={<CaddyBuggyPage />} />
                <Route path="/fnb"            element={<FnbVoucherPage />} />
                <Route path="/checkout"       element={<CheckoutPage />} />
                <Route path="/success"        element={<SuccessPage />} />
                <Route path="*"               element={<HomePage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
