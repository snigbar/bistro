import React from 'react'
import UseCart from '../../Hooks/UseCart'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const MyCart = () => {
    const [cart, refetch] = UseCart()
    const total = cart.reduce((sum, item) => item.price + sum, 0);

    const handleDelete = item => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
             
                fetch(`http://localhost:5000/carts/${item._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

return (
   
<div className='w-100 mx-auto h-full'>
<label htmlFor="my-drawer-2" className="btn btn-primary drawer-button mt-4 ms-4 lg:hidden">Open drawer</label>
<h1 className='text-4xl text-center text-zinc-800 font-bold leading-[4rem] my-6'>Your Orders</h1>

        <div className="uppercase font-semibold h-[60px] flex justify-between items-center">
        <h3 className="text-sm">Total Items: {cart.length}</h3>
        <h3 className="text-sm">Total Price: ${total}</h3>
        <button className="btn btn-primary btn-sm">Proceed to pay</button>
        </div>

 <table className="table w-[50vw]">
    {/* head */}
    <thead>
      <tr>
        <th className=' text-white bg-warning hover:bg-[#fda623] text-center w-max'>#</th>
        <th className=' text-white bg-warning hover:bg-[#fda623] text-center w-max'>Food</th>
        <th className=' text-white bg-warning hover:bg-[#fda623]'>Name</th>
        <th className=' text-white bg-warning hover:bg-[#fda623]'>Price</th>
        <th className=' text-white bg-warning hover:bg-[#fda623]'>action</th>
      </tr>
    </thead>
    <tbody>
    {/* values */}

    {
        cart.map((item,index) => (
            <tr key={item._id}>
            <td>
            {index + 1}
            </td>
            <td>
                <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                </div>
                </div>

               
            </td>
            <td className="text-lg font-semibold">
            {item.name}
            </td>
            <td className="text-end">${item.price}</td>
            <td>
            <button className="btn btn-circle btn-error btn-outline" onClick={()=>handleDelete(item)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
               
            </td>
            {/* <td>
            <Link to={`/details/${item._id}`} className='w-full flex justify-center'>
              <button className="btn btn-error text-white bg-[#FF1821] hover:bg-[#e4161d] border-none mx-auto text-xs rounded-full py-4">View Details</button>
            </Link>
            </td> */}
            {/* <td>
            <Link to={`/mytoys/update/${_id}`} className='w-full flex justify-center'>
              <button className="btn btn-error text-white bg-cyan-500 hover:bg-cyan-600 border-none mx-auto text-xs rounded-full py-4">update</button>
            </Link>
            </td> */}
      
          </tr>
        ))
    }
    </tbody>   
  </table>

           
 </div>

  )
}

export default MyCart