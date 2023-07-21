import validator from 'validator';

// Validate the password is strong enough
export const validatePassword = (
  element: string,
  value: string,
  minLength: number,
  maxLength: number,
) => {
  const result =
    value.length <= maxLength &&
    validator.isStrongPassword(value, {
      minLength: minLength,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
      returnScore: false,
    });
  return result
    ? ''
    : `${element} needs to be between ${minLength} and ${maxLength} characters long and contains at least a lower and upper case letter and a number`;
};

// Validate data input field
export const validateInput = (
  element: string,
  value: string,
  minLength: number,
  maxLength: number,
) => {
  const length = value.length;
  return length >= minLength && length <= maxLength
    ? ''
    : `${element} needs to be between ${minLength} and ${maxLength} characters long`;
};

const validations = {
  validatePassword,
  validateInput,
};

export default validations;
