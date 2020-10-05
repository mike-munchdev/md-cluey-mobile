import gql from 'graphql-tag';
import { ApolloError } from 'apollo-client';
import { AlertHelper } from '../../../utils/alert';
import Bugsnag from '@bugsnag/expo';

export const companyStructure = `{    
    id
    name
    brandUrl
    brandLogoUrl     
    parentCompanies {
      id
      name
      politicalContributions {
        id
        cycle
        orgId
        subsidiaryId
        subsidiary
        total
        indivs
        pacs
        democrats
        republicans
        thirdParty
      }
    }
  }
`;

export const GET_COMPANIES_BY_NAME = gql`
  query GetCompaniesByName($name: String!, $exact: Boolean) {
    getCompaniesByName(name: $name, exact: $exact) {
      ok
      companies ${companyStructure}
      error {        
        message
      }
      searchText
    }
  }
`;

export const getCompaniesByNameError = (
  setCompanies: Function,
  setLoading: Function
) => (e: ApolloError) => {
  setLoading(false);
  setCompanies([]);
  AlertHelper.show('error', 'Error', 'An error occurred. Please try again.');
};

export const getCompaniesByNameCompleted = (
  setCompanies: Function,
  setLoading: Function,
  setCache: Function,
  cache: any
) => async ({ getCompaniesByName }) => {
  const { ok, companies, error, searchText } = getCompaniesByName;
  setLoading(false);
  if (ok) {
    if (searchText) setCache({ ...cache, [searchText]: companies });
    setCompanies(companies);
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
};

export const GET_COMPANIES_BY_CATEGORY = gql`
  query GetCompaniesByCategory($id: String!) {
    getCompaniesByCategory(id: $id) {
      ok
      companies ${companyStructure}
      error {        
        message
      }     
    }
  }
`;

export const getCompaniesByCategoryError = (
  setCompanies: Function,
  setFilteredList: Function,
  setLoading: Function
) => (e: ApolloError) => {
  setLoading(false);
  setCompanies([]);
  setFilteredList([]);
  AlertHelper.show('error', 'Error', 'An error occurred. Please try again.');
};

export const getCompaniesByCategoryCompleted = (
  setCompanies: Function,
  setFilteredList: Function,
  setLoading: Function
) => async ({ getCompaniesByCategory }) => {
  const { ok, companies, error } = getCompaniesByCategory;
  setLoading(false);
  if (ok) {
    setCompanies(companies);
    setFilteredList(companies);
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
};

export const GET_COMPANIES_BY_PRODUCT_TYPE = gql`
  query GetCompaniesByProductType($id: String!) {
    getCompaniesByProductType(id: $id) {
      ok
      companies ${companyStructure}
      error {        
        message
      }     
    }
  }
`;

export const getCompaniesByProductTypeError = (
  setCompanies: Function,
  setFilteredList: Function,
  setLoading: Function
) => (e: ApolloError) => {
  setLoading(false);
  setCompanies([]);
  setFilteredList([]);
  AlertHelper.show('error', 'Error', 'An error occurred. Please try again.');
};

export const getCompaniesByProductTypeCompleted = (
  setCompanies: Function,
  setFilteredList: Function,
  setLoading: Function
) => async ({ getCompaniesByProductType }) => {
  const { ok, companies, error } = getCompaniesByProductType;
  setLoading(false);
  if (ok) {
    setCompanies(companies);
    setFilteredList(companies);
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
};

export const GET_COMPANY_BY_ID = gql`
  query GetCompanyById($id: String!) {
    getCompanyById(id: $id) {
      ok
      company ${companyStructure}
      error {        
        message
      }     
    }
  }
`;

export const getCompanyByIdError = (
  setCompany: Function,
  setLoading: Function
) => (e: ApolloError) => {
  setLoading(false);
  setCompany(null);

  AlertHelper.show('error', 'Error', 'An error occurred. Please try again.');
};

export const getCompanyByIdCompleted = (
  setCompany: Function,

  setLoading: Function
) => async ({ getCompanyById }) => {
  const { ok, company, error } = getCompanyById;
  setLoading(false);
  if (ok) {
    // console.log('getCompanyByIdCompleted', company);
    setCompany(company);
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
};
