import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import UserContext, { TUserContext } from "./contexts/userContext";
import useAthentication from "./hooks/useAthentication";
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
            )
            .catch((err) => {
              console.log("2222222222222222222222222222222222");
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log("333333333333333333333333333333");
        console.log(err);
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
          <Route path="/all-requests" element={<p>TODAS LAS SOLICITUDES</p>} />
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
