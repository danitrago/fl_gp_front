import React from "react";
import logo from "./assets/logo.svg";
import Wizard from "./ui-components/Wizard/Wizard";
import Request from "./pages/Request";
import UserContext from "./contexts/userContext";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <UserContext.Provider
      value={{
        email: "danielfmolina@comfama.com.co",
        uid: "123-456-789",
        name: "Daniel Felipe",
      }}
    >
      <Routes>
        <Route path="/" element={<p>DASHBOARD</p>} />
        <Route path="/all-requests" element={<p>TODAS LAS SOLICITUDES</p>} />
        <Route path="/my-requests" element={<p>MIS SOLICITUDES</p>} />
        <Route path="/my-tasks" element={<p>MIS TAREAS</p>} />
        <Route path="/request" element={<Request />} />
      </Routes>
      
    </UserContext.Provider>
  );
}

export default App;
