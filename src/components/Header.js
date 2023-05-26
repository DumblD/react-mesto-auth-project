import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import headerLogoImg from '../images/logo.svg';
import MobileMenu from './MobileMenu';

function Header({
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
    <header className="header">
      <MobileMenu currentUserEmail={currentUserEmail} isMobileMenuActive={isMobileMenuActive} systemLogout={systemLogout} />
      <div className="header__desktop-container">
        <div className="logo header__logo">
          <img className="logo__img" alt="лого Место-Россия" src={headerLogoImg} />
        </div>
        <div className="header__email-container">{currentUserEmail}</div>
        <div className="header__logout">
          <button aria-label="выйти" type="button" onClick={systemLogout} className="header__logout-button">Выйти</button>
          <button aria-label="меню" type="button" onClick={toggleMobileMenu} className={`header__menu-button ${isMobileMenuActive ? 'header__menu-button_type_close' : ''}`}></button>
        </div>
      </div>
    </header>
  );
}

export default Header;
