export type ToastType = {
  message: string;
  duration?: number;
};
export interface ToastContextType {
  success: ({ message, duration }: ToastType) => void;
  warning: ({ message, duration }: ToastType) => void;
  info: ({ message, duration }: ToastType) => void;
  error: ({ message, duration }: ToastType) => void;
}

declare module "notistack" {
  interface VariantOverrides {
    tostNotification: {
      type?: "error" | "success" | "info" | "warning";
    };
  }
}
