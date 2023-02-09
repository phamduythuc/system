export const envConfig = {
  apiSSO: 'https://sso.lifesup.com.vn',
  clientId: 'lifesup_hrm',
  scope: 'read',
  baseUrl: window.location.origin,
};
export const environment = {
  production: true,
  clientId: 'lifesup_hrm',
  apiUrl: 'https://hrm.lifesup.com.vn/api',
  apiSSO: `${envConfig.apiSSO}/api`,
  redirectUrl: `${envConfig.apiSSO}/auth?client_id=${envConfig.clientId}&redirect_uri=${envConfig.baseUrl}&scope=${envConfig.scope}`
};
