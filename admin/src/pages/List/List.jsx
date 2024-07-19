import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const endpoint = "api/food/list";  
    const requestUrl = `${url}${endpoint}`; 

    try {
      const response = await axios.get(requestUrl);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      toast.error("Error fetching data");
      console.error("Fetch error: ", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success("Food item removed");
        fetchList();
      } else {
        toast.error("Error removing food item");
      }
    } catch (error) {
      toast.error("Error removing food item");
      console.error("Remove error: ", error);
    }
  };

  return (
    <div className='list add flex-col'>
      <p>All food list</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Remove item</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <button onClick={() => removeFood(item._id)} className='cursor'>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
