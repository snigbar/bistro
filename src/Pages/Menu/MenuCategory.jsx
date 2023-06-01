import React from 'react'
import Cover from '../../Components/Cover'
import MenuItem from '../../Components/MenuItem'

const MenuCategory = ({items, title, img}) => {
  return (
    <div>
        {title && <Cover img={img} title={title}></Cover>}
        <div className="grid md:grid-cols-2 gap-10 my-8 w-11/12 lg:w-4/5 mx-auto">
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
    </div>
  )
}

export default MenuCategory