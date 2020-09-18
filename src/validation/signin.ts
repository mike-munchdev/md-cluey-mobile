import * as yup from 'yup';

export const signinSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Valid email is required'),
  password: yup.string().required('Password is required'),
});
