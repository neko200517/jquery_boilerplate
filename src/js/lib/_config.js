export default {
  cognito: {
    UserPoolId: 'ap-northeast-1_hBPw6jFWb',
    ClientId: '5emh023e04u1ctcuqklpmtte66',
    IdentityPoolId: 'ap-northeast-1:55f9c9a1-63b5-41f4-b11b-c8b03d82a45f',
    region: 'ap-northeast-1',
  },
  env: {
    // baseUrl: 'http://localhost:3000/dev',
    baseUrl: 'https://spllob2w8b.execute-api.ap-northeast-1.amazonaws.com/dev',
  },
  assets: {
    terms: '../assets/_terms.html',
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
    getStaff: '/staff',
    newStaff: '/staff/regist',
    setStaff: '/staff/confirm',
    getLog: '/log',
    newLog: '/log/regist',
  },
  app: {
    version: 'dev',
    num: '1.0.0',
    productName: 'LIB指導者アプリ',
  },
};
