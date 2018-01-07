import Mock from 'mockjs'

function getLogoImg () {
	return Mock.Random.image('100x100', Mock.Random.hex())
}
Mock.mock(/getCardDatas/, {
  'getCardDatas': {
    'theme|1': ['#32b16c','#327cb1','#313131'],
    'cardName|1': ['渝乡辣婆婆','老酒川菜坊','河北人家'],
    'cardType|1': [1,2,3],
    'cardLogoSrc': getLogoImg(),
    'cardNum': '@integer(1000000000000000, 9999999999999999)',
    'score': '@integer(1000, 2000)',
    'prestore': '@integer(500, 999).00',
    'isShow': '@boolean'
  }
})
Mock.mock(/getProfileDatas/, {
  'getProfileDatas': {
    'proPhone': '1850311@integer(1000,9999)',
    'proName': '李小@ctitle(1,1)',
    'proSex|1': [1,2],
    'proBirthday': '@date("yyyy-MM-dd")'
  }
})
Mock.mock(/handleSendCode/, {
  'status': '@boolean'
})
Mock.mock(/getPayNum/, {
  'getPayNum': '8000@integer(100000000000, 999999999999)'
})
