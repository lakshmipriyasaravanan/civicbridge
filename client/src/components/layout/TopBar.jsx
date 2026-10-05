import React from "react";
import { Bell, Search, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function TopBar({ onMenu }) {
  const { user } = useAuth();
  return <header className="topbar"><button className="mobile-menu" onClick={onMenu}><Menu size={21}/></button><div className="top-search"><Search size={17}/><input placeholder="Search schemes, benefits, departments..." /></div><div className="top-actions"><button className="icon-btn"><Bell size={18}/></button><div className="mini-user"><div className="avatar">{user?.name?.charAt(0)}</div><span>{user?.name?.split(' ')[0]}</span></div></div></header>;
}
