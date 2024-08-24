"use client";

import { Alert } from "@mui/material";
import { CustomContentProps, SnackbarContent } from "notistack";
import { forwardRef } from "react";

interface TostNotificationProps extends CustomContentProps {
  type?: "error" | "success" | "info" | "warning";
}
export default forwardRef<HTMLDivElement, TostNotificationProps>(
  function TostNotification(props, ref) {
    const { message, type } = props;

    return (
      <SnackbarContent ref={ref}>
        <Alert severity={type}>{message}</Alert>
      </SnackbarContent>
    );
  }
);
