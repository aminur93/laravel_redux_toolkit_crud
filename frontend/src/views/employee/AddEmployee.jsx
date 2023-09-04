import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllEmployee, storeEmployee } from '../../features/employeeSlice';

const AddEmployee = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStoreEmployee = (e) => {
    e.preventDefault();

    const data = {name, email, phone, country, city};

    dispatch(storeEmployee(data)).then((result) => {
      if(result)
      {
        dispatch(getAllEmployee());
      }
    }).catch((err) => {
      console.log(err);
    });

    navigate("/", {replace: true});
  }

  return (
    <>
        <Container fluid="md">
            <Row>
              <Col>
                  <Card className='mt-5'>
                     
                      <Card.Header style={{ display:'flex', justifyContent:'space-between' }}>
                        <h6 style={{ marginTop:'10px' }}>Add Employee</h6>
                      </Card.Header>
                
                      <Card.Body>
                          <Form onSubmit={handleStoreEmployee}>
                            <Form.Group className="mb-3">
                              <Form.Label>Name</Form.Label>
                              <Form.Control type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>Email</Form.Label>
                              <Form.Control type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>Phone</Form.Label>
                              <Form.Control type="text" name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter Phone" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>Country</Form.Label>
                              <Form.Control type="text" name='country' value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Enter Country" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>City</Form.Label>
                              <Form.Control type="text" name='city' value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter City" />
                            </Form.Group>

                            {/* <Form.Group controlId="formFile" className="mb-3">
                              <Form.Label>Image</Form.Label>
                              <Form.Control type="file" name='image' />
                            </Form.Group> */}

                            <div style={{ display:'flex', justifyContent:'end' }}>
                                <Link to="/">
                                  <Button size="sm" variant="warning">Back</Button>
                                </Link>
                                <Button type='submit' size='sm' variant="success" style={{ marginLeft:'5px' }}>Submit</Button>
                            </div>
                          </Form>
                      </Card.Body>
                  </Card>
              </Col>
            </Row>
        </Container>
    </>
  )
}

export default AddEmployee