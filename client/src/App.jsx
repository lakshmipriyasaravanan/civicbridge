import React from "react";
import { Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AppLayout from './layouts/AppLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Schemes from './pages/Schemes/Schemes';
import SchemeDetails from './pages/SchemeDetails/SchemeDetails';
import Results from './pages/Results/Results';
import Saved from './pages/Saved/Saved';
import Compare from './pages/Compare/Compare';
import Profile from './pages/Profile/Profile';
import Help from './pages/Help/Help';
import NotFound from './pages/NotFound/NotFound';
import Register from "./pages/Register/Register";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/schemes/:id" element={<SchemeDetails />} />
          <Route path="/eligibility" element={<Navigate to="/profile" replace />} />
          <Route path="/results" element={<Results />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/help" element={<Help />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
