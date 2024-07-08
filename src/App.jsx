import './App.css';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import{ Toaster } from 'react-hot-toast';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import Notfound from './Components/Notfound/Notfound';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import WishList from './Components/WishList/WishList';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import UserContextProvider from './context/UserContext';
import CartContextProvider from './context/CartContext';
import CounterContextProvider from './context/CounterContext';
import WishListContextProvider from './context/WishListContext';
import Cart from './Components/Cart/Cart';
import UserAddress from './Components/UserAddress/UserAddress';
import CashOnDeleviry from './Components/CashOnDeleviry/CashOnDeleviry';
import Orders from './Components/Orders/Orders';
let routers = createHashRouter([
  {
path: '', 
element: <Layout />,children:[
{index: true,element:<ProtectedRoute><Home /></ProtectedRoute>},
{path: 'register', element: <Register /> },
{path: 'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
{path: 'login', element: <Login /> },
{path: 'categories',element:<ProtectedRoute><Categories /></ProtectedRoute>},
{path: 'wishlist',element:<ProtectedRoute><WishList /></ProtectedRoute>},
{path: 'brands',element:<ProtectedRoute><Brands /></ProtectedRoute>},
{path: 'allorders',element:<ProtectedRoute><Orders /></ProtectedRoute>},
{path: 'productdetails/:id',element:<ProtectedRoute><ProductDetails /></ProtectedRoute>},
{path: 'address',element:<ProtectedRoute><UserAddress /></ProtectedRoute>},
{path: 'paycash',element:<ProtectedRoute><CashOnDeleviry /></ProtectedRoute>},
{path: '*', element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <>
    <CounterContextProvider>
      <CartContextProvider>
        <WishListContextProvider>
        <UserContextProvider>
          <RouterProvider router={routers}></RouterProvider>
        </UserContextProvider>
        <Toaster/>
        </WishListContextProvider>
      </CartContextProvider>
    </CounterContextProvider>
    </>
  );
}

export default App;
