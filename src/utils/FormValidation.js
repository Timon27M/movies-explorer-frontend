import React, { useCallback } from "react";

//хук валидации формы
function useFormWithValidation(userData) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [isValidName, setIsValidName] = React.useState(false);
  const [isValidEmail, setIsValidEmail] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  // const handleChangeProfile = (event) => {
  //   const target = event.target;
  //   const name = target.name;
  //   const value = target.value;
  //   setValues({ ...values, [name]: value });
  //   setErrors({ ...errors, [name]: target.validationMessage });
  //   setIsValid(target.closest("form").checkValidity());
  //   if (name === 'name') {
  //     if (value !== userData.name) {
  //       // setIsValid(target.closest("form").checkValidity());
  //       setIsValidName(true)
  //     } else {
  //       setIsValidName(false)
  //     }
  //   } else if (name === 'email') {
  //     if (value !== userData.email) {
  //       setIsValidEmail(true);
  //     } else {
  //       setIsValidEmail(false)
  //     }
  //     }
  // }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid, };
}

export default useFormWithValidation;
