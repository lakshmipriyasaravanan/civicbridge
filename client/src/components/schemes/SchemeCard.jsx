import React from "react";
import { Bookmark, CheckCircle2, GitCompare, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import { useApp } from '../../context/AppContext';
import { calculateSchemeMatch } from '../../utils/profileUtils';

export default function SchemeCard({ scheme }) {
  const { savedIds, toggleSaved, comparisonIds, toggleCompare, profile } = useApp();
  const id = scheme._id || scheme.id;
  const saved = savedIds.includes(id);
  const compared = comparisonIds.includes(id);
  
  const matchScore = scheme.matchScore || calculateSchemeMatch(profile, scheme);

  return (
    <article className="scheme-card">
      <div className="scheme-card-top">
        <Badge>{scheme.category}</Badge>
        <button
          className={`icon-btn ${saved ? 'active' : ''}`}
          onClick={() => toggleSaved(id)}
          aria-label="Save scheme"
        >
          <Bookmark size={18} fill={saved ? 'currentColor' : 'none'}/>
        </button>
      </div>

      <h3>{scheme.name}</h3>
      <p className="muted">{scheme.department} · {scheme.level}</p>
      <p className="scheme-benefit">{scheme.benefit}</p>

      <div className="match-row">
        <div>
          <span className="match-number">{matchScore}%</span>
          <span className="muted"> potential match</span>
        </div>
        <Badge tone={matchScore >= 80 ? 'success' : 'warning'}>
          {matchScore >= 80 ? 'Strong match' : 'Partial match'}
        </Badge>
      </div>

      <div className="criteria-list">
        {(scheme.eligibilityPreview || ['Profile information matches', 'Additional details may be required']).slice(0, 3).map((x, i) => (
          <div key={i}>
            <CheckCircle2 size={15}/>{x}
          </div>
        ))}
      </div>

      <div className="card-actions">
        <Link className="btn btn-primary btn-small" to={`/schemes/${id}`}>
          View details <ArrowUpRight size={15}/>
        </Link>
        <button
          className={`btn btn-ghost btn-small ${compared ? 'selected' : ''}`}
          onClick={() => toggleCompare(id)}
        >
          <GitCompare size={15}/>
          {compared ? 'Added' : 'Compare'}
        </button>
      </div>
    </article>
  );
}
