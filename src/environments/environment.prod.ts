export const envConfig = {
    ssoHost: 'http://103.226.248.168:8082',
    clientId: 'lifesup_hrm',
    scope: 'read',
    baseUrl: 'http://103.226.248.168:8097'
};
export const environment = {
    production: true,
    apiUrl: 'http://103.226.248.168:8089/api',
    clientId: 'lifesup_hrm',
    redirectUrl: `${envConfig.ssoHost}/login?client_id=${envConfig.clientId}&redirect_uri=${envConfig.baseUrl}&scope=${envConfig.scope}`
};
