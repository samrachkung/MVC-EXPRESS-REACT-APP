import React, { useContext } from 'react'
import './Fooditeam.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'

const Fooditeam = ({ id, name, price, description, image }) => {

    const { cartIteam, addToCart, removeFromCart , url} = useContext(StoreContext)

    return (
        <div className='food-iteam'>
            <div className="food-iteam-img-container">
                <img className='food-iteam-image' src={url+"/images/"+image} alt="" />
                {!cartIteam[id]
                    ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                    : <div className="food-iteam-counter">
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                        <p>{cartIteam[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                    </div>
                }
            </div>
            <div className="food-iteam-info">
                <div className="food-iteam-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />

                </div>
                <p className="food-iteam-desc">{description}</p>
                <p className="food-iteam-price">${price}</p>
            </div>
        </div>
    )
}

export default Fooditeam
