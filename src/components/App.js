import React, { useEffect, useState } from 'react';

import Login from './Login.js';
import Register from './Register.js';
import MestoGeneralPage from './MestoGeneralPage.js';
import ProtectedRouteElement from "./ProtectedRoute";
import * as auth from './../utils/auth.js';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CurrentUserEmail } from '../contexts/CurrentUserEmail.js';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  function handleLogin() {
    setLoggedIn(true);
  }

  useEffect(() => {
    handleTokenCheck();
  }, [])

  function handleTokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setCurrentUserEmail(res.data.email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      });
    }
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentUserEmail.Provider value={currentUserEmail}>
          <Routes>
            <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />} />
            <Route path="/" element={<ProtectedRouteElement element={MestoGeneralPage} loggedIn={loggedIn} currentUserEmail={currentUserEmail} currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
          </Routes>
        </CurrentUserEmail.Provider>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
