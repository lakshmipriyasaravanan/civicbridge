import React from "react";
import { Link } from 'react-router-dom';export default function NotFound(){return <div className="not-found"><div className="not-found-code">404</div><h1>We couldn't find that page.</h1><p>The page may have moved or the link may be incorrect.</p><Link className="btn btn-primary" to="/">Back to CivicBridge</Link></div>}
