import React, { useContext } from 'react';
import { ReactComponent as CloseButton } from '../../../assets/images/close-button.svg';
import { AuthContext } from '../../../context/AuthContext';
import './LogoutModal.scss';

type LogoutModalProps = {
  isShown: boolean;
  closeHandler: () => void;
};

export const LogoutModal: React.FC<LogoutModalProps> = ({
  isShown,
  closeHandler,
}) => {
  const { logout, isAuthenticated } = useContext(AuthContext);

  const overlayStyle = {
    display: isShown && isAuthenticated ? 'initial' : 'none',
  };

  return (
    <div id="logoutModal" style={overlayStyle}>
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
            <button id="logoutButton" className="modal-button" onClick={logout}>
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
  );
};
