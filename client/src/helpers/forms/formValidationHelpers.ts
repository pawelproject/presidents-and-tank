import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

export const checkRequired = (value: string | undefined) => {
  if (!value) {
    return `required`;
  }
  return undefined;
};

export const checkLength = (
  value: string | undefined,
  min: number,
  max: number
) => {
  if (!value || value.length < min || value.length > max) {
    return `must be between ${min} and ${max} characters`;
  }

  return undefined;
};

export const checkNumber = (
  value: number | string | undefined,
  min: number,
  max: number = Infinity
) => {
  const number = value ? +value : NaN;
  let message = `must be a number between ${min} and ${max}`;
  if (min === 1 && max === Infinity) {
    message = "Must be a positive integer number";
  }
  if (
    !value ||
    !Number.isInteger(number) ||
    isNaN(number) ||
    number < min ||
    number > max
  ) {
    return message;
  }

  return undefined;
};

export const checkDate = (value: string | undefined, min: Date, max: Date) => {
  const date = value ? new Date(value) : new Date();
  const message = `must be between ${min.toISOString().split("T")[0]} and ${
    max.toISOString().split("T")[0]
  }`;

  if (!value || date < min || date > max) {
    return message;
  }

  return undefined;
};

export const checkPassword = (value: string | undefined) => {
  const isPasswordCorrect = isStrongPassword("" + value, {
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 0,
    minLowercase: 0,
    minLength: 0,
  });

  if (!isPasswordCorrect) {
    return "must contain a number and special character";
  }

  return undefined;
};

export const checkEmail = (value: string | undefined) => {
  const isEmailCorrect = isEmail("" + value);

  if (!isEmailCorrect) {
    return "invalid email address";
  }

  return undefined;
};
