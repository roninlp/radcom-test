import { useState } from "react";
import { FormErrors, FormInputs, InputName } from "./types";

export const useForm = () => {
  const [inputs, setInputs] = useState<FormInputs>({
    width: 0,
    height: 0,
  });

  const [errors, setErrors] = useState<FormErrors>({
    width: [],
    height: [],
  });

  function handleChangeInputs(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value);
    const name = e.target.name as InputName;
    const tempErrors: string[] = [];
    if (isNaN(value)) {
      tempErrors.push(`لطفا عدد وارد کنید`);
    }
    if (value % 2 === 0) {
      tempErrors.push(`لطفا عدد فرد وارد کنید`);
    }
    if (value < 3) {
      tempErrors.push(`لطفا عدد بزرگتر از 3 وارد کنید`);
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: [...tempErrors],
    }));
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  return {
    inputs,
    errors,
    handleChangeInputs,
  };
};
