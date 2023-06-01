import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Cover from '../../Components/Cover'
import menuBanner from '../../assets/menu/banner3.jpg'
import dessertImg from '../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../assets/menu/pizza-bg.jpg'
import saladImg from '../../assets/menu/salad-bg.jpg'
import soupImg from '../../assets/menu/soup-bg.jpg'
import useMenu from '../../Hooks/UseMenu'
import SectionTitle from '../../Components/SectionTitle'
import MenuCategory from './MenuCategory'
import { animateScroll as scroll } from "react-scroll";
import { Link } from 'react-router-dom'


const Menu = () => {
  const [menu] = useMenu()
  
  const desserts = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');
    const drinks = menu.filter(el => el.category === 'drinks');
    

    useEffect(()=>{
      scroll.scrollToTop()
    },[])

  return (
    <div>
      <Helmet>
        <title>Bistro - Menu</title>
      </Helmet>
      
      <Cover img={menuBanner} title={'Our Menu'}></Cover>

      {/* offered */}
      <SectionTitle subHeading={"Don't miss"} heading={"Today's Offer"}></SectionTitle>
      <MenuCategory items={offered}></MenuCategory>
     

      {/* desert */}
      <MenuCategory items={desserts} title={"Desserts"} img={dessertImg}></MenuCategory>
      <div className="w-full flex justify-center"><button className='btn btn-warning btn-outline my-6'><Link to='/order/dessert'>Order Now</Link></button></div>

      {/* pizza */}
      <MenuCategory items={pizza} title={"Pizza"} img={pizzaImg}></MenuCategory>
      <div className="w-full flex justify-center"><button className='btn btn-warning btn-outline my-6'><Link to='/order/pizza'>Order Now</Link></button></div>
      {/* salad */}
      <MenuCategory items={salad} title={"Salad"} img={saladImg}></MenuCategory>
      <div className="w-full flex justify-center"><button className='btn btn-warning btn-outline my-6'><Link to='/order/salad'>Order Now</Link></button></div>
      {/* soup */}
      <MenuCategory items={soup} title={"Soup"} img={soupImg}></MenuCategory>
      <div className="w-full flex justify-center"><button className='btn btn-warning btn-outline my-6'><Link to='/order/soup'>Order Now</Link></button></div>
      {/* drinks */}
      <MenuCategory items={drinks} title={"Drinks"} img={menuBanner}></MenuCategory>
      <div className="w-full flex justify-center"><button className='btn btn-warning btn-outline my-6'><Link to='/order/drinks'>Order Now</Link></button></div>
    
    
    </div>
  )
}

export default Menu