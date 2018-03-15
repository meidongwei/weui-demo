let localhostDev = true
// let _host= localhostDev ? 'http://localhost:8080' : 'http://192.168.1.185:8081/pzcatering-web/crmwxapi.do?method='
let _host= localhostDev ? 'http://localhost:8080' : '/pzcatering-web/crmwx/api.do?method='
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
  'getSuiStoreDatas': _host + 'getSuiStoreDatas',
  'getCouponList': _host + 'getCouponList'
};
export default httpUrl
