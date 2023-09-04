import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { deleteEmployee, getAllEmployee } from '../../features/employeeSlice';
import Swal from "sweetalert2";

const Employee = () => {

  const employees = useSelector((state) => state.employee.employees);

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getAllEmployee());

  }, [dispatch])

  const handleDeleteEmployee = (id) => {

    dispatch(deleteEmployee(id)).then((res) => {
      if(res)
      {

        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: 'success',
          title: res.payload.message
        })

        dispatch(getAllEmployee());

      }
    }).catch((err) => {
      console.log(err);
    });
  }


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
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Country</th>
                                        <th>City</th>
                                        <th className='text-center'>Actions</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      employees && employees.map((employee) => {
                                        const {id,name,email,phone,country,city} = employee;
                                        return <tr key={employee.id}>
                                                  <td>{employee.id}</td>
                                                  <td>{employee.name}</td>
                                                  <td>{employee.email}</td>
                                                  <td>{employee.phone}</td>
                                                  <td>{employee.country}</td>
                                                  <td>{employee.city}</td>
                                                  <td>
                                                      <div className='text-center'>
                                                          <Link to={`/edit-employee/${employee.id}`} state={{id,name,email,phone,country,city}}>
                                                            <Button size="sm" variant="info">Edit</Button>
                                                          </Link>
                                                          <Button onClick={() => {handleDeleteEmployee(employee.id)}} size='sm' variant="danger" style={{ marginLeft:'5px' }}>Delete</Button>
                                                      </div>
                                                  </td>
                                              </tr>
                                      })
                                    }
                                      
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