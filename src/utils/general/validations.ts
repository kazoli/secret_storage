import { IntlShape } from 'react-intl';
import validator from 'validator';
import { defaultMessages } from '../../providers/TranslationProvider';

// Validate the password is strong enough
export const validatePassword = (
  getElement: () => string,
  value: string,
  minLength: number,
  maxLength: number,
  translate: IntlShape['formatMessage'],
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
    : translate(defaultMessages.common.passwordFormError, {
        element: getElement(),
        minLength,
        maxLength,
      });
};

// Validate data input field length
export const validateInputLength = (
  getElement: () => string,
  value: string,
  minLength: number,
  maxLength: number,
  translate: IntlShape['formatMessage'],
) => {
  const length = value.length;
  return length >= minLength && length <= maxLength
    ? ''
    : translate(defaultMessages.common.inputLengthError, {
        element: getElement(),
        minLength,
        maxLength,
      });
};

const validations = {
  validatePassword,
  validateInputLength,
};

export default validations;
