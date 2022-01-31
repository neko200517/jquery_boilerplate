export const _config = {
  cognito: {
    UserPoolId: 'ap-northeast-1_2m3cECLQP',
    ClientId: '58r8k0lq4iburhmvs45qfnqiak',
    IdentityPoolId: 'ap-northeast-1:e79894bb-3ad9-40ed-9793-56439b1ab53a',
    region: 'ap-northeast-1',
  },
  env: {
    // baseUrl: 'http://localhost:3000/dev',
    baseUrl: 'https://z9x2pa7n48.execute-api.ap-northeast-1.amazonaws.com/dev',
  },
  assets: {
    terms: '/resources/terms.html',
  },
  api: {
    getCondition: '/condition',
    setCondition: '/condition/save',
    getCsv: '/condition/csv',
    getGraphYear: '/graph',
    getGraphDate: '/graph_day',
    getGraphMonth: '/graph_month',
    getUser: '/user',
    newUser: '/user/regist',
    setUser: '/user/confirm',
    getLog: '/log',
    newLog: '/log/regist',
  },
  app: {
    version: 'dev',
    num: '1.0.0',
    productName: 'LIB利用者アプリ',
  },
};
