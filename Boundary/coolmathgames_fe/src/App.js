import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// SA Pages
import SACreateAcc from './pages/SACreateUAPage'
import SARetrieveUAPage from './pages/SARetrieveUAPage'
import SAUserProfile from './pages/SARetrieveUPPage'
import SACreateProfile from './pages/SACreateUPPage'
import SAViewUAPage from './pages/SAViewUAPage'
import SAUpdateUAPage from './pages/SAUpdateUAPage'
import SAUpdateUPPage from './pages/SAUpdateUPPage'
// Buyer Pages
import BuyerHomePage from './pages/BuyerHomePage'
// Seller Pages
import SellerHomePage from './pages/SellerHomePage'
// REA Pages
import REAHomePage from './pages/REAHomePage'
import REAViewCredentials from './pages/REAViewCredentialsPage'
import REAUpdateCredentials from './pages/REAUpdateCredentialsPage'
// General Pages/Components
import LoginPage from './pages/LoginPage'
import logOut from './components/LogOutModal'
import useToken from './components/useToken'


function App() {
  const { token, removeToken, setToken } = useToken();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('profile');
    setUserRole(role);
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
                <>
                  <Route path='/SACreateAccount' element={<SACreateAcc token={token}/>}></Route>
                  <Route path='/SAHomePage' element={<SARetrieveUAPage token={token}/>}></Route>
                  <Route path='/SAUserProfile' element={<SAUserProfile token={token}/>}></Route>
                  <Route path='/SACreateProfile' element={<SACreateProfile token={token}/>}></Route>
                  <Route path='/SAViewAccount' element={<SAViewUAPage token={token}/>}></Route>
                  <Route path='/SAUpdateAccount' element={<SAUpdateUAPage token={token}/>}></Route>
                  <Route path='/SAUpdateProfile' element={<SAUpdateUPPage token={token}/>}></Route>
                </>
              )}
              {userRole === 'Real Estate Agent' && (
                <>
                  <Route path='/REAHomePage' element={<REAHomePage token={token}/>}></Route>
                  <Route path='/REAViewCredentials' element={<REAViewCredentials token={token}/>}></Route>
                  <Route path='/REAUpdateCredentials' element={<REAUpdateCredentials token={token}/>}></Route>
                </>
              )}
              {userRole === 'Buyer' && (
                <>
                  <Route path='/BuyerHomePage' element={<BuyerHomePage token={token}/>}></Route>
                </>
              )}
              {userRole === 'Seller' && (
                <>
                  <Route path='/SellerHomePage' element={<SellerHomePage token={token}/>}></Route>
                </>
              )}
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;