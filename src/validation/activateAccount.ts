import * as yup from 'yup';

export const activateAccountSchema = yup.object().shape({
  confirmToken: yup.string().required('Confirm token require'),
});
