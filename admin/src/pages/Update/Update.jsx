import React, { useState, useEffect } from 'react';
import './Update.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Update = ({ url }) => {
  const [image, setImage] = useState(null);
  const [foodId, setFoodId] = useState("");
  const [foods, setFoods] = useState([]);
  const [data, setData] = useState({
    name: "",
    description: "Food provides essential nutrients for overall health and well-being",
    price: "1",
    category: ""
  });

  // Fetch all food items to populate the dropdown
  useEffect(() => {
    axios.get(`${url}/api/food/list`)
      .then(response => {
        setFoods(response.data.data);
      })
      .catch(error => {
        toast.error("Error fetching food list");
        console.error("Fetch error: ", error);
      });
  }, [url]);

  // Fetch the selected food item data
  useEffect(() => {
    if (foodId) {
      axios.get(`${url}/api/food/list$`,{id: foodId})
        .then(response => {
          if (response.data && response.data.data) {
            const foodData = response.data.data;
            setData({
              name: foodData.name,
              description: foodData.description,
              price: foodData.price,
              category: foodData.category
            });
            setImage(`${url}/images/${foodData.image}`);
          } else {
            toast.error("No data found for the selected food item");
          }
        })
        .catch(error => {
          toast.error("Error fetching food data");
          console.error("Fetch error: ", error);
        });
    }
  }, [foodId, url]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    
    // Only append image if it's a new file, not if it's a string URL
    if (image && typeof image === 'object') {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(`${url}/api/food/update/${foodId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating food item");
      console.error("Update error: ", error);
    }
  };

  return (
    <div className='update'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="update-food-select flex-col">
          <p>Select Food ID</p>
          <select onChange={(e) => setFoodId(e.target.value)} value={foodId} name="foodId">
            <option value="">Select a Food Item</option>
            {foods.map(food => (
              <option key={food._id} value={food._id}>
                {food.name} (ID: {food._id})
              </option>
            ))}
          </select>
        </div>
        <div className="update-image-upload flex-col">
          <p>Upload new image (optional)</p>
          <label htmlFor="image">
            {image && typeof image === 'string' ? (
              <img src={image} alt={data.name} />
            ) : (
              image && typeof image === 'object' ? (
                <img src={URL.createObjectURL(image)} alt="Preview" />
              ) : (
                <img src={assets.upload_area} alt="Upload area" />
              )
            )}
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
        </div>
        <div className="update-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type name here' required />
        </div>
        <div className="update-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Type description here' required></textarea>
        </div>
        <div className="update-category-price">
          <div className="update-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} value={data.category} name="category">
              <option value="Salad">Salad</option>
              <option value="Roll">Roll</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodle">Noodle</option>
            </select>
          </div>
          <div className="update-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$1' required />
          </div>
        </div>
        <button type='submit' className='update-button' disabled={!foodId}>UPDATE</button>
      </form>
    </div>
  );
};

export default Update;
