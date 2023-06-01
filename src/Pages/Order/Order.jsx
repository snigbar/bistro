import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Cover from '../../Components/Cover'
import orderCoverImg from '../../assets/shop/banner2.jpg'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../Hooks/UseMenu'
import OrderCard from './OrderCard'
import { useParams } from 'react-router-dom'
import { animateScroll as scroll } from "react-scroll";



const Order = () => {

  const {category} = useParams()
  const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
  const initialIndex = categories.indexOf(category)
  const [tabIndex, setTabIndex] = useState(initialIndex);

  const [menu] = useMenu();
    
    const desserts = menu.filter(el => el.category === 'dessert');
    const soup = menu.filter(el => el.category === 'soup');
    const salad = menu.filter(el => el.category === 'salad');
    const pizza = menu.filter(el => el.category === 'pizza');
    const drinks = menu.filter(el => el.category === 'drinks');

    useEffect(()=>{
      scroll.scrollTo(100);
    },[])
    
    
  return (
    <div>
      <Helmet>
                <title>Bistro Boss | Order </title>
      </Helmet>
     
      <Cover img={orderCoverImg} title="Order Food"></Cover>

      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className="w-4/5 mx-auto py-8 ">
    <TabList>
    <Tab>Salad</Tab>
    <Tab>Pizza</Tab>
    <Tab>Soup</Tab>
    <Tab>Dessert</Tab>
    <Tab>Drinks</Tab>
    </TabList>

    <TabPanel>
      
     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {salad.map(item => <OrderCard items={item} key={item._id}></OrderCard>)}
    </div>
      
    </TabPanel>
    <TabPanel>

     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {pizza.map(item => <OrderCard items={item} key={item._id}></OrderCard>)}
    </div>

    </TabPanel>
    <TabPanel>
      
     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {soup.map(item => <OrderCard items={item} key={item._id}></OrderCard>)}
    </div>

    </TabPanel>
    <TabPanel>
     
     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {desserts.map(item => <OrderCard items={item} key={item._id}></OrderCard>)}
    </div>

    </TabPanel>
    <TabPanel>
      
     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {drinks.map(item => <OrderCard items={item} key={item._id}></OrderCard>)}
    </div>

    </TabPanel>
    
  </Tabs>
  
    </div>
  )
}

export default Order