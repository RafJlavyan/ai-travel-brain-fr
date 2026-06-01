import React from "react";
import styles from "./styles.module.scss";

const STEP_LABELS = ["Account", "Preferences", "Finances"];

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => (
  <div className={styles.wrapper}>
    {STEP_LABELS.slice(0, totalSteps).map((label, index) => {
      const stepNumber = index + 1;
      const isCompleted = stepNumber < currentStep;
      const isActive = stepNumber === currentStep;

      return (
        <React.Fragment key={label}>
          <div className={styles.step}>
            <div
              className={`${styles.circle} ${
                isCompleted ? styles.completed : ""
              } ${isActive ? styles.active : ""}`}
            >
              {isCompleted ? "✓" : stepNumber}
            </div>
            <span
              className={`${styles.label} ${
                isActive ? styles.activeLabel : ""
              }`}
            >
              {label}
            </span>
          </div>
          {index < totalSteps - 1 && (
            <div
              className={`${styles.line} ${
                isCompleted ? styles.completedLine : ""
              }`}
            />
          )}
        </React.Fragment>
      );
    })}
  </div>
);
