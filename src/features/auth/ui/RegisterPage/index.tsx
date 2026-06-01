import React from "react";
import { StepIndicator } from "../components/StepIndicator";
import { AccountStep } from "../steps/AccountStep";
import { PreferencesStep } from "../steps/PreferencesStep";
import { FinancesStep } from "../steps/FinancesStep";
import { useRegisterForm } from "../../model/useRegisterForm";
import styles from "./styles.module.scss";

export const RegisterPage: React.FC = () => {
  const {
    step,
    totalSteps,
    formData,
    isLoading,
    error,
    update,
    toggleArrayItem,
    nextStep,
    prevStep,
    submit,
  } = useRegisterForm();

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}>✈️</span>
          <span className={styles.brandName}>TravelBrain</span>
        </div>

        <StepIndicator currentStep={step} totalSteps={totalSteps} />

        {step === 1 && (
          <AccountStep data={formData} onChange={update} onNext={nextStep} />
        )}
        {step === 2 && (
          <PreferencesStep
            data={formData}
            onChange={update}
            onToggle={toggleArrayItem}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 3 && (
          <FinancesStep
            data={formData}
            onChange={update}
            onSubmit={submit}
            onBack={prevStep}
            isLoading={isLoading}
            error={error}
          />
        )}

        <p className={styles.loginLink}>
          Already have an account?{" "}
          <a href="/login" className={styles.link}>
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};
