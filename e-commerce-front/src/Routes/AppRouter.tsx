
// react router dom
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//  import other react components
import MainLayout from '@Layouts/MainLayout/MainLayout'

// pages
import Home from '@pages/Home';
import Shop from '@pages/Shop';
import Contact from '@pages/Contact';
import Checkout from '@pages/Checkout';
import SingleProduct from '@pages/SingleProduct';
import Cart from '@pages/Cart';
import Login from '@pages/Login';
import Register from '@pages/Register';
import Error from '@pages/Error';
import Profile from '@pages/Profile';
import ProtectedRoutes from '@components/auth/ProtectedRoutes';
import WishList from '@pages/WishList';
import OrdersBills from '@pages/OrdersBills';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <Error />,

        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "contact",
                element: <Contact />,
                children: [
                    {
                        path: "login",
                        element: <Login />
                    },
                    {
                        path: "register",
                        element: <Register />
                    },
                ]
            },
            {
                path: "profile",
                element:
                    <ProtectedRoutes>
                        <Profile />
                    </ProtectedRoutes>
            },
            {
                path: "orders",
                element:
                    <ProtectedRoutes>
                        <OrdersBills />
                    </ProtectedRoutes>
            },
            {
                path: "shop",
                element: <Shop />
            },
            {
                path: "checkout",
                element: <Checkout />
            },
          
            {
                path: "products/:id",
                element: <SingleProduct />,
              
            },
            {
                path: "cart",
                element: <Cart />
            },
            {
                path: "wishlist:userId",
                element:
                    <ProtectedRoutes>
                        <WishList />
                    </ProtectedRoutes>
            }

        ]
    }
]);

const AppRouter = () => {

    return (
        <RouterProvider router={router} />
    )
}

export default AppRouter
