import React from 'react';
import headerLogoImg from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <div className="logo header__logo">
        <img className="logo__img" alt="лого Место-Россия" src={headerLogoImg} />
      </div>
    </header>
  );
}

export default Header;
