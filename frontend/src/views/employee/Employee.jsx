import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";

const Employee = () => {
  return (
    <>
        <Container fluid="md">
            <Row>
              <Col>
                  <Card className='mt-5'>
                     
                      <Card.Header style={{ display:'flex', justifyContent:'space-between' }}>
                        <h6 style={{ marginTop:'10px' }}>Employee Lists</h6>
                        <Link to="/add-employee">
                          <Button size='sm' variant="primary">Add New</Button>
                        </Link>
                        
                      </Card.Header>
                
                      <Card.Body>
                           <div>
                              <Table responsive="sm" striped bordered hover>
                                  <thead>
                                      <tr>
                                        <th>#</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Country</th>
                                        <th>City</th>
                                        <th className='text-center'>Actions</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      <tr>
                                          <td>1</td>
                                          <td></td>
                                          <td>Aminur</td>
                                          <td>aminur@gmail.com</td>
                                          <td>01772119941</td>
                                          <td>Bangladesh</td>
                                          <td>Dhaka</td>
                                          <td>
                                              <div className='text-center'>
                                                  <Link to="/edit-employee">
                                                    <Button size="sm" variant="info">Edit</Button>
                                                  </Link>
                                                  <Button size='sm' variant="danger" style={{ marginLeft:'5px' }}>Delete</Button>
                                              </div>
                                          </td>
                                      </tr>
                                  </tbody>
                              </Table>
                           </div>
                      </Card.Body>
                  </Card>
              </Col>
            </Row>
        </Container>
    </>
  )
}

export default Employee