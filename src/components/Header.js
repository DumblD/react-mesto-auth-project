import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import headerLogoImg from '../images/logo.svg';
import MobileMenu from './MobileMenu';

function Header({
  isMainPage,
  loginRegisterButtonText,
  handleLoginRegisterButton,
  currentUserEmail
}) {

  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const navigate = useNavigate();

  function toggleMobileMenu() {
    if (isMobileMenuActive) {
      setIsMobileMenuActive(false);
    } else {
      setIsMobileMenuActive(true);
    }
  }

  function systemLogout() {
    localStorage.removeItem('jwt');
    navigate('/signin', { replace: true });
  }

  return (
    <>
      {isMainPage? (
        <header className="header">
          <MobileMenu currentUserEmail={currentUserEmail} isMobileMenuActive={isMobileMenuActive} systemLogout={systemLogout} />
          <div className="header__desktop-container">
            <div className="logo header__logo">
              <img className="logo__img" alt="лого Место-Россия" src={headerLogoImg} />
            </div>
            <div className="header__email-container">{currentUserEmail}</div>
            <div className="header__logout">
              <button aria-label="выйти" type="button" onClick={systemLogout} className="header__logout-button">Выйти</button>
              <button aria-label="меню" type="button" onClick={toggleMobileMenu} className={`header__menu-button ${isMobileMenuActive ? 'header__menu-button_type_close' : ''}`}/>
            </div>
          </div>
        </header>
      ) : (
          <header className="header-login-register">
            <div className="logo header-login-register__logo">
              <img src={headerLogoImg} alt="лого Место-Россия" className="logo__img" />
            </div>
            <div className="header-login-register__login-register-container">
              <button aria-label={loginRegisterButtonText} type="button" onClick={handleLoginRegisterButton} className="header-login-register__button">{loginRegisterButtonText}</button>
            </div>
          </header>
      )}
    </>
  );
}

export default Header;
