import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import UserContext, { TUserContext } from "./contexts/userContext";
import Dashboard from "./pages/Dashboard";
import MyRequests from "./pages/MyRequests";
import Request from "./pages/Request";
import { getUserContract } from "./services/auth";

function App() {
  const [userContract, setUserContract] = useState<TUserContext>(
    {} as TUserContext
  );
  useEffect(() => {
    Promise.all([getUserContract("token")]).then(([userContractData]) => {
      setUserContract(userContractData);
    });
  }, []);

  return (
    <UserContext.Provider value={userContract}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/all-requests" element={<p>TODAS LAS SOLICITUDES</p>} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/my-tasks" element={<p>MIS TAREAS</p>} />
        <Route path="/request" element={<Request />} />
        <Route path="/request/:requestId" element={<Request />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
