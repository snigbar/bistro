import React from 'react'
import UseCart from '../Hooks/UseCart'
import {  FaShoppingCart, FaWallet, FaCalendarAlt, FaHome, FaUtensils, FaBook, FaUsers } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom'
import useAdmin from '../Hooks/useAdmin';

const Dashboard = () => {
    
    const [cart] = UseCart()
    const [isAdmin] = useAdmin();
    console.log(isAdmin)


  return (
    <div className="drawer drawer-mobile my-8 lg:max-h-[85vh]">
    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col items-center justify-center">
       
        <Outlet></Outlet>

    </div>

    <div className="drawer-side bg-[#f1f1f1]">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80">

        {
                        isAdmin ? <div  id="admin">
                            <li><NavLink to="/dashboard/home"><FaHome></FaHome>Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/additem"> <FaUtensils></FaUtensils>Add Items</NavLink></li>
                            <li><NavLink to="/dashboard/manageitems"><FaWallet></FaWallet>Manage Items</NavLink></li>
                            <li><NavLink to="/dashboard/history"><FaBook></FaBook>Manage Bookings</NavLink></li>
                            <li><NavLink to="/dashboard/allusers"><FaUsers></FaUsers>All Users</NavLink></li>
                            
                        </div> 
                        : 
                        <div>
                            <li><NavLink to="/dashboard/home"><FaHome></FaHome> User Home</NavLink></li>
                            <li><NavLink to="/dashboard/payment"><FaCalendarAlt></FaCalendarAlt> Reservations</NavLink></li>
                            <li><NavLink to="/dashboard/history"><FaWallet></FaWallet> Payment History</NavLink></li>
                            <li>
                                <NavLink to="/dashboard/mycart"><FaShoppingCart></FaShoppingCart> My Cart
                                    <span className="badge inl badge-ghost">+{cart?.length || 0}</span>
                                </NavLink>

                            </li>
                        </div>
                    }

            <div className="divider"></div>
            <li><NavLink to="/"><FaHome></FaHome> Home</NavLink> </li>
            <li><NavLink to="/menu"> Our Menu</NavLink></li>
            <li><NavLink to="/order/salad">Order Food</NavLink></li>
        </ul>

    </div>
</div>
  )
}

export default Dashboard