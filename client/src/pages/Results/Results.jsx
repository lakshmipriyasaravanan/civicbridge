import React from "react";
import { ArrowRight, CheckCircle2, Info, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Badge from '../../components/common/Badge';
import { calculateSchemeMatch, calculateProfileCompleteness } from '../../utils/profileUtils';

export default function Results() {
  const { schemes, profile, eligibilityAnswers } = useApp();
  const merged = { ...profile, ...eligibilityAnswers };
  const completeness = calculateProfileCompleteness(merged);

  const results = schemes
    .map((s) => {
      const matchScore = calculateSchemeMatch(merged, s);
      return { ...s, matchScore };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 8);

  return (
    <div>
      <div className="page-heading">
        <div>
          <span className="eyebrow">YOUR RESULTS</span>
          <h1>Potential benefit matches</h1>
          <p>Here is how your current information aligns with available scheme criteria.</p>
        </div>
      </div>

      <div className="result-banner">
        <div className="result-score">
          <strong>{completeness}%</strong>
          <span>Profile readiness</span>
        </div>
        <div>
          <h3>{completeness >= 80 ? "Great profile alignment — top relevant matches identified!" : "Good foundation — completing more profile details will improve your matches."}</h3>
          <p>We evaluated your profile against government benefits. Final eligibility approval rests with official authorities.</p>
        </div>
        <Link className="btn btn-secondary" to="/profile">
          {completeness < 100 ? "Complete profile" : "Edit profile"}
        </Link>
      </div>

      <div className="results-list">
        {results.map((s, i) => (
          <article className="result-card" key={s._id || s.id}>
            <div className="result-main">
              <div className="result-rank">{i + 1}</div>
              <div>
                <div className="result-title">
                  <Badge tone={s.matchScore >= 80 ? 'success' : 'warning'}>
                    {s.matchScore >= 80 ? 'Strong match' : 'Partial match'}
                  </Badge>
                  <h2>{s.name}</h2>
                </div>
                <p>{s.benefit}</p>
                <div className="result-reasons">
                  {s.matchScore >= 80 ? (
                    <>
                      <span><CheckCircle2 size={14}/> Category aligns with interests</span>
                      <span><CheckCircle2 size={14}/> Profile criteria satisfied</span>
                      <span><CheckCircle2 size={14}/> Location/region compatible</span>
                    </>
                  ) : (
                    <>
                      <span><CheckCircle2 size={14}/> Key profile factors align</span>
                      <span><Info size={14}/> Additional details recommended</span>
                      <span><XCircle size={14}/> Verification required</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="result-side">
              <strong>{s.matchScore}%</strong>
              <span>potential match</span>
              <Link to={`/schemes/${s._id || s.id}`} className="btn btn-primary btn-small">
                Review <ArrowRight size={15}/>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
