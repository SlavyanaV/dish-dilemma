export const formValidation = (formState: Record<string, any>) => {
  const errors: Record<string, string> = {};

  Object.keys(formState)
    .filter((key: string) => key !== 'id')
    .forEach((key) => {
      errors[key] =
        formState[key]?.length < 3
          ? 'The field must contain at least 3 symbols'
          : '';
      if (key === 'repassword' && formState.repassword !== formState.password) {
        errors[key] = 'Passwords must match';
      }
    });

  const hasErrors = Object.values(errors).some((value) => value);

  return { errors, hasErrors };
};
