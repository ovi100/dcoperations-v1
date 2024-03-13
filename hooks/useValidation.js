import { useState } from "react";

const useValidation = (type, value) => {
  const [error, setError] = useState(null);

  if (type === "email") {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
      setError("invalid email address");
    } else {
      setError(null);
    }
  } else {
    if (!value) {
      setError(`${type} is required`);
    } else {
      setError(null);
    }
  }

  return  error;
};

export default useValidation;
