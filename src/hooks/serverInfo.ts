import Constants from 'expo-constants';
export const NODE_ENV =
  typeof process !== 'undefined' && process.env && process.env.NODE_ENV;

export const useServerInfo = () => {
  const httpProtocol =
    Constants.manifest.extra.appVariables[String(NODE_ENV)].httpProtocol;
  const wsProtocol =
    Constants.manifest.extra.appVariables[String(NODE_ENV)].wsProtocol;
  const serverUrl =
    Constants.manifest.extra.appVariables[String(NODE_ENV)].apiServerUrl;

  return [`${httpProtocol}://${serverUrl}`, `${wsProtocol}://${serverUrl}`];
};
