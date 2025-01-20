import React, { memo, PropsWithChildren, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { EVENT_NAMES } from "../../constants/eventNames";
import { KEYBOARD_KEYS } from "../../constants/keyboardKeys";
import { PORTAL_IDS } from "../../constants/portalIds";
import { useModal } from "../../utils/hooks";
import styles from "./Modal.module.css";

const Modal: React.FC<PropsWithChildren> = ({ children }) => {
  const { isModalOpen, closeModal } = useModal();
  const modalRoot = document.getElementById(PORTAL_IDS.modal);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === KEYBOARD_KEYS.Escape) {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener(EVENT_NAMES.Keydown, handleKeyDown);
      return () =>
        document.removeEventListener(EVENT_NAMES.Keydown, handleKeyDown);
    }
  }, [handleKeyDown, isModalOpen]);

  if (!isModalOpen || !modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className={styles.overlay}
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    modalRoot
  );
};

export default memo(Modal);
