import React from "react";
import { FormField } from "../../components/FormField";
import type { RegisterFormData } from "../../../model/auth.types";
import {
  Climate,
  TravelStyle,
  GroupType,
  ACTIVITIES,
  REGIONS,
} from "../../../model/enums";
import styles from "./styles.module.scss";

interface PreferencesStepProps {
  data: RegisterFormData;
  onChange: (fields: Partial<RegisterFormData>) => void;
  onToggle: (
    field: "preferredActivities" | "preferredRegions",
    value: string
  ) => void;
  onNext: () => void;
  onBack: () => void;
}

const CLIMATE_OPTIONS = [
  { value: Climate.TROPICAL, label: "🌴 Tropical" },
  { value: Climate.COLD, label: "❄️ Cold" },
  { value: Climate.DRY, label: "☀️ Dry" },
  { value: Climate.MODERATE, label: "🌤️ Moderate" },
];

const STYLE_OPTIONS = [
  { value: TravelStyle.ADVENTURE, label: "🧗 Adventure" },
  { value: TravelStyle.RELAXATION, label: "🧘 Relaxation" },
  { value: TravelStyle.CULTURAL, label: "🏛️ Cultural" },
  { value: TravelStyle.BUSINESS, label: "💼 Business" },
  { value: TravelStyle.NIGHTLIFE, label: "🎉 Nightlife" },
];

const GROUP_OPTIONS = [
  { value: GroupType.SOLO, label: "🧍 Solo" },
  { value: GroupType.COUPLE, label: "👫 Couple" },
  { value: GroupType.FAMILY, label: "👨‍👩‍👧 Family" },
  { value: GroupType.FRIENDS, label: "👥 Friends" },
];

export const PreferencesStep: React.FC<PreferencesStepProps> = ({
  data,
  onChange,
  onToggle,
  onNext,
  onBack,
}) => (
  <div className={styles.wrapper}>
    <div className={styles.header}>
      <h2 className={styles.title}>Your travel style</h2>
      <p className={styles.subtitle}>Help us find your perfect destinations</p>
    </div>

    <FormField label="Preferred Climate">
      <div className={styles.chipGrid}>
        {CLIMATE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`${styles.chip} ${
              data.preferredClimate === opt.value ? styles.chipActive : ""
            }`}
            onClick={() => onChange({ preferredClimate: opt.value })}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </FormField>

    <FormField label="Travel Style">
      <div className={styles.chipGrid}>
        {STYLE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`${styles.chip} ${
              data.travelStyle === opt.value ? styles.chipActive : ""
            }`}
            onClick={() => onChange({ travelStyle: opt.value })}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </FormField>

    <FormField label="Travel Group">
      <div className={styles.chipGrid}>
        {GROUP_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`${styles.chip} ${
              data.groupType === opt.value ? styles.chipActive : ""
            }`}
            onClick={() => onChange({ groupType: opt.value })}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </FormField>

    <FormField label="Preferred Activities (pick multiple)">
      <div className={styles.chipGrid}>
        {ACTIVITIES.map((activity) => (
          <button
            key={activity}
            type="button"
            className={`${styles.chip} ${
              data.preferredActivities.includes(activity)
                ? styles.chipActive
                : ""
            }`}
            onClick={() => onToggle("preferredActivities", activity)}
          >
            {activity}
          </button>
        ))}
      </div>
    </FormField>

    <FormField label="Preferred Regions (pick multiple)">
      <div className={styles.chipGrid}>
        {REGIONS.map((region) => (
          <button
            key={region}
            type="button"
            className={`${styles.chip} ${
              data.preferredRegions.includes(region) ? styles.chipActive : ""
            }`}
            onClick={() => onToggle("preferredRegions", region)}
          >
            {region}
          </button>
        ))}
      </div>
    </FormField>

    <div className={styles.actions}>
      <button className={styles.backBtn} onClick={onBack}>
        Back
      </button>
      <button className={styles.nextBtn} onClick={onNext}>
        Continue
      </button>
    </div>
  </div>
);
