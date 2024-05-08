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
import BuyerRetrieveNewListingListUI from './pages/BuyerRetrieveNewListingListUI'
import BuyerRetrieveSoldListingListUI from './pages/BuyerRetrieveSoldListingListUI'
import BuyerViewNewListingUI from './pages/BuyerViewNewListingUI'
import BuyerViewSoldListingUI from './pages/BuyerViewSoldListingUI'
import BuyerViewREACredentialsUI from './pages/BuyerViewREACredentialsUI'
// Seller Pages
import SellerRetrieveListingListUI from './pages/SellerRetrieveListingListUI'
import SellerViewListing from './pages/SellerViewListingUI'
import SellerViewREACredentialsUI from './pages/SellerViewREACredentialsUI'
// REA Pages
import REACreateListingUI from './pages/REACreateListingUI'
import REARetrieveListingListUI from './pages/REARetrieveListingListUI'
import REAViewListingUI from './pages/REAViewListingUI'
import REAUpdateListingUI from './pages/REAUpdateListingUI'
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
                  <Route path='/REACreateListingUI' element={<REACreateListingUI token={token}/>}></Route>
                  <Route path='/REARetrieveListingListUI' element={<REARetrieveListingListUI token={token}/>}></Route>
                  <Route path='/REAViewListingUI/:propertyName' element={<REAViewListingUI  token={token}/>}></Route>
                  <Route path='/REAViewREACredentialsUI' element={<REAViewREACredentialsUI token={token}/>}></Route>
                  <Route path='/REAUpdateREACredentialsUI' element={<REAUpdateREACredentialsUI token={token}/>}></Route>
                  <Route path='/REAUpdateListingUI/:propertyName' element={<REAUpdateListingUI token={token}/>}></Route>
                </>
              )}
              {userRole === 'Buyer' && (
                <>
                  <Route path='/BuyerRetrieveNewListingListUI' element={<BuyerRetrieveNewListingListUI token={token}/>}></Route>
                  <Route path='/BuyerRetrieveSoldListingListUI' element={<BuyerRetrieveSoldListingListUI token={token}/>}></Route>
                  <Route path='/BuyerViewNewListingUI/:propertyName' element={<BuyerViewNewListingUI token={token}/>}></Route>
                  <Route path='/BuyerViewSoldListingUI/:propertyName' element={<BuyerViewSoldListingUI token={token}/>}></Route>
                  <Route path='/BuyerViewREACredentialsUI/:agentName' element={<BuyerViewREACredentialsUI token={token}/>}></Route>
                </>
              )}
              {userRole === 'Seller' && (
                <>
                  <Route path='/SellerRetrieveListingListUI' element={<SellerRetrieveListingListUI token={token}/>}></Route>
                  <Route path='/SellerViewListingUI/:propertyName' element={<SellerViewListing token={token}/>}></Route>
                  <Route path='/SellerViewREACredentialsUI/:agentName' element={<SellerViewREACredentialsUI token={token}/>}></Route>
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