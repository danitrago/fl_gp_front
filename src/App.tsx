import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import UserContext, { TUserContext } from "./contexts/userContext";
import useAthentication from "./hooks/useAthentication";
import AllRequests from "./pages/AllRequests";
import Dashboard from "./pages/Dashboard";
import MyPendings from "./pages/MyPendings";
import MyRequests from "./pages/MyRequests";
import Request from "./pages/Request";
import { getUserContract } from "./services/auth";
import Spinner from "./ui-components/Spinner";

function App() {
  const [userContract, setUserContract] = useState<TUserContext>(
    {} as TUserContext
  );
  const [isLoading, setIsLoading] = useState(true);

  const { autenticate } = useAthentication();

  useEffect(() => {
    autenticate()
      .then(() => {
        let token = window.sessionStorage.getItem("user-jwt");
        if (token) {
          Promise.all([getUserContract(token)])
            .then(([userContractData]) => {
              setUserContract(userContractData);
            })
            .finally(() =>
              setTimeout(() => {
                setIsLoading(false);
              }, 1000)
            );
        }
      })
      .catch((err) => {
        window.sessionStorage.clear();
        alert("No tienes permisos para ver esta página.");
      });
  }, []);

  return (
    <UserContext.Provider value={userContract}>
      {isLoading ? (
        <Spinner />
      ) : !userContract.email ? (
        "Sin permisos"
      ) : (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/requests-center" element={<AllRequests />} />
          <Route path="/my-requests" element={<MyRequests />} />
          <Route path="/my-tasks" element={<MyPendings />} />
          <Route path="/request" element={<Request />} />
          <Route path="/request/:requestId" element={<Request />} />
        </Routes>
      )}
    </UserContext.Provider>
  );
}

export default App;
