import * as yup from 'yup';

export const searchSchema = yup.object().shape({
  searchText: yup.string().required('Search text required'),
});
