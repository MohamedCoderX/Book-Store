import {createBrowserRouter} from "react-router-dom"
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Cart from "../pages/books/Cart";
import Checkout from "../pages/books/Checkout";
import BookLanding from "../pages/books/BookLanding";
import Allbooks from "../pages/books/Allbooks";
import PrivateRoutes from "./PrivateRoutes";
import OrderPages from "../pages/user/OrderPages";
import AdminLogin from "../components/AdminLogin";
import AdminRoute from "./AdminRoute";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBooks from "../pages/dashboard/ManageBooks";
import AddBook from "../pages/dashboard/AddBook";
import OrderList from "../pages/dashboard/OrderList";
import UpdateBook from "../pages/dashboard/UpdateBook";
import OrderComplete from "../pages/books/OrderComplete";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
            path:"/",
            element:<Home/>
        },
        {
            path:"*",
            element:<h1>Page Not Found</h1>
        },
        {
            path:"/about",
            element:<h1>About</h1>
        },
        {
            path:"/orders",
            element:<PrivateRoutes><OrderPages/></PrivateRoutes>
        },
        {
path:"/books",
element:<Allbooks/>
        },
        {
          path:"/login",
          element:<Login/>
        },{
          path:"/register",
          element:<Register/>
        },{
          path:"/cart",
          element:<PrivateRoutes><Cart/></PrivateRoutes>
        },{
          path:"/checkout",
          element:<PrivateRoutes><Checkout/></PrivateRoutes>
        },{
          path:"/book/:id",
          element:<BookLanding/>
        },{
          path:'/ordercomplete',
          element:<PrivateRoutes><OrderComplete/></PrivateRoutes>
        }
      ]
    },
    {
      path:"/dashboard",
      element: <AdminRoute><DashboardLayout/></AdminRoute>,
      children:[
        {
          path:"",
          element:<AdminRoute><Dashboard/></AdminRoute>
        },
        {
          path:"addnewbook",
          element:<AdminRoute><AddBook/></AdminRoute>
        },
        {
          path:"updatebook/:id",
          element:<AdminRoute><UpdateBook/></AdminRoute>
        },
        {
          path:"allbooks",
          element:<AdminRoute><ManageBooks/></AdminRoute>
        },{
          path:"allorders",
          element:<AdminRoute><OrderList/></AdminRoute>
        },{
          path:"updateorder",
          element:<AdminRoute><h1>Update Order</h1></AdminRoute>
        }
      ]
    },
    {
      path:"/admin-login",
      element:<AdminLogin/>
    }
  ]);

  export default router