import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FormField } from "../../components/FormField";
import type { RegisterFormData } from "../../../model/auth.types";
import styles from "./styles.module.scss";

interface AccountStepProps {
  data: RegisterFormData;
  onChange: (fields: Partial<RegisterFormData>) => void;
  onNext: () => void;
}

export const AccountStep: React.FC<AccountStepProps> = ({
  data,
  onChange,
  onNext,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormData, string>>
  >({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!data.firstName.trim()) newErrors.firstName = "First name is required";
    if (!data.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!data.email.includes("@")) newErrors.email = "Valid email is required";
    if (data.password.length < 6) newErrors.password = "Min 6 characters";
    if (data.password !== data.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Create your account</h2>
        <p className={styles.subtitle}>Start your journey with TravelBrain</p>
      </div>

      <div className={styles.row}>
        <FormField label="First Name" error={errors.firstName}>
          <input
            className={styles.input}
            placeholder="John"
            value={data.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
          />
        </FormField>
        <FormField label="Last Name" error={errors.lastName}>
          <input
            className={styles.input}
            placeholder="Doe"
            value={data.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
          />
        </FormField>
      </div>

      <FormField label="Email" error={errors.email}>
        <input
          className={styles.input}
          type="email"
          placeholder="john@example.com"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
        />
      </FormField>

      <FormField label="Password" error={errors.password}>
        <div className={styles.passwordWrapper}>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            placeholder="Min 6 characters"
            value={data.password}
            onChange={(e) => onChange({ password: e.target.value })}
          />
          <button
            type="button"
            className={styles.eyeBtn}
            onClick={() => setShowPassword((p) => !p)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </FormField>

      <FormField label="Confirm Password" error={errors.confirmPassword}>
        <input
          className={styles.input}
          type="password"
          placeholder="Repeat password"
          value={data.confirmPassword}
          onChange={(e) => onChange({ confirmPassword: e.target.value })}
        />
      </FormField>

      <button className={styles.nextBtn} onClick={handleNext}>
        Continue
      </button>
    </div>
  );
};
