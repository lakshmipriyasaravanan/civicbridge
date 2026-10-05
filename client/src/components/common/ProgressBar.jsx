import React from "react";
export default function ProgressBar({ value = 0 }) { return <div className="progress"><span style={{ width: `${Math.min(100, Math.max(0, value))}%` }} /></div>; }
