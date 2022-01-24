import React from "react";

export type TUserContext = {
  id: string;
  user: string;
  email: string;
  role: string;
};

const UserContext = React.createContext<TUserContext>({} as TUserContext);
export default UserContext;
