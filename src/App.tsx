import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import UserContext from "./contexts/userContext";
import MyRequests from "./pages/MyRequests";
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
        <Route
          path="/"
          element={
            <ul>
              <li>
                <Link to="/request">Nueva solicitud</Link>
              </li>
              <li>
                <Link to="/my-requests">Mis solicitudes</Link>
              </li>
            </ul>
          }
        />
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
