import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../Pages/MyCart/MyCart";
import AllUsers from "../Pages/Admin/AllUsers";
import AddItem from "../Pages/Admin/AddItem";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/Admin/ManageItems";


 const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/menu',
            element:<Menu></Menu>
        },
        {
            path:'order/:category',
            element:<Order></Order>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/register',
            element:<SignUp></SignUp>
        },
      ]
    },
    {
      path:'/dashboard',
      element: <Dashboard></Dashboard>,
      children:[
      {
        path:'/dashboard/mycart',
        element:<MyCart></MyCart>
      },
      {
        path:'/dashboard/allusers',
        element:<AllUsers></AllUsers>
      },
      {
        path: '/dashboard/additem',
        element:<AdminRoute><AddItem></AddItem></AdminRoute>
      },
      {
        path: '/dashboard/manageitems',
        element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
      }
      ]
    }
  ]);

  export default router