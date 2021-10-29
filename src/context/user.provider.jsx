import React, { createContext, useState } from "react";

export const UserContext = createContext({
  user: null,
  setCurrentUser: () => null,
});

const UserProvider = ({ children }) => {
  const [user, setCurrentUser] = useState(false);

  return (
    <UserContext.Provider
      value={{
        user,
        setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
