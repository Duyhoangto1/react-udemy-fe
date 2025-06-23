import React from "react";

const UserContext = React.createContext({ email: "", auth: false });

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ email: "", auth: false });

  const handleLogin = (email, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    setUser((user) => ({
      email: email,
      auth: true,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUser((user) => ({
      email: "",
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
