import "./App.css";
import React, { useEffect } from "react";
import Root from "./routes/Root";
import { useLocation } from "react-router-dom";


function App() {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/movies':
        document.title = 'Amazon Prime | Watch Movies - stream now';
        break;
      case 'series':
        document.title = 'Amazon Prime | Watch TV shows - stream now';
        break;
      case 'login':
        document.title = 'Amazon Prime | Sign-in';
      case 'register':
        document.title = 'Amazon Prime | Registration';
      default:
        document.title = 'Amazon Prime';
    }
  }, [location.pathname]);

  return (
    <div className="app h-screen">
      <Root />
    </div>
  );
}

export default App;
