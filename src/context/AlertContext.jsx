import { createContext, useState, useContext } from "react";

const AlertContext = createContext();

function AlertProvider({ children }) {
  const [error, setError] = useState("");

  const providerValue = { error, setError };

  return (
    <AlertContext.Provider value={providerValue}>
      {children}
    </AlertContext.Provider>
  );
}

function useAlertContext() {
  return useContext(AlertContext);
}

export { AlertProvider, useAlertContext };