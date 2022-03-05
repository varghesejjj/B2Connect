import { useContext } from "react";
import { Navigate, Routes, Route } from 'react-router-dom'

import TokenContext from "./store/store"

import Header from './components/LayoutComponents/Header'
import Navbar from './components/LayoutComponents/Navbar'
import Footer from "./components/LayoutComponents/Footer";

import Login from "./pages/auth/Login"
import DashBoard from "./pages/dashboard/Dashboard"
import CreateUser from "./pages/usermanagement/CreateUser"
import ViewUserPage from "./pages/usermanagement/ViewUser";

function App() {
  const TokenCxt = useContext(TokenContext);
  if (!TokenCxt.token) {
    
      return <Login />
    }
    
  return (
    <div>
      <Navbar />
      {/* Login Route */}
      <Routes>
      <Route path='/login' element={TokenCxt.token ? <Navigate to="/" /> : <Login />}/>
        

      {/* Dashboard Route */}
      <Route path='/' exact element={<>
          <Header title="Home || B2Connect" />
          <DashBoard />
        </>}/>

      {/* CreateUser Route */}
      <Route path='/createUser' exact element={<>
          <Header title="Create User || B2Connect" />
          <CreateUser />
        </>}/>

      {/*View User Route */}
      <Route path='/user/:id' exact element={<>
          <Header title="User || B2Connect" />
          <ViewUserPage />
        </>}/>
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
