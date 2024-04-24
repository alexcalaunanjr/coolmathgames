import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SACreateAcc from './pages/SACreateUAPage'
import BuyerHomePage from './pages/BuyerHomePage'
import SellerHomePage from './pages/SellerHomePage'
import REAHomePage from './pages/REAHomePage'
import SARetrieveUAPage from './pages/SARetrieveUAPage'
import SAUserProfile from './pages/SARetrieveUPPage'
import SACreateProfile from './pages/SACreateUPPage'
import logOut from './components/LogOutModal'
import useToken from './components/useToken'

function App() {
  const { token, removeToken, setToken } = useToken();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Get the user role from local storage
    const role = localStorage.getItem('profile');
    setUserRole(role);
    console.log("Profile:", role)
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <logOut token={removeToken}/>
        {!token && token!=="" &&token!== undefined? 
        <LoginPage setToken={setToken} />
        : (
          <>
            <Routes>
              <Route path='/login' element={<LoginPage token={token} setToken={setToken}/>}></Route>
              {userRole === 'System Admin' && (
                <Route path='/SACreateAcc' element={<SACreateAcc token={token} setToken={setToken}/>}></Route>
              )}
              {userRole === 'System Admin' && (
                <Route path='/SAHomePage' element={<SARetrieveUAPage token={token} setToken={setToken}/>}></Route>
              )}
              {userRole === 'System Admin' && (
                <Route path='/UserProfile' element={<SAUserProfile token={token} setToken={setToken}/>}></Route>
              )}
              {userRole === 'System Admin' && (
                <Route path='/SACreateProfile' element={<SACreateProfile token={token} setToken={setToken}/>}></Route>
              )}
              {userRole === 'Real Estate Agent' && (
                <Route path='/REAHomePage' element={<REAHomePage token={token} setToken={setToken}/>}></Route>
              )}
              {userRole === 'Buyer' && (
                <Route path='/BuyerHomePage' element={<BuyerHomePage token={token} setToken={setToken}/>}></Route>
              )}
              {userRole === 'Seller' && (
                <Route path='/SellerHomePage' element={<SellerHomePage token={token} setToken={setToken}/>}></Route>
              )}
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;