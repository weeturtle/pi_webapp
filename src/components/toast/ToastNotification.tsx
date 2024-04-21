import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faTriangleExclamation, faCircleInfo, faXmark } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ToastDetails {
  [key: string]: {
    icon: IconDefinition;
    text: string;
  };
}
const toastDetails: ToastDetails = {
  success: {
    icon: faCircleCheck,
    text: 'Success: something good happened.',
  },
  error: {
    icon: faCircleXmark,
    text: 'Error: error occurred.',
  },
  warning: {
    icon: faTriangleExclamation,
    text: 'Warning: warning.',
  },
  info: {
    icon: faCircleInfo,
    text: 'Info: here is some info.',
  },
};
interface ToastNotificationProps {
  type: string;
  message?: string;
  onDismiss: () => void;
}
export const ToastNotification = ({ type, message, onDismiss }: ToastNotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000); // goes off after 5s
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <li className={`toast ${type}`} onClick={onDismiss}>
      <div className="column">
        <FontAwesomeIcon icon={toastDetails[type].icon} />
        {/*<i className={`fa-solid ${toastDetails[type].icon}`}></i>*/}
        <span>{message || toastDetails[type].text}</span>
      </div>
      {/*<i className="fa-solid fa-xmark"></i>*/}
      <FontAwesomeIcon icon={faXmark} onClick={onDismiss} />
    </li>
  );
};
