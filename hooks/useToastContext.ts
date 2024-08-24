import ToastContext from "@/context/ToastContext";
import { useContext } from "react";

export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within an ToastProvider");
  }
  return context;
}
