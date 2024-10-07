import React from 'react'
import Login from './login/Login'
import {Route, Routes } from 'react-router-dom'
import Register from './login/Register'
import Home from './home/Home'
import EmployeeList from './employee_list/EmployeeList'
import Nav from './home/Nav'
import CreateEmployee from './create_employee/CreateEmployee'
import Edit from './edit/Edit'

const App = () => {
  return (
    <div className=''>
    <Routes>
    <Route element={<Login/>} path=''/>
     <Route element={<Register/>} path='/register'/>
     <Route element={<Login/>} path='/login'/>
     <Route element={<Home/>} path='/home'/>
     <Route element={<EmployeeList/>} path='/employee_list' />
     <Route element={<CreateEmployee/>} path='/create_employee' />
     <Route element={<Edit/>}  path='/edit/:id'/>
     </Routes>
   
       
    </div>
   
  )
}

export default App
