let localhostDev = true;
//如果是本地开发，就把localhostDev 设置成true，连接就是拼成‘http://localhost:8080/api/test’
//生产环境，就把localhostDev 设置成false，连接就是拼成‘http://xxx.com/api/test’
let _host= localhostDev ? 'http://localhost:8080' : 'http://xxx.com';
let httpUrl = {
  // cardIndex page
  'getCardDatas': _host + '/api/getCardDatas',
  // profile page
  'getProfileDatas': _host + '/api/getProfileDatas',
  'resetPwd': _host + '/api/resetPwd',
  // updatePhone page
  'handleSendCode': _host + '/api/handleSendCode',
  'checkOldPwd': _host + '/api/checkOldPwd',
  // qrCode page
  'getPayNum': _host + '/api/getPayNum',
  // consume page
  'getConsumeDatas': _host + '/api/getConsumeDatas',
  // updateInfo page
  'submitInfo': _host + '/api/submitInfo',
  // updatePwd page
  'submitPwd': _host + '/api/submitPwd',
  // recharge page
  'getRechargeDatas': _host + '/api/getRechargeDatas',
  // suiStore page
  'getSuiStoreDatas': _host + '/api/getSuiStoreDatas'
};
export { httpUrl }
