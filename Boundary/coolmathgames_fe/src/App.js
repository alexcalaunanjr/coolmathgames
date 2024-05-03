import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// SA Pages
import SACreateUAUI from './pages/SACreateUAUI'
import SARetrieveUAListUI from './pages/SARetrieveUAListUI'
import SARetrieveUPListUI from './pages/SARetrieveUPListUI'
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
import REAViewREACredentialsUI from './pages/REAViewREACredentialsUI'
import REAUpdateREACredentialsUI from './pages/REAUpdateREACredentialsUI'
// General Pages/Components
import LoginPage from './pages/LoginUI'
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
                  <Route path='/SARetrieveUAListUI' element={<SARetrieveUAListUI token={token}/>}></Route>
                  <Route path='/SARetrieveUPListUI' element={<SARetrieveUPListUI token={token}/>}></Route>
                  <Route path='/SACreateUPUI' element={<SACreateUPUI token={token}/>}></Route>
                  <Route path='/SAViewUAUI' element={<SAViewUAUI token={token}/>}></Route>
                  <Route path='/SAUpdateUAUI' element={<SAUpdateUAUI token={token}/>}></Route>
                  <Route path='/SAUpdateUPUI' element={<SAUpdateUPUI token={token}/>}></Route>
                </>
              )}
              {userRole === 'Real Estate Agent' && (
                <>
                  <Route path='/REAHomePage' element={<REAHomePage token={token}/>}></Route>
                  <Route path='/REAViewREACredentialsUI' element={<REAViewREACredentialsUI token={token}/>}></Route>
                  <Route path='/REAUpdateREACredentialsUI' element={<REAUpdateREACredentialsUI token={token}/>}></Route>
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