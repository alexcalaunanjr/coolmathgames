import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// SA Pages
import SACreateUAUI from './pages/SACreateUAUI'
import SARetrieveUAUI from './pages/SARetrieveUAUI'
import SARetrieveUPUI from './pages/SARetrieveUPUI'
import SACreateUPUI from './pages/SACreateUPUI'
import SAViewUAUI from './pages/SAViewUAUI'
import SAUpdateUAUI from './pages/SAUpdateUAUI'
import SAUpdateUPUI from './pages/SAUpdateUPUI'
// Buyer Pages
import BuyerHomePage from './pages/BuyerHomePage'
// Seller Pages
import SellerHomePage from './pages/SellerHomePage'
// REA Pages
import REAHomePage from './pages/REAHomePage'
import REAViewCredentialsUI from './pages/REAViewCredentialsUI'
import REAUpdateCredentialsUI from './pages/REAUpdateCredentialsUI'
// General Pages/Components
import LoginPage from './pages/LoginPage'
import logOut from './components/LogOutUI'
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
                  <Route path='/SACreateUAUI' element={<SACreateUAUI token={token}/>}></Route>
                  <Route path='/SARetrieveUAUI' element={<SARetrieveUAUI token={token}/>}></Route>
                  <Route path='/SARetrieveUPUI' element={<SARetrieveUPUI token={token}/>}></Route>
                  <Route path='/SACreateUPUI' element={<SACreateUPUI token={token}/>}></Route>
                  <Route path='/SAViewUAUI' element={<SAViewUAUI token={token}/>}></Route>
                  <Route path='/SAUpdateUAUI' element={<SAUpdateUAUI token={token}/>}></Route>
                  <Route path='/SAUpdateUPUI' element={<SAUpdateUPUI token={token}/>}></Route>
                </>
              )}
              {userRole === 'Real Estate Agent' && (
                <>
                  <Route path='/REAHomePage' element={<REAHomePage token={token}/>}></Route>
                  <Route path='/REAViewCredentialsUI' element={<REAViewCredentialsUI token={token}/>}></Route>
                  <Route path='/REAUpdateCredentialsUI' element={<REAUpdateCredentialsUI token={token}/>}></Route>
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