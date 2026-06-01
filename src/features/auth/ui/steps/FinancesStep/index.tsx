import React from "react";
import { Loader2 } from "lucide-react";
import { FormField } from "../../components/FormField";
import type { RegisterFormData } from "../../../model/auth.types";
import { BudgetRange, CURRENCIES } from "../../../model/enums";
import styles from "./styles.module.scss";

interface FinancesStepProps {
  data: RegisterFormData;
  onChange: (fields: Partial<RegisterFormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
}

const BUDGET_OPTIONS = [
  { value: BudgetRange.BUDGET, label: "🎒 Budget", desc: "Under $100/night" },
  {
    value: BudgetRange.MID_RANGE,
    label: "✈️ Mid-Range",
    desc: "$100–$300/night",
  },
  { value: BudgetRange.LUXURY, label: "💎 Luxury", desc: "$300+/night" },
];

export const FinancesStep: React.FC<FinancesStepProps> = ({
  data,
  onChange,
  onSubmit,
  onBack,
  isLoading,
  error,
}) => (
  <div className={styles.wrapper}>
    <div className={styles.header}>
      <h2 className={styles.title}>Budget & location</h2>
      <p className={styles.subtitle}>
        We'll match hotels to your financial comfort zone
      </p>
    </div>

    <FormField label="Budget Range">
      <div className={styles.budgetGrid}>
        {BUDGET_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`${styles.budgetCard} ${
              data.budgetRange === opt.value ? styles.budgetActive : ""
            }`}
            onClick={() => onChange({ budgetRange: opt.value })}
          >
            <span className={styles.budgetLabel}>{opt.label}</span>
            <span className={styles.budgetDesc}>{opt.desc}</span>
          </button>
        ))}
      </div>
    </FormField>

    <div className={styles.row}>
      <FormField label="Home Country">
        <input
          className={styles.input}
          placeholder="e.g. Armenia"
          value={data.homeCountry}
          onChange={(e) => onChange({ homeCountry: e.target.value })}
        />
      </FormField>

      <FormField label="Currency">
        <select
          className={styles.select}
          value={data.currency}
          onChange={(e) => onChange({ currency: e.target.value })}
        >
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </FormField>
    </div>

    {error && <p className={styles.error}>{error}</p>}

    <div className={styles.actions}>
      <button className={styles.backBtn} onClick={onBack} disabled={isLoading}>
        Back
      </button>
      <button
        className={styles.submitBtn}
        onClick={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 size={18} className={styles.spinner} />
        ) : (
          "Create Account"
        )}
      </button>
    </div>
  </div>
);
