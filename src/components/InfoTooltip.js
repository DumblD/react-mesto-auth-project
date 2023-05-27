import React, { useEffect, useState } from 'react';
import successRegisterImg from './../images/success-register-img.svg';
import failRegisterImg from './../images/fail-register-img.svg';
import {useNavigate} from 'react-router-dom';
import Popup from './Popup.js';
import './InfoTooltip.css';

function InfoTooltip({
  isOpen,
  onClose,
  isRegisterSuccess
}) {
  // для того, чтобы пользователь при закрытии попапа не видел резкого исчезновения картики
  const [popupImg, setPopupImg] = useState('');
  const [altImgText, setaAltImgText] = useState('');
  const [popupText, setPopupText] = useState('');
  const navigate = useNavigate();

  function handleClose() {
    onClose();
    if (isRegisterSuccess) {
      navigate('/signin', {replace: true});
    }
  }

  useEffect(() => {
    if (isRegisterSuccess) {
      setPopupImg(`${successRegisterImg}`);
      setaAltImgText('успешная регистрация');
      setPopupText('Вы успешно зарегистрировались!');
    } else {
      setPopupImg(`${failRegisterImg}`);
      setaAltImgText('ошибка при регистрации');
      setPopupText(`Что-то пошло не так!
      Попробуйте ещё раз.`);
    }
  }, [isOpen, isRegisterSuccess]);

  return (
    <Popup isOpen={isOpen} onClose={handleClose} newPopupContainerStyles='info-popup__container'>
      <img src={`${popupImg}`} alt={`${altImgText}`} className="info-popup__img" />
      <div className="info-popup__title">{`${popupText}`}</div>
    </Popup>
  );
}

export default InfoTooltip;
