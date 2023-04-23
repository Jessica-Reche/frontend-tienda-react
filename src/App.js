import './App.css';
import Navbar from './components/NavBar/Navbar';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import { Routes, Route, useLocation } from 'react-router-dom';
import SignIn from './components/authenticate/Signin';
import SignUp from './components/authenticate/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './pages/NotFound';
import useAuth from './hooks/useAuth';
import CarouselComponent from './components/Carousel/Carousel';

import Products from './pages/ProductsPage';
import Checkout from './components/Checkout/Checkout';
import Footer from './components/Footer';
import Home from './pages/HomePage/HomePage';



function App() {
  const { admin } = useAuth();
  const location = useLocation();
  return (
    <div className="App">

      {location.pathname.startsWith("/admin") ? null : <Navbar />}

      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/products' element={<Products />} />
        <Route path='/checkout-page' element={<CheckoutPage />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/admin/*' element={admin ? <Dashboard /> : <NotFound />} />
        <Route path='*' element={<NotFound />} />

      </Routes>
      <Footer />
    </div>
  );
}

function Index() {
  return (
    <>
      <CarouselComponent />
      <Home />
    </>
  );
}




export default App;
