import React from "react";
import { Inbox } from 'lucide-react';
export default function EmptyState({ title, text, action }) { return <div className="empty-state"><div className="empty-icon"><Inbox size={22}/></div><h3>{title}</h3><p>{text}</p>{action}</div>; }
