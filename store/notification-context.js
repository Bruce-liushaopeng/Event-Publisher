import { createContext, useState, useEffect  } from "react";

//set the initial state of the context value
const NotificationContext = createContext({
  notification: null, // {titel, message, status}
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});



export function NotificationContextProvider(props) {
  // manage all states related to notification
  const [activeNotification, setActiveNotification] = useState();

  useEffect(() => {
    if(activeNotification && (activeNotification.status === 'success' || activeNotification.status === 'error')) 
    {
      const timer = setTimeout(() => {
        setActiveNotification(null)
      }, 3000);
  
      return () => {
        clearTimeout(timer);
      }
    }
  }, [activeNotification])

  const showNotificationHandler = (notificationData) => {
    console.log("setting notification")
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  // expose all related state and stateHandler functions to one context obj
  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext
