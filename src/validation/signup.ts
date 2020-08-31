import * as yup from 'yup';

export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email('Valid email is required')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
});
