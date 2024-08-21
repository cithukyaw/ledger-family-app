import {createContext, FC, ReactNode, useState} from "react";
import {UserContextType} from "../types/declarations";

export const UserContext = createContext<UserContextType>({
  email: '',
  setEmail: () => {}
});

export const UserProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [email, setEmail] = useState<string>('');

  return (
    <UserContext.Provider value={{ email, setEmail }}>
      {children}
    </UserContext.Provider>
  );
};
