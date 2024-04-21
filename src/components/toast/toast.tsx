import { createContext, ReactNode, useContext, useState } from 'react';
import './toast.scss';
import { ToastNotification } from './ToastNotification';

interface Toast {
  id: string;
  type: string;
  message?: string;
}

interface ToastContextType {
  addToast: (type: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType>({} as ToastContextType);

const ToastProvider = ({ children }: {children: ReactNode}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: string, message?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((toasts) => [...toasts, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((toasts) => toasts.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
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
    </ToastContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  return useContext(ToastContext);
};

export default ToastProvider;