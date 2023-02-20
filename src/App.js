import './App.css';
import Products from './pages/ProductsPage';
import Navbar from './components/Navbar';
import CheckoutPage from './pages/CheckoutPage';
import { Routes, Route } from 'react-router-dom';
import SignIn from './components/authenticate/Signin';
import SignUp from './components/authenticate/Signup';
import { useAuth } from './context/authContext';
import { actionTypes } from './utils';
import { useEffect } from 'react';
import { useStateValue } from './context/StateProvider';
import Dashboard from './components/Dashboard/Dashboard';
import Checkout from './components/Checkout/Checkout';
import NotFound from './pages/NotFound';


function App() {
  const [{ user }, dispatch] = useStateValue();
  const { token, userAuth, isAdmin } = useAuth();
  useEffect(() => {
    const updateUser = async () => {
      console.log(userAuth);
      if (token) {
        dispatch({
          type: actionTypes.SET_USER,
          user: userAuth,
        });

      }
    };
    updateUser();
  }, []);
  return (


    <div className="App">
      <Navbar admin={isAdmin} />
      <Routes>
        <Route index path='/' element={<Products />} />
        <Route path='/checkout-page' element={<CheckoutPage />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        
        <Route path='/admin/*' render={
          () => isAdmin ? <Dashboard /> : <NotFound/> 

        } />


        <Route path='*' element={ <NotFound/> } />
      </Routes>


    </div >


  );
}

export default App;
