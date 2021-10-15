import React, { useContext } from 'react';
import { ReactComponent as CloseButton } from '../../../assets/images/close-button.svg';
import { AuthContext } from '../../../context/AuthContext';
import './LogoutModal.scss';

type LogoutModalProps = {
  closeHandler: () => void;
};

export const LogoutModal: React.FC<LogoutModalProps> = ({ closeHandler }) => {
  const { logout } = useContext(AuthContext);

  return (
    <div id="logoutModal">
      <div className="modal-overlay" onClick={closeHandler}>
        <div className="modal-window">
          <div className="modal-header">
            <h5 className="modal-title">Logout modal</h5>
            <CloseButton
              className="modal-close-button"
              onClick={closeHandler}
            />
          </div>
          <div className="modal-content">
            <h2 id="logoutHeader">Do you really want to logout?</h2>
            <div className="buttons">
              <button
                id="logoutButton"
                className="modal-button"
                onClick={logout}
              >
                Logout
              </button>
              <button
                id="stayButton"
                className="modal-button"
                onClick={closeHandler}
              >
                Stay logged in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
