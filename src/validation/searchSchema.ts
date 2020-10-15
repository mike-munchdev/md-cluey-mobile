import * as yup from 'yup';

export default yup.object().shape({
  searchText: yup.string().required('Search text required'),
});
