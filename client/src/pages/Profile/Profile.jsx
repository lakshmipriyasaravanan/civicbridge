import React, { useEffect, useState } from 'react';
import { Save, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Button from '../../components/common/Button';
import ProgressBar from '../../components/common/ProgressBar';
import { calculateProfileCompleteness } from '../../utils/profileUtils';

export default function Profile() {
  const { profile, updateProfile } = useApp();
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(profile);
  }, [profile]);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const completeness = calculateProfileCompleteness(form);

  const submit = async (e) => {
    e.preventDefault();
    await updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div>
      <div className="page-heading">
        <div>
          <span className="eyebrow">MY PROFILE</span>
          <h1>My benefit eligibility profile</h1>
          <p>This information powers your personalized scheme discovery.</p>
        </div>
        <div className="profile-progress">
          <strong>{completeness}%</strong>
          <ProgressBar value={completeness}/>
          <span>Profile complete</span>
        </div>
      </div>

      <form onSubmit={submit} className="profile-form">
        <Section title="Personal information">
          <Field label="Full name" value={form.name} onChange={(v) => set('name', v)}/>
          <Field label="Email" value={form.email} onChange={(v) => set('email', v)}/>
          <Field label="Age" type="number" value={form.age} onChange={(v) => set('age', v ? Number(v) : '')}/>
          <Field label="Gender" value={form.gender || ''} onChange={(v) => set('gender', v)} placeholder="Select gender"/>
        </Section>

        <Section title="Location">
          <Field label="State" value={form.state || ''} onChange={(v) => set('state', v)}/>
          <Field label="District" value={form.district || ''} onChange={(v) => set('district', v)}/>
          <Field label="City / Town / Village" value={form.city || ''} onChange={(v) => set('city', v)}/>
          <Field label="Rural / Urban" value={form.residence || ''} onChange={(v) => set('residence', v)}/>
        </Section>

        <Section title="Education & employment">
          <Field label="Current education" value={form.education || ''} onChange={(v) => set('education', v)}/>
          <Field label="Student status" value={form.studentStatus || ''} onChange={(v) => set('studentStatus', v)}/>
          <Field label="Employment status" value={form.employment || ''} onChange={(v) => set('employment', v)}/>
          <Field label="Occupation" value={form.occupation || ''} onChange={(v) => set('occupation', v)}/>
        </Section>

        <Section title="Financial & household">
          <Field label="Annual household income (₹)" type="number" value={form.annualIncome} onChange={(v) => set('annualIncome', v ? Number(v) : '')}/>
          <Field label="Income source" value={form.incomeSource || ''} onChange={(v) => set('incomeSource', v)}/>
          <Field label="Household size" type="number" value={form.householdSize} onChange={(v) => set('householdSize', v ? Number(v) : '')}/>
          <Field label="Dependents" type="number" value={form.dependents} onChange={(v) => set('dependents', v ? Number(v) : '')}/>
        </Section>

        <Section title="Scheme interests">
          <div className="interest-grid profile-interests">
            {[
              'Education',
              'Employment',
              'Entrepreneurship',
              'Agriculture',
              'Housing',
              'Healthcare',
              'Skill Development',
              'Financial Assistance',
              'Family Welfare',
              'Senior Citizen Support'
            ].map((x) => {
              const active = (form.interests || []).includes(x);
              return (
                <button
                  type="button"
                  key={x}
                  className={active ? 'interest active' : 'interest'}
                  onClick={() =>
                    set('interests', active ? form.interests.filter((i) => i !== x) : [...(form.interests || []), x])
                  }
                >
                  {x}
                </button>
              );
            })}
          </div>
        </Section>

        <div className="profile-actions">
          <div className="privacy-note">
            <ShieldCheck size={18}/>
            <span>Only collect information needed to improve benefit guidance. Profile data is securely saved.</span>
          </div>
          <Button type="submit">
            <Save size={16}/>
            {saved ? 'Saved' : 'Save profile'}
          </Button>
        </div>
      </form>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="form-section">
      <h2>{title}</h2>
      <div className="form-grid">{children}</div>
    </section>
  );
}

function Field({ label, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type={type}
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
