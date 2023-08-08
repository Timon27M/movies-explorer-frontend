import React, { useCallback } from "react";

//хук валидации формы
function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [isVaildEmail, setIsValidEmail] = React.useState(false);
  const sampleEmail =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    if (name === "email") {
      if (!sampleEmail.test(value)) {
        setIsValidEmail(false);
        setErrors({ ...errors, [name]: "Некорректный email" });
        setIsValid(false)
      } else {
        setIsValidEmail(true);
        setErrors({ ...errors, [name]: "" });
        setIsValid(target.closest("form").checkValidity())
      }
    } else {
      setErrors({ ...errors, [name]: target.validationMessage });
      setIsValid(isVaildEmail && target.closest("form").checkValidity());
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
    setIsValidEmail
  };
}

export default useFormWithValidation;
