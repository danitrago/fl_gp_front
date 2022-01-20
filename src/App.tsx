import React from "react";
import { Route, Routes } from "react-router-dom";
import UserContext from "./contexts/userContext";
import Request from "./pages/Request";

function App() {
  return (
    <UserContext.Provider
      value={{
        email: "danielfmolina@comfama.com.co",
        uid: "123-456-789",
        name: "Mile",
      }}
    >
      <Routes>
        <Route path="/" element={<p>DASHBOARD</p>} />
        <Route path="/all-requests" element={<p>TODAS LAS SOLICITUDES</p>} />
        <Route path="/my-requests" element={<p>MIS SOLICITUDES</p>} />
        <Route path="/my-tasks" element={<p>MIS TAREAS</p>} />
        <Route path="/request" element={<Request />} />
        <Route path="/request/:requestId" element={<Request />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
