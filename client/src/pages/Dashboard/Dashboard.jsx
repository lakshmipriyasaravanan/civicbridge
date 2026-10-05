import React, { useMemo } from "react";
import { ArrowRight, Bookmark, FileText, Search, TrendingUp, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import SchemeCard from '../../components/schemes/SchemeCard';
import ProgressBar from '../../components/common/ProgressBar';
import { calculateProfileCompleteness, calculateSchemeMatch } from '../../utils/profileUtils';

export default function Dashboard() {
  const { user } = useAuth();
  const { schemes, savedSchemes, profile } = useApp();

  const recommended = useMemo(() => {
    if (!schemes || schemes.length === 0) return [];
    return [...schemes]
      .map((s) => ({ ...s, matchScore: calculateSchemeMatch(profile, s) }))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
  }, [schemes, profile]);

  const completeness = calculateProfileCompleteness(profile);

  // Dynamic checklist based on actual filled user profile data
  const checklistItems = useMemo(() => [
    { label: 'Personal information', done: !!(profile.name && profile.email && profile.age) },
    { label: 'Location', done: !!(profile.state && (profile.district || profile.city || profile.residence)) },
    { label: 'Education', done: !!profile.education },
    { label: 'Employment', done: !!profile.employment },
    { label: 'Income', done: !!(profile.annualIncome || profile.incomeSource) },
    { label: 'Family information', done: !!(profile.householdSize || profile.dependents) },
    { label: 'Documents', done: !!profile.name },
    { label: 'Scheme interests', done: !!(profile.interests && profile.interests.length > 0) }
  ], [profile]);

  const completedCriteriaCount = useMemo(() => {
    return checklistItems.filter((item) => item.done).length;
  }, [checklistItems]);

  const relevantCount = useMemo(() => {
    if (!schemes || schemes.length === 0) return 0;
    return schemes.filter((s) => calculateSchemeMatch(profile, s) >= 60).length;
  }, [schemes, profile]);

  return (
    <div>
      <div className="page-heading">
        <div>
          <span className="eyebrow">PERSONAL DASHBOARD</span>
          <h1>Good morning, {user?.name?.split(' ')[0] || 'Citizen'}.</h1>
          <p>Based on your profile, here are benefits that may be relevant to you.</p>
        </div>
        <Link to="/schemes" className="btn btn-primary">Discover schemes <ArrowRight size={17}/></Link>
      </div>

      <div className="stats-grid">
        <Stat
          icon={Search}
          label="Relevant schemes"
          value={relevantCount}
          hint={relevantCount === 0 ? "Fill profile to discover matching schemes" : "Matching your profile"}
        />
        <Stat
          icon={Bookmark}
          label="Saved schemes"
          value={savedSchemes.length}
          hint={savedSchemes.length === 1 ? "1 scheme saved" : `${savedSchemes.length} schemes saved`}
        />
        <Stat
          icon={UserRound}
          label="Profile complete"
          value={`${completeness}%`}
          hint={`${completedCriteriaCount} of ${checklistItems.length} categories filled`}
        />
      </div>

      <div className="dashboard-grid">
        <section>
          <div className="section-title-row">
            <div>
              <h2>Recommended for you</h2>
              <p>Prioritized from your current profile.</p>
            </div>
            <Link to="/schemes">View all <ArrowRight size={15}/></Link>
          </div>
          <div className="scheme-grid compact">
            {recommended.map((s) => (
              <SchemeCard key={s._id || s.id} scheme={s} />
            ))}
          </div>
        </section>

        <aside className="profile-card">
          <div className="section-title-row">
            <div>
              <h3>Profile completeness</h3>
              <p>Complete your profile for better matching.</p>
            </div>
            <span className="complete-value">{completeness}%</span>
          </div>
          <ProgressBar value={completeness}/>

          <div className="check-list">
            {checklistItems.map((item) => (
              <div key={item.label} className={item.done ? 'done' : ''}>
                <span>{item.done ? '✓' : '○'}</span>
                {item.label}
              </div>
            ))}
          </div>

          <Link to="/profile" className="btn btn-secondary full">
            {completeness < 100 ? "Complete profile" : "Edit profile"}
          </Link>
        </aside>
      </div>

      <section className="activity-panel">
        <div className="section-title-row">
          <div>
            <h2>Prepare before you apply</h2>
            <p>A simple checklist for a confident application journey.</p>
          </div>
        </div>
        <div className="prep-grid">
          <Prep icon={FileText} title="Review documents" text="Check identity, income, education and residence documents."/>
          <Prep icon={UserRound} title="Validate your profile" text="Confirm the details CivicBridge uses for matching."/>
          <Prep icon={TrendingUp} title="Compare benefits" text="Compare up to three schemes before prioritizing."/>
        </div>
      </section>
    </div>
  );
}

function Stat({ icon: Icon, label, value, hint }) {
  return (
    <div className="stat-card">
      <div className="stat-icon"><Icon size={19}/></div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{hint}</small>
    </div>
  );
}

function Prep({ icon: Icon, title, text }) {
  return (
    <div className="prep-card">
      <Icon/>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}
