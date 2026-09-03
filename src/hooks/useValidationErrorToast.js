import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const showError = (errors, lastError, toast) => {
  if (!errors || Object.keys(errors).length === 0) return;

  const errMsg = Object.values(errors)[0].message;

  if (errMsg) {
    const msg = errMsg.replaceAll('"', '');

    if (
      lastError.current !== errMsg
    ) {
      toast.error(msg);
      lastError.current = errMsg; // ✅ remember last shown error key
    }
  }
};

export const useValidationErrorToast = (errors) => {
  const lastError = useRef(null);

  useEffect(() => {
    // this shows forms errors based on joi validation
    showError(errors, lastError, toast);
  }, [errors]);
};
