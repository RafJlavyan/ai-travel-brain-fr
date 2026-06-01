import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth.api";
import type { RegisterFormData } from "./auth.types";
import { Climate, TravelStyle, BudgetRange, GroupType } from "./enums";

const INITIAL_DATA: RegisterFormData = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  preferredClimate: Climate.MODERATE,
  travelStyle: TravelStyle.RELAXATION,
  preferredActivities: [],
  preferredRegions: [],
  groupType: GroupType.SOLO,
  budgetRange: BudgetRange.MID_RANGE,
  currency: "USD",
  homeCountry: "",
};

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(() => {
    const savedStep = sessionStorage.getItem("register_form_step");
    return savedStep ? Math.max(1, Math.min(Number(savedStep), 3)) : 1;
  });

  const [formData, setFormData] = useState<RegisterFormData>(() => {
    const savedData = sessionStorage.getItem("register_form_data");
    if (savedData) {
      try {
        return { ...INITIAL_DATA, ...JSON.parse(savedData) };
      } catch {
        return INITIAL_DATA;
      }
    }
    return INITIAL_DATA;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = 3;

  useEffect(() => {
    sessionStorage.setItem("register_form_data", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    sessionStorage.setItem("register_form_step", String(step));
  }, [step]);

  const update = (fields: Partial<RegisterFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const toggleArrayItem = (
    field: "preferredActivities" | "preferredRegions",
    value: string
  ) => {
    setFormData((prev) => {
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(value)
          ? arr.filter((i) => i !== value)
          : [...arr, value],
      };
    });
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const submit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { confirmPassword, ...payload } = formData;
      const response = await authApi.register(payload);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      
      sessionStorage.removeItem("register_form_data");
      sessionStorage.removeItem("register_form_step");
      
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
};
