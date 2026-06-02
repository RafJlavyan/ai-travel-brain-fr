import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { FormField } from "../components/FormField";
import { authApi } from "../../api/auth.api";
import styles from "./styles.module.scss";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ email?: string; password?: string }>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = () => {
    const errors: typeof validationErrors = {};
    if (!email.trim() || !email.includes("@")) {
      errors.email = "Valid email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setApiError(null);

    try {
      const response = await authApi.login(email, password);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      navigate("/");
    } catch (err: any) {
      setApiError(err?.response?.data?.message ?? "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}>✈️</span>
          <span className={styles.brandName}>TravelBrain</span>
        </div>

        <div className={styles.header}>
          <h2 className={styles.title}>Welcome back</h2>
          <p className={styles.subtitle}>Sign in to your TravelBrain account</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <FormField label="Email" error={validationErrors.email}>
            <input
              className={styles.input}
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </FormField>

          <FormField label="Password" error={validationErrors.password}>
            <div className={styles.passwordWrapper}>
              <input
                className={styles.input}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword((p) => !p)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </FormField>

          {apiError && <div className={styles.apiError}>{apiError}</div>}

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className={styles.registerLink}>
          Don't have an account?{" "}
          <a href="/register" className={styles.link}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};
