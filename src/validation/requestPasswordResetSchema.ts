import * as yup from 'yup';

export default yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Valid email is required'),
});
