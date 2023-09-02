import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const EditEmployee = () => {
  return (
      <>
        <Container fluid="md">
            <Row>
              <Col>
                  <Card className='mt-5'>
                     
                      <Card.Header style={{ display:'flex', justifyContent:'space-between' }}>
                        <h6 style={{ marginTop:'10px' }}>Edit Employee</h6>
                      </Card.Header>
                
                      <Card.Body>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>Name</Form.Label>
                              <Form.Control type="text" name='name' placeholder="Enter Name" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>Email</Form.Label>
                              <Form.Control type="email" name='email' placeholder="Enter Email" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>Phone</Form.Label>
                              <Form.Control type="text" name='phone' placeholder="Enter Phone" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>Country</Form.Label>
                              <Form.Control type="text" name='country' placeholder="Enter Country" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>City</Form.Label>
                              <Form.Control type="text" name='city' placeholder="Enter City" />
                            </Form.Group>

                            <Form.Group controlId="formFile" className="mb-3">
                              <Form.Label>Image</Form.Label>
                              <Form.Control type="file" name='image' />
                            </Form.Group>

                            <div style={{ display:'flex', justifyContent:'end' }}>
                                <Link to="/">
                                  <Button size="sm" variant="warning">Back</Button>
                                </Link>
                                <Button size='sm' variant="success" style={{ marginLeft:'5px' }}>Edit</Button>
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

export default EditEmployee