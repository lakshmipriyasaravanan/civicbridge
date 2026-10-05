import React from "react";
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
export default function AppLayout(){const [open,setOpen]=useState(false);return <div className="app-shell"><Sidebar open={open} onClose={()=>setOpen(false)}/><div className="main-shell"><TopBar onMenu={()=>setOpen(true)}/><main className="page-wrap"><Outlet/></main></div>{open&&<div className="sidebar-overlay" onClick={()=>setOpen(false)}/>}</div>}
