export const formValidation = (formState: Record<string, any>) => {
  const errors: Record<string, string> = {};

  Object.keys(formState)
    .filter(
      (key: string) =>
        key !== 'id' && key !== 'ownerEmail' && key !== 'pictureUrl'
    )
    .forEach((key) => {
      switch (key) {
        case 'picture':
          errors[key] = !formState[key] ? 'Field is mandatory' : '';
          break;
        case 'repassword':
          if (formState.repassword !== formState.password) {
            errors[key] = 'Passwords must match';
          }
          break;
        default:
          errors[key] =
            formState[key]?.length < 3
              ? 'The field must contain at least 3 symbols'
              : '';
      }
    });

  const hasErrors = Object.values(errors).some((value) => value);

  return { errors, hasErrors };
};
