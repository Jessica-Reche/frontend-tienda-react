import './App.css';
import Products from './pages/ProductsPage';
import Navbar from './components/Navbar';
import CheckoutPage from './pages/CheckoutPage';
import { Routes, Route } from 'react-router-dom';
import SignIn from './components/authenticate/Signin';
import SignUp from './components/authenticate/Signup';

import Dashboard from './components/Dashboard/Dashboard';
import Checkout from './components/Checkout/Checkout';
import NotFound from './pages/NotFound';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route index path='/' element={<Products />} />
        <Route path='/checkout-page' element={<CheckoutPage />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/admin/*' element={ <Dashboard />}/>
        <Route path='*' element={ <NotFound/> } />
      </Routes>


    </div >


  );
}

export default App;
