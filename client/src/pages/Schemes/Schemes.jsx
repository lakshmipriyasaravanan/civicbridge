import React, { useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import SchemeCard from '../../components/schemes/SchemeCard';
import { useApp } from '../../context/AppContext';
import { calculateSchemeMatch, calculateProfileCompleteness } from '../../utils/profileUtils';

export default function Schemes() {
  const { schemes, profile } = useApp();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('match');

  const categories = ['All', ...new Set(schemes.map((s) => s.category))];
  const completeness = calculateProfileCompleteness(profile);

  // Filter schemes and sort by match percentage (highest match percentage above)
  const filtered = useMemo(() => {
    let list = schemes.map((s) => ({
      ...s,
      matchScore: calculateSchemeMatch(profile, s)
    }));

    list = list.filter((s) => {
      const searchTarget = [s.name, s.benefit, s.category, s.department, (s.tags || []).join(' ')].join(' ').toLowerCase();
      const matchesQuery = searchTarget.includes(query.toLowerCase());
      const matchesCategory = category === 'All' || s.category === category;
      return matchesQuery && matchesCategory;
    });

    if (sort === 'alpha') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Default & Best Match sort: Highest match percentage at the top!
      list.sort((a, b) => b.matchScore - a.matchScore);
    }

    return list;
  }, [schemes, profile, query, category, sort]);

  return (
    <div>
      <div className="page-heading">
        <div>
          <span className="eyebrow">DISCOVER BENEFITS</span>
          <h1>Explore government schemes</h1>
          <p>Schemes are ranked with higher profile match percentages at the top.</p>
        </div>
      </div>

      <div className="search-toolbar">
        <div className="large-search">
          <Search />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search scheme name, benefit, category or department..."
          />
          {query && (
            <button onClick={() => setQuery('')}>
              <X size={16} />
            </button>
          )}
        </div>

        <div className="toolbar-select">
          <SlidersHorizontal size={16} />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="toolbar-select">
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="match">Highest Match First</option>
            <option value="alpha">Alphabetical</option>
          </select>
        </div>
      </div>

      <div className="filter-summary">
        <span>
          <Filter size={15} />
          {filtered.length} schemes found (Ranked by profile relevance)
        </span>
        <span>
          {completeness < 80 ? "Complete your profile to refine match percentages." : "Matched against your verified profile."}
        </span>
      </div>

      <div className="scheme-grid">
        {filtered.map((s) => (
          <SchemeCard key={s._id || s.id} scheme={s} />
        ))}
      </div>

      {!filtered.length && (
        <div className="empty-state">
          <h3>No matching schemes</h3>
          <p>Try a broader search term or select another category.</p>
        </div>
      )}
    </div>
  );
}
