		var common = require('../../comm/script/common.js')
		var price = require('../../comm/script/fetchPrice')
		var getConstant = require('../../comm/script/constant.js')
		var method = "PsnGetExchangeOutlay";
//		var Sys = "BMPS";
		var url = common.postRequest(method);
		var priceList = [];
		var imageurll = {};
		var curCodeChinal = {}
		
Page({
	data: {
		priceList:[],
		hiddenLoading: false
	},
	onLoad: function() {
		console.log('load')
		
		var that = this
//		setInterval(function(){
	       price.fetchPrice(url,function(data){
				that.setData({
					priceList:data
				})
			})
	    hiddenLoading: true
//		},5000);
		
	},
	onShow: function() {
		var that = this
	  	wx.getSystemInfo({
	      success: function (res) {
	        that.setData({
	          windowHeight: res.windowHeight * 2 - 302
	        })
	      }
	    })
	},
	scroll: function(e) {
		console.log(e)
	},
	//下拉刷新
	onPullDownRefresh: function() {
		var that = this
		price.fetchPrice(url,function(data){
			that.setData({
				priceList:data
			})
		})
		console.log("refreshOK")
	},
	//分享
	 onShareAppMessage: function () {
    return {
      title: '中国银行实时牌价—结汇购汇',
      desc: '中国银行汇率换算——结汇购汇',
      path: '/page/user?id=123'
    }
  }
	 //跳转tabbar
//	 toCal:function(){
//	 	
//	 }
})