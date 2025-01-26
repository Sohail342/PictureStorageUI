import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CategoriesList.css';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://exciting-de-visionerz-cbb5aa24.koyeb.app/api/categories/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  const navigateAddPictures = () => {
    navigate('/addform', { replace: true });
  };

  return (
    <div className="container py-4">
      <div className="d-flex gap-3 mb-4">
        <button onClick={handleLogout} className="btn btn-danger">
          Log out
        </button>
        <button onClick={navigateAddPictures} className="btn btn-success">
          Add Picture
        </button>
      </div>
      <div className="row">
        {categories.map((category) => (
          <div key={category.id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-img-top">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="img-fluid"
                  />
                ) : (
                  <div className="no-image-placeholder">
                    <p className="text-muted">No image available</p>
                  </div>
                )}
              </div>
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <p className="card-text">{category.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;