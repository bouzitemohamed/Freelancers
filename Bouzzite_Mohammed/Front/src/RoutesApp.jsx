import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import ProtectedRoutes from './routes/ProtectedRoutes'
import Dashboard from './pages/Dashboard'
import LogoutButton from './components/Logout'
import Main from './pages/Main'
import Profile from './pages/Profile'
import AvailableProjects from './components/AvailableProjects';
const RoutesApp = () => {
  return (
    <BrowserRouter>
     <Routes>
       <Route path='/' element={<Main/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/register' element={<Register/>}/>
       <Route path='/dashboard' element={
        <ProtectedRoutes>
            <Dashboard>
               <LogoutButton/>
            </Dashboard>
        </ProtectedRoutes>
       }/>
       <Route path='/profile' element={
        <ProtectedRoutes>
            <Profile>
               <LogoutButton/>
            </Profile>
        </ProtectedRoutes>
       }/>
       <Route path="/available-projects" element={
         <ProtectedRoutes>
           <AvailableProjects />
         </ProtectedRoutes>
        } />
     </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp
