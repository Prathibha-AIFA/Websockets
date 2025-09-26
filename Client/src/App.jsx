import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import ClientPage from "./Components/CLientPage";
import HRPage from "./Components/HRPage";
import ManagerPage from "./Components/ManagerPage";
import AdminPage from "./Components/AdminPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Clients */}
        <Route path="/client/1" element={<ClientPage clientId={1} />} />
        <Route path="/client/2" element={<ClientPage clientId={2} />} />
        <Route path="/client/3" element={<ClientPage clientId={3} />} />

        {/* HRs */}
        <Route path="/hr/1" element={<HRPage hrId={1} />} />
        <Route path="/hr/2" element={<HRPage hrId={2} />} />

        {/* Managers */}
        <Route path="/manager/1" element={<ManagerPage managerId={1} />} />
        <Route path="/manager/2" element={<ManagerPage managerId={2} />} />

        {/* Admins */}
        <Route path="/admin/1" element={<AdminPage adminId={1} />} />
        <Route path="/admin/2" element={<AdminPage adminId={2} />} />
      </Routes>
    </Router>
  );
}

export default App;
