const passwordValidator = require('password-validator');

// Create a schema
const schema = new passwordValidator();

// Add properties to it
schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(20) // Maximum length 20
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(['Passw0rd', 'Password123']);

export const passwordRequirments = [
  'At least 8 characters',
  'No more than 20 characters',
  'At least 1 uppercase letter',
  'At least 1 lowercase letter',
  'At least 2 lowercase letter',
  'No spaces',
];
export default schema;
