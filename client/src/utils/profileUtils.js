export const CORE_PROFILE_FIELDS = [
  'name',
  'email',
  'age',
  'state',
  'district',
  'education',
  'employment',
  'annualIncome',
  'residence',
  'interests'
];

export function calculateProfileCompleteness(profile) {
  if (!profile || typeof profile !== 'object') return 0;
  
  let filledCount = 0;
  for (const field of CORE_PROFILE_FIELDS) {
    const val = profile[field];
    if (val !== '' && val !== null && val !== undefined) {
      if (Array.isArray(val)) {
        if (val.length > 0) filledCount++;
      } else if (typeof val === 'number') {
        if (!isNaN(val) && val > 0) filledCount++;
      } else if (typeof val === 'string') {
        if (val.trim().length > 0) filledCount++;
      }
    }
  }

  return Math.min(100, Math.round((filledCount / CORE_PROFILE_FIELDS.length) * 100));
}

/**
 * Evaluates scheme relevance strictly based on user profile details
 * Empty/unfilled profile fields contribute 0 match points to ensure
 * incomplete profiles reflect 0% or low match score until filled.
 */
export function calculateSchemeMatch(profile, scheme) {
  if (!scheme) return 0;
  if (!profile || typeof profile !== 'object') return 0;

  const e = scheme.eligibility || {};
  let totalScore = 0;
  let totalWeight = 0;

  // 1. Target Group / Employment / Student Status Match (Weight: 25)
  totalWeight += 25;
  const targetAudience = scheme.targetAudience || [];
  const userRole = (profile.employment || profile.studentStatus || profile.citizenCategory || '').toLowerCase();
  
  if (userRole) {
    const matchesTarget = targetAudience.some((t) =>
      t.toLowerCase().includes(userRole) || userRole.includes(t.toLowerCase())
    );
    if (matchesTarget) {
      totalScore += 25;
    } else {
      totalScore += 5; // Mismatched target group
    }
  } else {
    totalScore += 0; // Unfilled employment
  }

  // 2. Location / State Match (Weight: 25)
  totalWeight += 25;
  const locations = e.locations || [];
  if (profile.state) {
    if (locations.length === 0 || scheme.level === 'Central') {
      totalScore += 25; // Central scheme applies to all states
    } else {
      const isStateEligible = locations.some((loc) => loc.toLowerCase() === profile.state.toLowerCase());
      if (isStateEligible) {
        totalScore += 25;
      } else {
        totalScore += 0; // State mismatch
      }
    }
  } else {
    if (scheme.level === 'Central' && locations.length === 0) {
      totalScore += 10;
    } else {
      totalScore += 0;
    }
  }

  // 3. Age Criteria Match (Weight: 20)
  totalWeight += 20;
  if (profile.age && e.minAge !== undefined && e.maxAge !== undefined) {
    const userAge = Number(profile.age);
    if (userAge >= e.minAge && userAge <= e.maxAge) {
      totalScore += 20;
    } else {
      totalScore += 0; // Outside age range
    }
  } else {
    totalScore += 0; // Unfilled age
  }

  // 4. Income Criteria Match (Weight: 15)
  totalWeight += 15;
  if (profile.annualIncome && e.maxIncome) {
    const userIncome = Number(profile.annualIncome);
    if (userIncome <= e.maxIncome) {
      totalScore += 15;
    } else {
      totalScore += 0; // Exceeds scheme max income limit
    }
  } else {
    totalScore += 0; // Unfilled income
  }

  // 5. Category / Interest Preference Match (Weight: 15)
  totalWeight += 15;
  if (profile.interests && Array.isArray(profile.interests) && profile.interests.length > 0) {
    const matchesInterest = profile.interests.some(
      (interest) => interest.toLowerCase() === (scheme.category || '').toLowerCase()
    );
    if (matchesInterest) {
      totalScore += 15;
    } else {
      totalScore += 5;
    }
  } else {
    totalScore += 0; // Unfilled interests
  }

  const finalPercentage = Math.round((totalScore / totalWeight) * 100);
  return finalPercentage;
}
