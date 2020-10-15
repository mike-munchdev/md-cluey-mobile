import * as yup from 'yup';
import schema, { passwordRequirments } from './passwordSchema';

export default yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .test('password-strength', passwordRequirments.join('\n'), (value) => {
      return schema.validate(value);
    }),
});
