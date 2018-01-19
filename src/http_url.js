let localhostDev = false
//如果是本地开发，就把localhostDev 设置成true，连接就是拼成‘http://localhost:8080/api/test’
//生产环境，就把localhostDev 设置成false，连接就是拼成‘http://xxx.com/api/test’
// http://ip:port/pzcatering-web/crmwxapi.do?method=
let _host= localhostDev ? 'http://localhost:8080' : 'http://192.168.1.183:8081/crmwxapi.do?method='
let httpUrl = {
  // cardIndex page
  'getCardDatas': _host + 'getWxUserinfo',
  // profile page
  'resetPwd': _host + 'resetMemberPwd',
  // updatePhone page
  'handleSendCode': _host + 'userSendcode',
  'updateMemberMobile': _host + 'updateMemberMobile',
  // 'checkOldPwd': _host + 'updateMemberMobile',
  // qrCode page
  'getPayNum': _host + 'getPayCode',
  // consume page
  'getConsumeDatas': _host + 'getConsumeList',
  // updateInfo page
  'submitInfo': _host + 'updateMemberInfo',
  // updatePwd page
  'submitPwd': _host + 'changeMemberPwd',
  // recharge page
  'getRechargeDatas': _host + 'getChargeList',
  // suiStore page
  'getSuiStoreDatas': _host + 'getSuiStoreDatas'
};
export default httpUrl
