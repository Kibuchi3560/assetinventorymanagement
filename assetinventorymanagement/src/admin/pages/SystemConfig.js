import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const SystemConfig = () => {
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [urgencyLevels] = useState(['Low', 'Medium', 'High']); // Static list
  const [newCategory, setNewCategory] = useState('');
  const [newDepartment, setNewDepartment] = useState('');

  // Fetch categories and departments from the backend on component mount
  useEffect(() => {
    axios
      .get('/api/assetinventorymanagement/categories', { withCredentials: true })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });

    axios
      .get('/api/assetinventorymanagement/departments', { withCredentials: true })
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching departments:', error);
      });
  }, []);

  // Add new category via backend
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      axios
        .post(
          ' /api/assetinventorymanagement/categories',
          { name: newCategory },
          { withCredentials: true }
        )
        .then((response) => {
          setCategories([...categories, response.data.category]);
          setNewCategory('');
        })
        .catch((error) => {
          console.error(error);
          alert(error.response?.data?.message || 'Failed to add category');
        });
    }
  };

  // Add new department via backend
  const handleAddDepartment = (e) => {
    e.preventDefault();
    if (newDepartment.trim()) {
      axios
        .post(
          '/api/assetinventorymanagement/departments',
          { name: newDepartment },
          { withCredentials: true }
        )
        .then((response) => {
          setDepartments([...departments, response.data.department]);
          setNewDepartment('');
        })
        .catch((error) => {
          console.error(error);
          alert(error.response?.data?.message || 'Failed to add department');
        });
    }
  };

  return (
    <div
      className="container-fluid p-4"
      style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}
    >
      <h1 className="mb-4 text-center">System Configuration</h1>
      <p className="text-center mb-4">
        Configure asset categories, departments, urgency levels, and other system settings.
      </p>
      <Row className="mb-4">
        {/* Asset Categories Card */}
        <Col md={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header style={{ backgroundColor: '#007bff', color: '#fff' }}>
              <h5 className="mb-0">Asset Categories</h5>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled">
                {categories.map((cat, index) => (
                  <li key={index} className="mb-2">{cat}</li>
                ))}
              </ul>
              <Form onSubmit={handleAddCategory}>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Add new category"
                  />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100">
                  Add Category
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        {/* Departments Card */}
        <Col md={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header style={{ backgroundColor: '#17a2b8', color: '#fff' }}>
              <h5 className="mb-0">Departments</h5>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled">
                {departments.map((dep, index) => (
                  <li key={index} className="mb-2">{dep}</li>
                ))}
              </ul>
              <Form onSubmit={handleAddDepartment}>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)}
                    placeholder="Add new department"
                  />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100">
                  Add Department
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SystemConfig;