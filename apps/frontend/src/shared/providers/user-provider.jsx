import { createContext, useContext, useMemo } from "react";
import { v4 as uuid } from 'uuid';

const USER_ID_STORAGE_KEY = '__uid';

const UserContext = createContext({
  userId: ''
});

export function UserProvider({ children }) {
  const providerValue = useMemo(() => {
    let userId = window.localStorage.getItem(USER_ID_STORAGE_KEY);
    if (!userId) {
      userId = uuid();
      window.localStorage.setItem(USER_ID_STORAGE_KEY, userId);
    }
    return { userId };
  }, []);

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  )
};

export const useUser = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('No UserContext provider found in the tree.');
  }

  return userContext;
};
