"use client";
import ToastContext from "./ToastContext";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import ToastNotification from "@/component/toast/ToastNotification";
import { ToastContextType, ToastType } from "@/lib/types/tostType";

function ToastProvider(props: any) {
  const { children } = props;

  const success = ({ message, duration }: ToastType) => {
    enqueueSnackbar(message, {
      variant: "tostNotification",
      autoHideDuration: duration,
      type: "success",
    });
  };
  const error = ({ message, duration }: ToastType) => {
    enqueueSnackbar(message, {
      variant: "tostNotification",
      autoHideDuration: duration,
      type: "error",
    });
  };
  const info = ({ message, duration }: ToastType) => {
    enqueueSnackbar(message, {
      variant: "tostNotification",
      autoHideDuration: duration,
      type: "info",
    });
  };
  const warning = ({ message, duration }: ToastType) => {
    enqueueSnackbar(message, {
      variant: "tostNotification",
      autoHideDuration: duration,
      type: "warning",
    });
  };

  const value: ToastContextType = { success, warning, info, error };
  return (
    <ToastContext.Provider value={value}>
      <SnackbarProvider
        maxSnack={5}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        Components={{
          // default: ToastNotification,
          // success: TostNotification,
          // error: TostNotification,
          // warning: TostNotification,
          tostNotification: ToastNotification,
        }}
      />

      {children}
    </ToastContext.Provider>
  );
}
export default ToastProvider;
