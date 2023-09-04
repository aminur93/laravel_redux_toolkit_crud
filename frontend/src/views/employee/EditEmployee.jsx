import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEditEmployee, updateEmployee } from '../../features/employeeSlice';
import Swal from "sweetalert2";

const EditEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const employe = useSelector((state) => state.employee.employee);

  // Use a single state variable to store the employee data
  const [employee, setEmployee] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    _method: 'PUT'
  });

  useEffect(() => {
    dispatch(getEditEmployee(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (employe) {
      // Set the state of the 'employee' object, not 'employees'
      setEmployee({
        ...employe,
        id: employe.id,
        name: employe.name,
        email: employe.email,
        phone: employe.phone,
        country: employe.country,
        city: employe.city,
        _method: 'PUT', // Include this property as well if needed
      });
    }
  }, [employe]);

  const handleUpdateEmployee = (e) => {
    e.preventDefault();

    dispatch(updateEmployee(employee)).then((result) => {
      if(result)
      {
        console.log(result);

        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: 'success',
          title: result.payload.message
        })

        dispatch(getEditEmployee(id));
      }
    }).catch((err) => {
      console.log(err);
    });

    //navigate('/', { replace: true });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  return (
    <>
      <Container fluid="md">
        <Row>
          <Col>
            <Card className='mt-5'>
              <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h6 style={{ marginTop: '10px' }}>Edit Employee</h6>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleUpdateEmployee}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name='name' value={employee.name} onChange={handleInputChange} placeholder="Enter Name" />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name='email' value={employee.email} onChange={handleInputChange} placeholder="Enter Email" />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name='phone' value={employee.phone} onChange={handleInputChange} placeholder="Enter Phone" />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" name='country' value={employee.country} onChange={handleInputChange} placeholder="Enter Country" />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" name='city' value={employee.city} onChange={handleInputChange} placeholder="Enter City" />
                  </Form.Group>

                  <div style={{ display:'flex', justifyContent:'end' }}>
                      <Link to="/">
                        <Button size="sm" variant="warning">Back</Button>
                      </Link>
                      <Button type='submit' size='sm' variant="success" style={{ marginLeft:'5px' }}>Edit</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditEmployee;