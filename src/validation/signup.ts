import * as yup from 'yup';
import schema, { passwordRequirments } from './passwordSchema';

export default yup.object().shape({
  email: yup
    .string()
    .email('Valid email is required')
    .required('Email is required'),
  // password: yup
  //   .string()
  //   .required('Password is required')
  //   .test('password-strength', passwordRequirments.join('\n'), (value) => {
  //     return schema.validate(value);
  //   }),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
});
