import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Auth.css";

const initialLoginForm = {
  email: "",
  password: "",
};

const initialRegisterForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

const Auth = () => {
  const navigate = useNavigate();
  const { isAuthenticated, authLoading, loginUser, registerUser } =
    useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("login");
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (authLoading) {
    return <div className="auth-page">Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/users" replace />;
  }

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterForm((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setFeedbackMessage("");

    if(!isValidEmail(loginForm.email)){
      setFeedbackMessage("Please enter valid email address");
      setSubmitting(false);
    }

    // if(loginForm.password.length < 8){
    //   setFeedbackMessage("Password must be at lease 8 characters");
    //   setSubmitting(false)
    // }

    const result = await loginUser(loginForm);
    setFeedbackMessage(result.message);

    if (result.success) {
      setLoginForm(initialLoginForm);
      navigate("/users");
    }

    setSubmitting(false);
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setFeedbackMessage("");

    if(!registerForm.name.trim()){
      setFeedbackMessage("Full name is required")
      setSubmitting(false)
    }

    if(!isValidEmail(registerForm.email)){
      setFeedbackMessage("Please enter valid email address.")
      setSubmitting(false)
    }

    // if(!registerForm.password.length < 8){
    //   setFeedbackMessage("Password must be at least 8 characters")
    //   setSubmitting(false)
    // }

    if (registerForm.password !== registerForm.confirmPassword) {
      setFeedbackMessage("Passwords do not match.");
      setSubmitting(false);
      return;
    }

    const result = await registerUser(registerForm);
    setFeedbackMessage(result.message);

    if (result.success) {
      setRegisterForm(initialRegisterForm);
      navigate("/users");
    }

    setSubmitting(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-copy">
          <p className="auth-kicker">LeadFlow Manager</p>
          <h1>Login or create your account to manage users.</h1>
          <p className="auth-description">
            Register once, sign in, and then continue to the users dashboard.
          </p>
        </div>

        <div className="auth-panel">
          <div className="auth-tabs">
            <button
              className={activeTab === "login" ? "active" : ""}
              onClick={() => setActiveTab("login")}
              type="button"
            >
              Login
            </button>
            <button
              className={activeTab === "register" ? "active" : ""}
              onClick={() => setActiveTab("register")}
              type="button"
            >
              Register
            </button>
          </div>

          {feedbackMessage ? (
            <p className="auth-feedback">{feedbackMessage}</p>
          ) : null}

          {activeTab === "login" ? (
            <form className="auth-form" onSubmit={handleLoginSubmit}>
              <input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                placeholder="Email address"
                required
              />
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                placeholder="Password"
                required
              />
              <button type="submit" disabled={submitting}>
                {submitting ? "Logging in..." : "Login"}
              </button>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleRegisterSubmit}>
              <input
                type="text"
                name="name"
                value={registerForm.name}
                onChange={handleRegisterChange}
                placeholder="Full name"
                required
              />
              <input
                type="email"
                name="email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                placeholder="Email address"
                required
              />
              <input
                type="password"
                name="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                placeholder="Password"
                minLength="8"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                value={registerForm.confirmPassword}
                onChange={handleRegisterChange}
                placeholder="Confirm password"
                minLength="8"
                required
              />
              <button type="submit" disabled={submitting}>
                {submitting ? "Creating..." : "Create account"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
