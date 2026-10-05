import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowRight, Lock, Mail, User, CheckCircle2, AlertCircle, MailCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Success modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  useEffect(() => {
    let timer;
    if (showSuccessModal) {
      timer = setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
    }
    return () => clearTimeout(timer);
  }, [showSuccessModal, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await register({
        name,
        email,
        password,
      });

      setRegisteredUser(res?.user || { name, email });
      setShowSuccessModal(true);
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
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
          <h1>Create Your Account & Start Exploring</h1>
          <p>
            Join CivicBridge to receive personalized government scheme recommendations, track required documents, and calculate eligibility in seconds.
          </p>

          <div className="login-bullets">
            <span>
              <CheckCircle2 size={18} />
              Custom recommendations based on age, income & region
            </span>
            <span>
              <CheckCircle2 size={18} />
              Save up to 10 schemes for offline application prep
            </span>
            <span>
              <CheckCircle2 size={18} />
              Free, secure, and privacy-protected experience
            </span>
          </div>

          <div style={{ marginTop: 40, padding: 20, background: "rgba(255,255,255,0.07)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.12)" }}>
            <p style={{ margin: 0, fontSize: 13, color: "#d1e0ff", lineHeight: 1.6 }}>
              "CivicBridge simplified my scheme search and showed me exactly which documents I needed before visiting the portal."
            </p>
            <span style={{ display: "block", marginTop: 10, fontSize: 11, fontWeight: 700, color: "#8eb1ef" }}>
              — Arun Kumar, Verified Citizen User
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

            <h2>Create Account</h2>
            <p>Create your CivicBridge account to get started.</p>
          </div>

          {error && (
            <div style={{ display: "flex", gap: 10, alignItems: "center", padding: "12px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, color: "#dc2626", fontSize: 13, marginBottom: 20 }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
            <div className="field">
              <span>Full Name</span>
              <div style={{ position: "relative" }}>
                <User size={17} style={{ position: "absolute", left: 14, top: 13, color: "#667085" }} />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ paddingLeft: 42, width: "100%" }}
                  required
                />
              </div>
            </div>

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
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: 42, width: "100%" }}
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary full btn-large"
              disabled={loading || showSuccessModal}
              style={{ marginTop: 8 }}
            >
              {loading ? "Creating Account..." : "Create Account"}
              <ArrowRight size={17} />
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: 28, fontSize: 13, color: "var(--muted)" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--blue)", fontWeight: 700 }}>
              Login
            </Link>
          </div>

        </div>
      </div>

      {/* Registration Successful Modal */}
      {showSuccessModal && (
        <div className="modal-backdrop" style={{ animation: "fadeIn 0.2s ease" }}>
          <div
            className="modal"
            style={{
              textAlign: "center",
              padding: "32px 28px",
              maxWidth: "440px",
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
              Registration Successful!
            </h2>

            <p style={{ margin: "0 0 18px", fontSize: 14, color: "#475569", lineHeight: 1.5 }}>
              Welcome to CivicBridge, <strong>{registeredUser?.name || "Citizen"}</strong>! Your account has been created.
            </p>

            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: "14px 16px",
                marginBottom: 24,
                textAlign: "left",
                display: "flex",
                gap: 12,
                alignItems: "center"
              }}
            >
              <MailCheck size={28} style={{ color: "#1457D9", flexShrink: 0 }} />
              <div style={{ fontSize: 12, color: "#334155", lineHeight: 1.4 }}>
                <strong style={{ display: "block", color: "#0f172a", marginBottom: 2 }}>
                  Welcome Confirmation Mail Sent
                </strong>
                A registration confirmation email has been dispatched to <strong>{registeredUser?.email}</strong>.
              </div>
            </div>

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

export default Register;