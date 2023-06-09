import { useQuery } from '@tanstack/react-query'
import {FaUserShield } from "react-icons/fa";
import React from 'react'
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AllUsers = () => {

  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(['users'], async () => {
    const res = await axiosSecure.get('/users')
    return res.data;
})

    const handleMakeAdmin = user =>{
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount){
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }


  return (
    <div className='w-100 mx-auto h-full'>
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button mt-4 ms-4 lg:hidden">Open drawer</label>
    <h1 className='text-4xl text-center text-zinc-800 font-bold leading-[4rem] my-6'>Total Users</h1>

    <h3 className="text-lg my-4">Total Users: {users.length}</h3>

 <table className="table w-[50vw]">
    {/* head */}
    <thead>
      <tr>                                                  
        <th className=' text-white bg-[#FF1821] hover:bg-[#e0181f]'>#</th>
        <th className=' text-white bg-[#FF1821] hover:bg-[#e0181f]'>Name</th>
        <th className=' text-white bg-[#FF1821] hover:bg-[#e0181f]'>Email</th>
        <th className=' text-white bg-[#FF1821] hover:bg-[#e0181f] text-center'>Role</th>
        <th className=' text-white bg-[#FF1821] hover:bg-[#e0181f] text-center'>Action</th>
      </tr>
    </thead>
    <tbody>
    {/* values */}

    {
        users.map((user,index) => (
            <tr key={user._id}>

            <td>
            {index + 1}
            </td>

            <td className="text-lg font-semibold">
            {user.name}
            </td>

            <td className="text-lg font-semibold">
            {user.email}
            </td>

            <td className="text-end">
            { user.role === 'admin' ? 'admin' :
            <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost bg-orange-600  text-white"><FaUserShield></FaUserShield></button> 
            }
            </td>

            <td>
            <button className="btn btn-circle btn-error btn-outline" onClick={()=>handleDelete(user)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
               
            </td>

          </tr>
        ))
    }
    </tbody>   
  </table>

           
 </div>

  )
}

export default AllUsers