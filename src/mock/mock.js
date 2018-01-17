import Mock from 'mockjs'

function getLogoImg () {
	return Mock.Random.image('100x100', Mock.Random.hex())
}
Mock.mock(/getWxUserinfo/, {
	'errcode|1': [0,-1],
	'errmsg': '错误信息',
  'res': {
    'theme|1': ['#32b16c','#327cb1','#313131'],
		'cardface': getLogoImg(),
    'membername|1': ['李小明','张小飞','王小红'],
    'mgname|1': ['普通会员','高级会员','铂金会员'],
    'logo': getLogoImg(),
    'memberno': '@integer(1000000000000000, 9999999999999999)',
    'integral': '@integer(1000, 2000)',
    'balance': '@integer(2000, 5000)',
		'memberid': '@integer(1, 5000)',
		'mobile|1': ['1850311@integer(1000,9999)', undefined],
		'sex|1': [1,2],
		'birthday': '@date("yyyy-MM-dd")'
  }
})
Mock.mock(/handleSendCode/, {
  'errcode|1': [0,-1]
})
Mock.mock(/getPayCode/, {
	'errcode|1': [0,-1],
	'errmsg': '错误信息',
	'res': {
		'payno': '8000@integer(100000000000, 999999999999)'
	}
})
Mock.mock(/getConsumeDatas/, {
	'errcode|1': [0,-1],
	'errmsg': '错误信息',
	'res': {
		'getConsumeList|10': [
			{
				'conMoney': '@integer(100,999)',
		    'conAddress|1': ['渝乡辣婆婆','老酒川菜坊','河北人家'],
		    'conPrestore': '@integer(10,99)',
		    'conScore': '@integer(10,99)',
				'conElse': '@integer(10,99)',
				'conDate': '@date("yyyy-MM-dd")',
				'isSuccess': '@boolean'
			}
		]
	}
})
Mock.mock(/submitInfo/, {
  'errcode|1': [0,-1]
})
Mock.mock(/submitPwd/, {
  'errcode|1': [0,-1]
})
Mock.mock(/checkOldPwd/, {
  'errcode|1': [0,-1]
})
Mock.mock(/resetPwd/, {
  'errcode|1': [0,-1]
})
Mock.mock(/getRechargeDatas/, {
	'errcode|1': [0,-1],
	'errmsg': '错误信息',
  'res': {
		'getRechargeList|4': [
			{
				'recMoney': '@integer(100,999)',
		    'recAddress|1': ['渝乡辣婆婆','老酒川菜坊','河北人家'],
		    'recDate': '@date("yyyy-MM-dd")',
		    'recActual': '@integer(10,99)',
				'recReward': '@integer(10,99)',
				'isSuccess': '@boolean'
			}
		]
	}
})
Mock.mock(/getSuiStoreDatas/, {
	'errcode|1': [0,-1],
	'errmsg': '错误信息',
  'res': {
		'getSuiStoreList|10': [
			{
				'suiName|1': ['渝乡辣婆婆广安店','老酒川菜坊西直门店','河北人家中山店'],
		    'suiDistance': '@integer(10,99)',
		    'suiAddress': '@ctitle(10, 30)'
			}
		]
	}
})
