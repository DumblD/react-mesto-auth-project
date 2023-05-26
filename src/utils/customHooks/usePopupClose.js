import { useEffect } from "react";

export function usePopupClose(isOpen, closePopup) {
  useEffect(() => {
    if (!isOpen) return; // останавливаем действие эффекта, если попап закрыт

    const handleOverlay = (event) => {
      // закрытие по клику на оверлей
      if (event.target.className.includes("popup_opened")) {
        closePopup();
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closePopup();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOverlay);

    // удаление обработчиков при закрытии попапов
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlay);
    };
    // зависимость от изменения isOpen - эффект будет работать только при открытии попапов
  }, [isOpen, closePopup]);
}

