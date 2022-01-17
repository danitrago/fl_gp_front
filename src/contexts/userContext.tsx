import React from "react";

export type TUserContext = {
  name: string;
  email: string;
  uid: string;
};

const UserContext = React.createContext<TUserContext>({} as TUserContext);
export default UserContext;
