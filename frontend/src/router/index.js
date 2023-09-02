import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Employee from "../views/employee/Employee";
import AddEmployee from "../views/employee/AddEmployee";
import EditEmployee from "../views/employee/EditEmployee";

const index = () => {
  return (
    <div>
        <Router>
            <Routes>
                <Route path='/' element={<Employee />}></Route>
                <Route path='/add-employee' element={<AddEmployee />}></Route>
                <Route path='/edit-employee' element={<EditEmployee />}></Route>
            </Routes>
        </Router>
    </div>
  )
}

export default index