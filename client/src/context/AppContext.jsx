import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { schemeService } from '../services/schemeService';
import { profileService } from '../services/profileService';
import { useAuth } from './AuthContext';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const { user, demoUsers } = useAuth();
  const [schemes, setSchemes] = useState([]);
  const [profile, setProfile] = useState({});

  const [savedIds, setSavedIds] = useState([]);
  const [comparisonIds, setComparisonIds] = useState([]);
  const [eligibilityAnswers, setEligibilityAnswers] = useState(() => {
    try { return JSON.parse(localStorage.getItem('civicbridge_eligibility')) || {}; } catch { return {}; }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    schemeService.getSchemes().then(setSchemes).finally(() => setLoading(false));
  }, []);

  useEffect(() => localStorage.setItem('civicbridge_eligibility', JSON.stringify(eligibilityAnswers)), [eligibilityAnswers]);

  // Per-user saved IDs & comparison IDs isolation
  useEffect(() => {
    if (!user) {
      setSavedIds([]);
      setComparisonIds([]);
      return;
    }
    const savedKey = `civicbridge_saved_${user.id || user.email}`;
    const compareKey = `civicbridge_compare_${user.id || user.email}`;

    try {
      setSavedIds(JSON.parse(localStorage.getItem(savedKey)) || []);
    } catch {
      setSavedIds([]);
    }

    try {
      setComparisonIds(JSON.parse(localStorage.getItem(compareKey)) || []);
    } catch {
      setComparisonIds([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const savedKey = `civicbridge_saved_${user.id || user.email}`;
      localStorage.setItem(savedKey, JSON.stringify(savedIds));
    }
  }, [user, savedIds]);

  useEffect(() => {
    if (user) {
      const compareKey = `civicbridge_compare_${user.id || user.email}`;
      localStorage.setItem(compareKey, JSON.stringify(comparisonIds));
    }
  }, [user, comparisonIds]);

  // User profile initialization & per-user isolation
  useEffect(() => {
    if (!user) {
      setProfile({});
      return;
    }

    const userKey = `civicbridge_profile_${user.id || user.email}`;
    const stored = localStorage.getItem(userKey);

    if (stored) {
      try {
        setProfile(JSON.parse(stored));
        return;
      } catch {
        // Continue if parse error
      }
    }

    // Check if user is a preset sample user (Priya or Arun)
    const isPresetUser = demoUsers?.some((u) => u.email === user.email);

    if (isPresetUser) {
      const presetProfile = {
        name: user.name,
        email: user.email,
        age: user.age || 21,
        gender: 'Female',
        state: user.state || 'Tamil Nadu',
        district: 'Chennai',
        city: 'Chennai',
        residence: 'Urban',
        education: user.education || 'Undergraduate',
        studentStatus: 'Enrolled',
        employment: user.employment || 'Student',
        occupation: 'Student',
        annualIncome: user.income || 450000,
        incomeSource: 'Family Income',
        householdSize: 4,
        dependents: 1,
        interests: user.interests || ['Education', 'Skill Development', 'Employment']
      };
      setProfile(presetProfile);
      localStorage.setItem(userKey, JSON.stringify(presetProfile));
    } else {
      // NEW REGISTERED USER: Starts completely fresh with only registered name & email
      const cleanProfile = {
        name: user.name || '',
        email: user.email || '',
        age: '',
        gender: '',
        state: '',
        district: '',
        city: '',
        residence: '',
        education: '',
        studentStatus: '',
        employment: '',
        occupation: '',
        annualIncome: '',
        incomeSource: '',
        householdSize: '',
        dependents: '',
        interests: []
      };
      setProfile(cleanProfile);
      localStorage.setItem(userKey, JSON.stringify(cleanProfile));
    }
  }, [user]);

  const updateProfile = async (next) => {
    setProfile(next);
    if (user) {
      const userKey = `civicbridge_profile_${user.id || user.email}`;
      localStorage.setItem(userKey, JSON.stringify(next));
    }
    try { await profileService.saveProfile({ ...next, userId: user?.id || user?.email }); } catch { /* offline fallback */ }
  };

  const savedSchemes = useMemo(() => {
    if (!schemes || schemes.length === 0 || !savedIds || savedIds.length === 0) return [];
    return schemes.filter((s) => savedIds.includes(s._id || s.id));
  }, [schemes, savedIds]);

  const compareSchemes = useMemo(() => {
    if (!schemes || schemes.length === 0 || !comparisonIds || comparisonIds.length === 0) return [];
    return schemes.filter((s) => comparisonIds.includes(s._id || s.id));
  }, [schemes, comparisonIds]);

  const toggleSaved = (id) => setSavedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const toggleCompare = (id) => setComparisonIds((prev) => {
    if (prev.includes(id)) return prev.filter((x) => x !== id);
    if (prev.length >= 3) return prev;
    return [...prev, id];
  });

  return (
    <AppContext.Provider value={{
      schemes,
      loading,
      profile,
      updateProfile,
      savedIds,
      savedSchemes,
      toggleSaved,
      comparisonIds,
      compareSchemes,
      toggleCompare,
      eligibilityAnswers,
      setEligibilityAnswers
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
