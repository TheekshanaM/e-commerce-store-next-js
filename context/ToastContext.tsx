import { ToastContextType } from "@/lib/types/tostType";
import { createContext } from "react";

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export default ToastContext;
