import { createContext, useState } from "react";

const RegistryContext = createContext();

export function RegistryProvider({ children }) {
  const [registry, setRegistry] = useState({value: "", description: ""});

  return (
    <RegistryContext.Provider value={{ registry, setRegistry }}>
      {children}
    </RegistryContext.Provider>
  )
}

export default RegistryContext;