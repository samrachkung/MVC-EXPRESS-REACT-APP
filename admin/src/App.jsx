import React from 'react';
import Navbars from './components/Navbars/Navbars';
import Sidebars from './components/Sidebars/Sidebars';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = "http://localhost:4000/";

  return (
    <div>
      <ToastContainer />
      <Navbars />
      <hr />
      <div className="app-content">
        <Sidebars />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/order" element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
