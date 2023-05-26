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
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [isRegisterInfoPopupOpen, setIsRegisterInfoPopupOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogin() {
    setLoggedIn(true);
  }

  function onLogin(loginData, clearInputs) {
    auth.authorize(loginData)
      .then((data) => {
        if (data) {
          if (data.token) {
            clearInputs();
            setCurrentUserEmail(loginData.email);
            handleLogin();
            navigate('/', { replace: true });
          }
        }
        return;
      })
      .catch(err => {
        alert(`${err}
Попробуйте ещё раз.`);
      })
  }

  function onRegister(registerData) {
    auth.register(registerData)
      .then((data) => {
        if (data) {
          setIsRegisterSuccess(true);
          setIsRegisterInfoPopupOpen(true);
        }
      }).catch((err) => {
        console.log(err);
        setIsRegisterSuccess(false);
        setIsRegisterInfoPopupOpen(true);
      });
  }

  useEffect(() => {
    handleTokenCheck();
  }, [])

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setCurrentUserEmail(res.data.email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      }).catch((err) => {
        alert(`${err}
Что-то пошло не так. Попробуйте войти снова.`);
      })
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentUserEmail.Provider value={currentUserEmail}>
        <Routes>
          <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />} />
          <Route path="/" element={<ProtectedRouteElement element={MestoGeneralPage} loggedIn={loggedIn} currentUserEmail={currentUserEmail} currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="/signup" element={<Register onRegister={onRegister} isRegisterSuccess={isRegisterSuccess} isRegisterInfoPopupOpen={isRegisterInfoPopupOpen} setIsRegisterInfoPopupOpen={setIsRegisterInfoPopupOpen} />} />
          <Route path="/signin" element={<Login onLogin={onLogin} currentUserEmail={currentUserEmail} />} />
        </Routes>
      </CurrentUserEmail.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
