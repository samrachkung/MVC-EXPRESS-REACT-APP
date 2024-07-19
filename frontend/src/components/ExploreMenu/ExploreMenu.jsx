import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>Choose from a devers menu featuring a delectable array of dishes craft with the finest ingriedent and culinary. Our misstion is to satisfy your craving and elevate your dining expensive, one delicous meal at a time</p>
      <div className="explore-menu-list">
        {menu_list.map((iteam,index)=>{
            return (
                <div onClick={()=> setCategory(prev=>prev===iteam.menu_name?"ALL":iteam.menu_name)} key={index} className="explore-menu-list-iteam">
                    <img className={category===iteam.menu_name?"active":""} src={iteam.menu_image} alt="" />
                    <p>{iteam.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
