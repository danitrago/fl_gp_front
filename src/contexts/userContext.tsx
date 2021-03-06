import React from "react";

export type TUserContext = {
  userId: number;
  user: string;
  email: string;
  role: string;
};

const UserContext = React.createContext<TUserContext>({} as TUserContext);
export default UserContext;
