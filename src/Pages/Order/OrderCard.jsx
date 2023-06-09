import React, { useContext } from 'react'
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import UseCart from '../../Hooks/UseCart';

const OrderCard = ({items}) => {
  const {user} = useContext(AuthContext)
  const [_,refetch] = UseCart()
  const {_id, name, image, price,recipe} = items;
    const navigate = useNavigate()
    const location = useLocation()

    const handleAddToCart = () =>{
      if(user){
        const menuItem = {name, image, price, email:user.email}

        fetch('http://localhost:5000/cart',{
          method: "POST",
          headers:{
            'content-type': "application/json"
          },
          body: JSON.stringify(menuItem)
        })
        .then(res => res.json())
        .then(data =>{
          if(data.insertedId){
            refetch()
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'added To cart',
              showConfirmButton: false,
              timer: 1500
            })
            
          }
        })
      }else{
        Swal.fire({
          title: 'Login Please',
          text: "You need to login first",
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'login'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login', {state:{from:location}})
          }
        })
      }  
    }

    // const cartItems = fetch('http://localhost:5000/cart').then(res => res.json()).then(data => console.log(data))
  return (
    <div className="card card-compact glass">
  <figure><img src={image}  className='w-96 object-cover'/></figure>
  <div className="card-body">
    <h2 className="card-title">{name}</h2>
    <p>{recipe}</p>
    <p className='text-sm'>Price: ${price}</p>

    <div className="card-actions justify-center">
      <button className="btn btn-warning" onClick={()=> handleAddToCart()}>Buy Now!</button>
    </div>
  </div>
</div>
  )
}

export default OrderCard