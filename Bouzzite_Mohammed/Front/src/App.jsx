import React from 'react'
import { AuthProvider } from './contexts/authContext'
import RoutesApp from './RoutesApp'
const App = () => {
  return (
    <AuthProvider>
       <RoutesApp/>
    </AuthProvider>
  )
}

export default App
