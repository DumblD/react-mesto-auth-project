import React from 'react';

function MobileMenu({
  currentUserEmail,
  isMobileMenuActive,
  systemLogout
}) {
  return (
    <div className={`header__mobile-menu ${isMobileMenuActive ? 'header__mobile-menu_opened' : ''}`}>
      <div className="header__email-container_type_mobile-menu">{currentUserEmail}</div>
      <div className="header__exit"><button aria-label="выйти" type="button" onClick={systemLogout} className="header__logout-button_type_mobile-menu">Выйти</button></div>
    </div>
  );
}

export default MobileMenu;
