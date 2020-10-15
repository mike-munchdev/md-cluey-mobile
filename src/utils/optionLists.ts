import usaCities from './usaCities';

export const genderOptions = [
  { name: 'Male', value: 'male' },
  { name: 'Female', value: 'female' },
  { name: 'Other', value: 'other' },
];

export const states = [
  { code: 'AL', state: 'Alabama', numericCode: '01' },
  { code: 'AK', state: 'Alaska', numericCode: '02' },
  { code: 'AZ', state: 'Arizona', numericCode: '04' },
  { code: 'AR', state: 'Arkansas', numericCode: '05' },
  { code: 'CA', state: 'California', numericCode: '06' },
  { code: 'CO', state: 'Colorado', numericCode: '08' },
  { code: 'CT', state: 'Connecticut', numericCode: '09' },
  { code: 'DE', state: 'Delaware', numericCode: '10' },
  { code: 'DC', state: 'Washington D.C.', numericCode: '11' },
  { code: 'FL', state: 'Florida', numericCode: '12' },
  { code: 'GA', state: 'Georgia', numericCode: '13' },
  { code: 'HI', state: 'Hawaii', numericCode: '15' },
  { code: 'ID', state: 'Idaho', numericCode: '16' },
  { code: 'IL', state: 'Illinois', numericCode: '17' },
  { code: 'IN', state: 'Indiana', numericCode: '18' },
  { code: 'IA', state: 'Iowa', numericCode: '19' },
  { code: 'KS', state: 'Kansas', numericCode: '20' },
  { code: 'KY', state: 'Kentucky', numericCode: '21' },
  { code: 'LA', state: 'Louisiana', numericCode: '22' },
  { code: 'ME', state: 'Maine', numericCode: '23' },
  { code: 'MD', state: 'Maryland', numericCode: '24' },
  { code: 'MA', state: 'Massachusetts', numericCode: '25' },
  { code: 'MI', state: 'Michigan', numericCode: '26' },
  { code: 'MN', state: 'Minnesota', numericCode: '27' },
  { code: 'MS', state: 'Mississippi', numericCode: '28' },
  { code: 'MO', state: 'Missouri', numericCode: '29' },
  { code: 'MT', state: 'Montana', numericCode: '30' },
  { code: 'NE', state: 'Nebraska', numericCode: '31' },
  { code: 'NV', state: 'Nevada', numericCode: '32' },
  { code: 'NH', state: 'New Hampshire', numericCode: '33' },
  { code: 'NJ', state: 'New Jersey', numericCode: '34' },
  { code: 'NM', state: 'New Mexico', numericCode: '35' },
  { code: 'NY', state: 'New York', numericCode: '36' },
  { code: 'NC', state: 'North Carolina', numericCode: '37' },
  { code: 'ND', state: 'North Dakota', numericCode: '38' },
  { code: 'OH', state: 'Ohio', numericCode: '39' },
  { code: 'OK', state: 'Oklahoma', numericCode: '40' },
  { code: 'OR', state: 'Oregon', numericCode: '41' },
  { code: 'PA', state: 'Pennsylvania', numericCode: '42' },
  { code: 'RI', state: 'Rhode Island', numericCode: '44' },
  { code: 'SC', state: 'South Carolina', numericCode: '45' },
  { code: 'SD', state: 'South Dakota', numericCode: '46' },
  { code: 'TN', state: 'Tennessee', numericCode: '47' },
  { code: 'TX', state: 'Texas', numericCode: '48' },
  { code: 'UT', state: 'Utah', numericCode: '4' },
  { code: 'VT', state: 'Vermont', numericCode: '50' },
  { code: 'VA', state: 'Virginia', numericCode: '51' },
  { code: 'WA', state: 'Washington', numericCode: '53' },
  { code: 'WV', state: 'West Virginia', numericCode: '54' },
  { code: 'WI', state: 'Wisconsin', numericCode: '55' },
  { code: 'WY', state: 'Wyoming', numericCode: '5' },
];

export const stateOptions = states.map((s) => ({
  name: s.state,
  value: s.code,
}));
const getStateCodeFromStateName = (stateName: string) => {
  return states.find((s) => s.state.toLowerCase() === stateName.toLowerCase())
    ?.code;
};
const getStateNameFromStateCode = (stateCode: string) => {
  return states.find((s) => s.code.toLowerCase() === stateCode.toLowerCase())
    ?.state;
};
export const cityOptions = usaCities.map((l) => ({
  name: `${l.city}, ${getStateCodeFromStateName(l.state)}`,
  value: `${l.city}, ${getStateCodeFromStateName(l.state)}`,
}));

export const getCityOptionsFromStateName = (stateName: string) => {
  if (!stateName) {
    return [];
  } else {
    return usaCities
      .filter((c) => c.state === getStateNameFromStateCode(stateName))
      .map((l) => ({
        name: l.city,
        value: l.city,
      }));
  }
};
