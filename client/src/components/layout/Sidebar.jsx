import React from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Search, Bookmark, GitCompare, UserRound, HelpCircle, LogOut, ShieldCheck, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const links = [
  ['Dashboard', '/dashboard', LayoutDashboard],
  ['Discover schemes', '/schemes', Search],
  ['Saved schemes', '/saved', Bookmark],
  ['Compare', '/compare', GitCompare],
  ['My profile', '/profile', UserRound],
  ['Help & FAQ', '/help', HelpCircle]
];

export default function Sidebar({ open, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="brand">
        <div className="brand-mark">
          <ShieldCheck size={21}/>
        </div>
        <div>
          <strong>Civic<span>Bridge</span></strong>
          <small>Benefit Navigator</small>
        </div>
        <button className="mobile-close" onClick={onClose}>
          <X size={19}/>
        </button>
      </div>

      <nav>
        {links.map(([label, to, Icon]) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={onClose}
          >
            <Icon size={18}/>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="trust-note">
          <ShieldCheck size={17}/>
          <div>
            <strong>Built for clarity</strong>
            <span>Informational guidance, not an official eligibility decision.</span>
          </div>
        </div>
        <button className="logout" onClick={() => { logout(); navigate('/'); }}>
          <LogOut size={17}/> Sign out
        </button>
      </div>
    </aside>
  );
}
