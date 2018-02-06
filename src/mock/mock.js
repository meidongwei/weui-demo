import Mock from 'mockjs'

function getLogoImg () {
	return Mock.Random.image('100x100', Mock.Random.hex())
}
Mock.mock(/getWxUserinfo/, {
	'errcode': 0,
	'errmsg': '错误信息',
  'res': {
    'theme|1': ['#32b16c','#327cb1','#313131'],
		'cardface': getLogoImg(),
    'membername|1': ['李小明','张小飞','王小红', '', null],
    'mgname|1': ['普通会员','高级会员','铂金会员'],
    'logo': getLogoImg(),
    'memberno': '@integer(1000000000000000, 9999999999999999)',
    'integral': '@integer(1000, 2000)',
    'balance': '@integer(2000, 5000)',
		'memberid': '@integer(1, 5000)',
		'mobile|1': ['1850311@integer(1000,9999)', undefined],
		'sex|1': [1,2],
		'birthday|1': ['2018年01月02日', undefined, null]
  }
})
Mock.mock(/userSendcode/, {
  'errcode': 0,
	'errmsg': '发送验证码失败'
})
Mock.mock(/getPayCode/, {
	'errcode': 0,
	'errmsg': '错误信息',
	'res': {
		'payno': '8000@integer(100000000000, 999999999999)'
	}
})
Mock.mock(/getConsumeList/, {
	'errcode': 0,
	'errmsg': '错误信息',
	'res|2': [
		{
	    'ognname|1': ['渝乡辣婆婆','老酒川菜坊','河北人家'],
	    'balance': '@integer(10,99)',
	    'credit': '@integer(10,99)',
			'payamount': '@integer(10,99)',
			'finaltime': '@date("yyyy-MM-dd")',
			'status|1': [1,2]
		}
	]
})
Mock.mock(/updateMemberInfo/, {
  'errcode': 0,
	'errmsg': '错误信息'
})
Mock.mock(/changeMemberPwd/, {
  'errcode': 0,
	'errmsg': '错误信息'
})
Mock.mock(/updateMemberMobile/, {
  'errcode': 0,
	'errmsg': '错误信息'
})
Mock.mock(/resetMemberPwd/, {
  'errcode': 0,
	'errmsg': '错误信息'
})
Mock.mock(/getChargeList/, {
	'errcode': 0,
	'errmsg': '错误信息',
  'res|2': [
		{
	    'ognname|1': ['渝乡辣婆婆','老酒川菜坊','河北人家'],
	    'finaltime': '@date("yyyy-MM-dd")',
	    'money': '@integer(10,99)',
			'rewardmoney': '@integer(10,99)',
			'status|1': [1,2]
		}
	]
})
Mock.mock(/getSuiStoreDatas/, {
	'errcode': 0,
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

Mock.mock(/getSaleTicketsList/, {
	'errcode': 0,
	'errmsg': '错误信息',
  'res': {
		'getSaleTicketsList|10': [
			{
				'suiName|1': ['渝乡辣婆婆广安店','老酒川菜坊西直门店','河北人家中山店'],
		    'flag|1': [1, 2, 3],
		    'suiText': '@ctitle(10, 15)'
			}
		]
	}
})
