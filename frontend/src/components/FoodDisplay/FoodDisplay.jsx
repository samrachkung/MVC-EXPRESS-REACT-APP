import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import Fooditeam from '../FoodIteam/Fooditeam'
const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext)
    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {food_list.map((iteam, index) => {
                    if (category === "ALL" || category === iteam.category) {
                        return <Fooditeam key={index} id={iteam._id} name={iteam.name} price={iteam.price} description={iteam.description} image={iteam.image} />
                    }
                })}
            </div>
        </div>
    )
}

export default FoodDisplay
