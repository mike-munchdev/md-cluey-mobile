import * as yup from 'yup';

export const resetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Valid email is required'),
});
