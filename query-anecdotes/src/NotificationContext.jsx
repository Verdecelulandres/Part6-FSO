import { createContext, useState } from "react";

const NotificationContext = createContext();

export default NotificationContext;

export const NotificationContextProvider = (props) => {
  const [message, setMessage] = useState('');
  const displayMessage = (str) => {
    setMessage(str);
    setTimeout(() => {
      setMessage('');
    }, 5000);
  }
  return (
    <NotificationContext.Provider value={{ message, displayMessage }}>
      {props.children}
    </NotificationContext.Provider>
  );
}