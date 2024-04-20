import { useState, useEffect } from 'react';
import './toast.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faTriangleExclamation, faCircleInfo, faXmark } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'; // Import type for icons

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

const ToastNotification = ({ type, message, onDismiss }: ToastNotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000); // goes off after 5s
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <li className={`toast ${type}`} onClick={onDismiss}>
      <div className="column">
        <FontAwesomeIcon icon= {toastDetails[type].icon} />
        {/*<i className={`fa-solid ${toastDetails[type].icon}`}></i>*/}
        <span>{message || toastDetails[type].text}</span>
      </div>
      {/*<i className="fa-solid fa-xmark"></i>*/}
      <FontAwesomeIcon icon={faXmark} onClick={onDismiss} />
    </li>
  );
};

interface Toast {
  id: string;
  type: string;
  message?: string;
}

interface ToastContainerProps {
  children: (addToast: (type: string, message?: string) => void) => React.ReactNode;
}

const ToastContainer = ({ children }: ToastContainerProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: string, message?: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts([...toasts, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(toasts.filter(toast => toast.id !== id));
  };

  return (
    <>
      {children(addToast)}
      <ul className="notifications">
        {toasts.map(toast => (
          <ToastNotification
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onDismiss={() => removeToast(toast.id)}
          />
        ))}
      </ul>
    </>
  );
};

export default ToastContainer;