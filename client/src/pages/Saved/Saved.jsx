import React from "react";
import { Bookmark, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import EmptyState from '../../components/common/EmptyState';
import Badge from '../../components/common/Badge';
import { calculateSchemeMatch } from '../../utils/profileUtils';

export default function Saved() {
  const { savedSchemes, toggleSaved, profile } = useApp();

  return (
    <div>
      <div className="page-heading">
        <div>
          <span className="eyebrow">YOUR SHORTLIST</span>
          <h1>Saved schemes</h1>
          <p>Keep promising benefits in one place for later review.</p>
        </div>
      </div>

      {savedSchemes.length ? (
        <div className="saved-list">
          {savedSchemes.map((s) => {
            const matchScore = calculateSchemeMatch(profile, s);
            return (
              <article className="saved-row" key={s._id || s.id}>
                <div className="saved-icon">
                  <Bookmark size={20} fill="currentColor"/>
                </div>
                <div className="saved-info">
                  <Badge>{s.category}</Badge>
                  <h3>{s.name}</h3>
                  <p>{s.benefit}</p>
                </div>
                <div className="saved-score">
                  <strong>{matchScore}%</strong>
                  <span>match</span>
                </div>
                <Link className="btn btn-secondary btn-small" to={`/schemes/${s._id || s.id}`}>
                  View
                </Link>
                <button className="icon-btn" onClick={() => toggleSaved(s._id || s.id)}>
                  ×
                </button>
              </article>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No saved schemes yet"
          text="Save schemes you want to revisit later."
          action={
            <Link className="btn btn-primary" to="/schemes">
              <Search size={16}/> Explore schemes
            </Link>
          }
        />
      )}
    </div>
  );
}
