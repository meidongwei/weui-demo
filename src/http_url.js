let localhostDev = true
//如果是本地开发，就把localhostDev 设置成true，连接就是拼成‘http://localhost:8080/api/test’
//生产环境，就把localhostDev 设置成false，连接就是拼成‘http://xxx.com/api/test’
// http://ip:port/pzcatering-web/crmwxapi.do?method=
let _host= localhostDev ? 'http://localhost:8080' : 'http://192.168.1.195:8081/crmwxapi.do?method='
let httpUrl = {
  // cardIndex page
  'getCardDatas': _host + 'getWxUserinfo',
  // profile page
  'resetPwd': _host + 'resetPwd',
  // updatePhone page
  'handleSendCode': _host + 'handleSendCode',
  'checkOldPwd': _host + 'checkOldPwd',
  // qrCode page
  'getPayNum': _host + 'getPayCode',
  // consume page
  'getConsumeDatas': _host + 'getConsumeDatas',
  // updateInfo page
  'submitInfo': _host + 'submitInfo',
  // updatePwd page
  'submitPwd': _host + 'submitPwd',
  // recharge page
  'getRechargeDatas': _host + 'getRechargeDatas',
  // suiStore page
  'getSuiStoreDatas': _host + 'getSuiStoreDatas'
};
export default httpUrl
