export const friendStructure = `{
    id    
    username
    firstName    
    lastName
  }`;
export const friendshipStructure = `{
    id 
    requester ${friendStructure}
    recipient ${friendStructure}    
    status
  }`;
export const companyStructure = `{    
    id
    name
    brandUrl
    brandLogoUrl
    isActive
    categories {
      id
      name
    }
    productTypes {
      id
      name
      isActive
    }
    parentCompanies {
      id
      name     
    }
    politicalContributions {
      id
      cycle
      org_id
      org_name
      total
      democrats
      republicans 
      third_party
      indivs
      indivs_dems
      indivs_repubs
      indivs_third
      pacs
      pacs_dems
      pacs_repubs
      pacs_third
      
    }
  }
  `;
export const responseStructure = `{  
      id      
      company ${companyStructure}
      response  
  }`;
export const userStructure = `{
      id
      email
      username
      firstName
      middleName
      lastName   
      dob
      city
      state
      gender     
      googleId
      facebookId    
      appleId
      isProfilePublic
      mustResetPassword
      isActive
      
  }`;

export const publicUserStructure = `{
    id
    firstName
    lastName
    username
  }`;

export const productsStructure = `{    
    id
    name
    productType {        
        id
        name
    }
    parentCompanies {      
        id
        name
    }
    tags {
        id
        name
    }
    brand {
      id
      name
      brandUrl

    }
  }
`;

export const productTypesStructure = `{    
    id
    name
    isActive 
  }
`;

export const notificationStructure = `{    
    id
    message
    notificationType
    linkId
    isRead
    createdAt
    updatedAt
  }
`;
