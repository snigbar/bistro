import React from 'react'

const OrderCard = ({items}) => {
    const {name, image, price,recipe} = items;

    const handleAddToCart = (element) =>{
      console.log(element)
    }
  return (
    <div className="card card-compact glass">
  <figure><img src={image}  className='w-96 object-cover'/></figure>
  <div className="card-body">
    <h2 className="card-title">{name}</h2>
    <p>{recipe}</p>
    <p className='text-sm'>Price: ${price}</p>

    <div className="card-actions justify-center">
      <button className="btn btn-warning" onClick={()=> handleAddToCart(items)}>Buy Now!</button>
    </div>
  </div>
</div>
  )
}

export default OrderCard