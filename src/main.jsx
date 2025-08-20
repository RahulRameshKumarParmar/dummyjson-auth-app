import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import Login from './pages/login.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Profile from './pages/profile.jsx';
import Products from './pages/Products.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import { StrictMode } from 'react';
import Layout from './components/Layout.jsx';

const allRoutes = createBrowserRouter([

  {
    path: "/login",
    element: <Login />
  },

  {
    element: <Layout />, // ✅ Navbar applied only for authenticated routes
    children: [
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      }
    ]
  },

  {
    path: "/products",
    element: (
      <PrivateRoute>
        <Products />
      </PrivateRoute>
    )
  },
  {
    path: "/products/:id",
    element: (
      <PrivateRoute>
        <ProductDetails />
      </PrivateRoute>
    )
  },
  {
    path: "*",
    element: (<Navigate to={"/login"} />)
  },

])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={allRoutes} />
  </StrictMode>
)
