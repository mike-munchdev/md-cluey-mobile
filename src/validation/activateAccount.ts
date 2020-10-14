import * as yup from 'yup';

export default yup.object().shape({
  confirmToken: yup.string().required('Confirm token required'),
});
