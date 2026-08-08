const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SPECIAL_CHAR_REGEX = /[!@#$%^&*(),.?":{}|<>_\-\\[\]/`~+=;']/;

export function validateRegister({ name, email, password }) {
  const errors = {};

  const trimmedName = name.trim();
  if (trimmedName.length < 2) {
    errors.name = "Name must be at least 2 characters long";
  } else if (trimmedName.length > 20) {
    errors.name = "Name cannot exceed 20 characters";
  }

  const trimmedEmail = email.trim();
  if (!trimmedEmail) {
    errors.email = "Please enter a valid email address";
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = "Please enter a valid email address";
  }

  if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  } else if (password.length > 20) {
    errors.password = "Password cannot exceed 20 characters";
  } else if (!/[A-Z]/.test(password)) {
    errors.password = "Password must contain at least one uppercase letter";
  } else if (!/[a-z]/.test(password)) {
    errors.password = "Password must contain at least one lowercase letter";
  } else if (!/[0-9]/.test(password)) {
    errors.password = "Password must contain at least one number";
  } else if (!SPECIAL_CHAR_REGEX.test(password)) {
    errors.password = "Password must contain at least one special character";
  }

  return errors;
}
