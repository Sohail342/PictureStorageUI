import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddCategoryForm = ({ onAddCategory }) => {
  const navigate = useNavigate();
  const [newCategory, setNewCategory] = useState({
    name: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewCategory({ ...newCategory, image: e.target.files[0] });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', newCategory.name);
      formData.append('image', newCategory.image);

      const response = await axios.post('http://localhost:8000/api/categories/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      onAddCategory(response.data);
      setNewCategory({ name: '', description: '', image: null });
      alert('Category added successfully!');
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to add category.');
    } finally {
      setLoading(false);
    }
  };

  const navigateback = () => {
    navigate('/categories', { replace: true });
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={newCategory.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </div>
          <div className="d-flex gap-3 mb-4">
            <button type="submit" className="btn btn-primary mb-4" disabled={loading}>
                {loading ? 'Adding...' : 'Upload'}
            </button>
            <button onClick={navigateback} className="btn btn-danger mb-4">
                Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryForm;