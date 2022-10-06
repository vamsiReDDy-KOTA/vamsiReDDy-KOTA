import React, { useEffect, useState } from 'react'
import Login from './login'
import Regster from './Regster'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Deaktop from './Deaktop'
import AdminAcountCreaction from './Admin/AdminAcountCreaction'
import AdminDeleteAcount from './Admin/AdminDeleteAcount'
import AdminUpdateAcount from './Admin/AdminUpdateAcount'
import AdminSeeAcounts from './Admin/AdminSeeAcounts'
import AdminDeask from './Admin/AdminDeask'
import MyProfile from './MyProfile'
import UploadProfile from './UploadProfile'
import GetImage from './GetImage'
import AdminNavBar from './Admin/AdminNavBar'
import Valid from './valid'
import ForgetPassword from './ForgetPassword'
import Email from './Email'


const App = () => {
  var data = localStorage.getItem('vamsi')
  var datas = JSON.parse(data)
  
  return (
    <div>
    
    <BrowserRouter>
    {/*<Nav />*/}
        <Routes>
          <Route path='/register' element={<Regster/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/desktop' element={<Deaktop/>} />

    <Route path='/Admin' element={<AdminDeask />} />
    <Route path='/AdminCreation' element={<AdminAcountCreaction/>} />
    <Route path='/AdminDeleteAcount/:id' element={<AdminDeleteAcount/>} />
    <Route path='/AdminUpdateAcount/:id' element={<AdminUpdateAcount/>} />
    <Route path='/AdminSeeAcounts' element={<AdminSeeAcounts/>} />
    <Route path='/myProfile/' element={<MyProfile/>} />
    <Route path='/addProfile/:id' element={<UploadProfile/>} />
    <Route path='/getImage/:id' element={<GetImage/>} />
    {/*<Route path='/AppBar' element={<ResponsiveAppBar/>} />*/}
    <Route path='/settings' element={<AdminNavBar/>} />
    <Route path='/just' element={<Valid/>} />
    <Route path='/forgetPassword' element={<ForgetPassword/>} />
    <Route path='/email' element={<Email/>} />
  </Routes>
  </BrowserRouter>
  
    
    </div>
  )
}

export default App
