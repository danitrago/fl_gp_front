import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import UserContext, { TUserContext } from "./contexts/userContext";
import Dashboard from "./pages/Dashboard";
import MyRequests from "./pages/MyRequests";
import Request from "./pages/Request";
import { getUserContract } from "./services/auth";
import Spinner from "./ui-components/Spinner";

function App() {
  const [userContract, setUserContract] = useState<TUserContext>(
    {} as TUserContext
  );
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    Promise.all([getUserContract("token")])
      .then(([userContractData]) => {
        setUserContract(userContractData);
      })
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1000)
      );
  }, []);

  return (
    <UserContext.Provider value={userContract}>
      {isLoading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/all-requests" element={<p>TODAS LAS SOLICITUDES</p>} />
          <Route path="/my-requests" element={<MyRequests />} />
          <Route path="/my-tasks" element={<p>MIS TAREAS</p>} />
          <Route path="/request" element={<Request />} />
          <Route path="/request/:requestId" element={<Request />} />
        </Routes>
      )}
    </UserContext.Provider>
  );
}

export default App;
