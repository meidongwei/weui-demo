import Mock from 'mockjs'

function getLogoImg () {
	return Mock.Random.image('659x427', Mock.Random.hex())
}
Mock.mock(/getWxUserinfo/, {
	'errcode': 0,
	'errmsg': '错误信息',
  'res': {
		'cardface': getLogoImg(),
    'membername|1': ['李小明','张小飞','王小红', ''],
    'mgname|1': ['普通会员','高级会员','铂金会员'],
    'logo': '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',
    'memberno': '@integer(1000000000000000, 9999999999999999)',
    'integral': '@integer(1000, 2000)',
    'balance': '@integer(2000, 5000)',
		'memberid': '@integer(1, 5000)',
		'mobile|1': ['1850311@integer(1000,9999)'],
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
	    'balance': '@integer(1,9)000',
	    'credit': '@integer(10,99)',
			'payamount': '@integer(1,9)000',
			'finaltime': 1518407827000,
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
	    'finaltime': 1518407827000,
	    'money': '@integer(1,9)000',
			'rewardmoney': '@integer(1,9)00',
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

Mock.mock(/getCouponList/, {
	"errcode": 0,
	"errmsg": "错误信息",
	"res": {
		"rowCount": 2,
		"coupons": [{
			"couponname":"100元代金券",
			"deductamount":3890,
			"type":0,
			"useflag":0,
			"useamount":10000,
			"startdate":"2018-01-01",
			"enddate":"2018-01-31"
		},{
			"couponname":"地三鲜菜品券",
			"deductamount":5270,
			"type":1,
			"useflag":1,
			"useamount":10000,
			"startdate":"2018-01-01",
			"enddate":"2018-01-31"
		}]
	}
})
