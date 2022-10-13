export const envConfig = {
  apiSSO: 'http://103.226.248.168:8082',
  clientId: 'lifesup_hrm',
  scope: 'read',
  baseUrl: window.location.origin,
};
export const environment = {
  production: true,
  clientId: 'lifesup_hrm',
  apiUrl: 'http://103.226.248.168:8089/api',
  apiSSO: `${envConfig.apiSSO}/api`,
  redirectUrl: `${envConfig.apiSSO}/login?client_id=${envConfig.clientId}&redirect_uri=${envConfig.baseUrl}&scope=${envConfig.scope}`
};
