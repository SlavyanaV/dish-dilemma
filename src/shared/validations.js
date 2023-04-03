export const formValidation = (formState) => {
  const errors = {};

  Object.keys(formState).forEach((key) => {
    errors[key] =
      formState[key].length < 3
        ? 'The field must contain at least 3 symbols'
        : '';
    if (key === 'repassword' && formState.repassword !== formState.password) {
      errors[key] = 'Passwords must match';
    }
  });

  const hasErrors = Object.values(errors).some((value) => value);

  return { errors, hasErrors };
};
