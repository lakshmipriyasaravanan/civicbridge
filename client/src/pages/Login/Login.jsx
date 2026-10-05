import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowRight, Lock, Mail, CheckCircle2, UserCheck, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, demoUsers, loginWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Success modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    let timer;
    if (showSuccessModal) {
      timer = setTimeout(() => {
        navigate("/dashboard");
      }, 1800);
    }
    return () => clearTimeout(timer);
  }, [showSuccessModal, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await login({ email, password });
      setLoggedInUser(res?.user || { email, name: email.split("@")[0] });
      setShowSuccessModal(true);
    } catch (err) {
      setError(err.message || "Invalid credentials. Please check your login details.");
      setLoading(false);
    }
  };

  const handleQuickLogin = async (quickEmail) => {
    setError("");
    setLoading(true);
    try {
      let resUser;
      if (loginWithGoogle) {
        resUser = await loginWithGoogle(quickEmail);
      } else {
        const res = await login({ email: quickEmail, password: "userpassword" });
        resUser = res?.user;
      }
      setLoggedInUser(resUser || { email: quickEmail, name: quickEmail.split("@")[0] });
      setShowSuccessModal(true);
    } catch (err) {
      setError(err.message || "Failed to sign in.");
      setLoading(false);
    }
  };

  const handleProceed = () => {
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      {/* Left side art panel - Navy & Blue */}
      <div className="login-art">
        <div className="login-art-content">
          <div className="eyebrow" style={{ color: "#a9c5ff", marginBottom: 16 }}>
            <ShieldCheck size={16} /> CIVICBRIDGE NAVIGATOR
          </div>
          <h1>Discover & Access Schemes Built for You</h1>
          <p>
            An intelligent civic-tech platform connecting citizens to relevant Indian government benefits, financial subsidies, and welfare programs.
          </p>

          <div className="login-bullets">
            <span>
              <CheckCircle2 size={18} />
              Tailored matching across 15+ welfare categories
            </span>
            <span>
              <CheckCircle2 size={18} />
              Instant document readiness checklist & eligibility check
            </span>
            <span>
              <CheckCircle2 size={18} />
              100% free, private & citizen-first guidance
            </span>
          </div>

          <div style={{ marginTop: 40, padding: 20, background: "rgba(255,255,255,0.07)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.12)" }}>
            <p style={{ margin: 0, fontSize: 13, color: "#d1e0ff", lineHeight: 1.6 }}>
              "CivicBridge helped me find government grants and skill development programs that matched my qualifications within minutes."
            </p>
            <span style={{ display: "block", marginTop: 10, fontSize: 11, fontWeight: 700, color: "#8eb1ef" }}>
              — Priya Sharma, Verified Citizen User
            </span>
          </div>
        </div>
      </div>

      {/* Right side form panel - White & Blue */}
      <div className="login-card-wrap">
        <div className="login-card">

          <div className="login-heading">
            <div className="brand" style={{ marginBottom: 20 }}>
              <div className="brand-mark big">
                <ShieldCheck size={24} />
              </div>
              <div>
                <strong>Civic<span>Bridge</span></strong>
                <small>Government Benefit Portal</small>
              </div>
            </div>

            <h2>Welcome Back</h2>
            <p>Login to continue to your CivicBridge dashboard.</p>
          </div>

          {error && (
            <div style={{ display: "flex", gap: 10, alignItems: "center", padding: "12px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, color: "#dc2626", fontSize: 13, marginBottom: 20 }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
            <div className="field">
              <span>Email Address</span>
              <div style={{ position: "relative" }}>
                <Mail size={17} style={{ position: "absolute", left: 14, top: 13, color: "#667085" }} />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: 42, width: "100%" }}
                  required
                />
              </div>
            </div>

            <div className="field">
              <span>Password</span>
              <div style={{ position: "relative" }}>
                <Lock size={17} style={{ position: "absolute", left: 14, top: 13, color: "#667085" }} />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: 42, width: "100%" }}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary full btn-large"
              disabled={loading || showSuccessModal}
              style={{ marginTop: 8 }}
            >
              {loading ? "Logging in..." : "Login to Dashboard"}
              <ArrowRight size={17} />
            </button>
          </form>

          {/* Quick Sign-In Accounts Section */}
          <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
            <p style={{ margin: "0 0 12px", fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Quick 1-Click Sign In
            </p>

            <div style={{ display: "grid", gap: 10 }}>
              {demoUsers && demoUsers.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  className="account-option"
                  onClick={() => handleQuickLogin(u.email)}
                  disabled={loading || showSuccessModal}
                >
                  <div className="avatar">
                    {u.name.charAt(0)}
                  </div>
                  <div>
                    <strong>{u.name}</strong>
                    <span>{u.employment} · {u.state}</span>
                  </div>
                  <UserCheck size={18} className="account-arrow" />
                </button>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: "var(--muted)" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "var(--blue)", fontWeight: 700 }}>
              Create an account
            </Link>
          </div>

        </div>
      </div>

      {/* Login Successful Modal */}
      {showSuccessModal && (
        <div className="modal-backdrop" style={{ animation: "fadeIn 0.2s ease" }}>
          <div
            className="modal"
            style={{
              textAlign: "center",
              padding: "32px 28px",
              maxWidth: "420px",
              boxShadow: "0 25px 50px -12px rgba(11, 31, 58, 0.35)",
              border: "1px solid #dbeafe"
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: "#eff6ff",
                color: "#1457D9",
                display: "grid",
                placeItems: "center",
                margin: "0 auto 20px",
                border: "2px solid #bfdbfe"
              }}
            >
              <CheckCircle2 size={36} color="#1457D9" />
            </div>

            <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800, color: "#0B1F3A" }}>
              Login Successful!
            </h2>

            <p style={{ margin: "0 0 24px", fontSize: 14, color: "#475569", lineHeight: 1.5 }}>
              Welcome back, <strong>{loggedInUser?.name || "Citizen"}</strong>! You have authenticated successfully.
            </p>

            <button
              onClick={handleProceed}
              className="btn btn-primary full"
              style={{
                width: "100%",
                padding: "12px",
                fontSize: 14,
                fontWeight: 700,
                borderRadius: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 8
              }}
            >
              <span>Continue to Dashboard</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;