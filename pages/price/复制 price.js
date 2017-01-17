		var common = require('../../comm/script/common.js')
		var getConstant = require('../../comm/script/constant.js')
		var method = "PsnGetExchangeOutlay";
//		var Sys = "BMPS";
		var url = common.postRequest(method);
		var priceList = [];
		var imageurll = {};
		var curCodeChinal = {}
		wx.request({
			url: url,
			method: 'POST',
			// dataType: "jsonp",
			header: {
			}, // 设置请求的 header
			success: function (res) {
				console.log(JSON.stringify(res.data.result))
				priceList = res.data.result;

				for (var i = 0; i < priceList.length; i++) {
					if (getConstant.Constant.exchangeCurrency[priceList[i].curCode] != undefined) {
						//国旗处理
						imageurll[i] = "../../dist/image/flag/" + priceList[i].curCode + ".png";
						priceList[i].imageurl = imageurll[i];
						//中文币种显示处理
						curCodeChinal[i] = getConstant.Constant.exchangeCurrency[priceList[i].curCode];
						priceList[i].curCodeChinese = curCodeChinal[i];
						//空值处理
						priceList[i].buyRate = (priceList[i].buyRate != '0') ? priceList[i].buyRate : ' -';
						priceList[i].buyNoteRate = (priceList[i].buyNoteRate != '0') ? priceList[i].buyNoteRate : ' -';
						priceList[i].sellRate = (priceList[i].sellRate != '0') ? priceList[i].sellRate : ' -';
						priceList[i].sellNoteRate = (priceList[i].sellNoteRate != '0') ? priceList[i].sellNoteRate : ' -';
					} else if (getConstant.Constant.exchangeCurrency[priceList[i].curCode] == undefined) {
						priceList.splice(i, priceList.length - i);
					}

				}
			
			}
		})
    
Page({
  data: {
    test: "test",
    priceList: {}
  },
	//加载成功，一个 page 只会执行一次，同时在这个钩子里处理路由传过来的参数
  onLoad: function () {
    var that = this
    //更新数据
    that.setData({
      priceList: priceList
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
	 * 页面初次渲染完成，一个page 只会执行一次
   */
  onReady() {
    
  },

  /**
   * 生命周期函数--监听页面显示
	 * 页面重新调取渲染完成，每次打开页面都会调用一次
   */
  onShow() {
		var that = this
  	wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight * 2 - 302
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
		wx.request({
			url: url,
			method: 'POST',
			// dataType: "jsonp",
			header: {
			}, // 设置请求的 header
			success: function (res) {
				console.log(JSON.stringify(res.data.result))
				priceList = res.data.result;

				for (var i = 0; i < priceList.length; i++) {
					if (getConstant.Constant.exchangeCurrency[priceList[i].curCode] != undefined) {
						//国旗处理
						imageurll[i] = "../../dist/image/flag/" + priceList[i].curCode + ".png";
						priceList[i].imageurl = imageurll[i];
						//中文币种显示处理
						curCodeChinal[i] = getConstant.Constant.exchangeCurrency[priceList[i].curCode];
						priceList[i].curCodeChinese = curCodeChinal[i];
						//空值处理
						priceList[i].buyRate = (priceList[i].buyRate != '0') ? priceList[i].buyRate : ' --';
						priceList[i].buyNoteRate = (priceList[i].buyNoteRate != '0') ? priceList[i].buyNoteRate : ' --';
						priceList[i].sellRate = (priceList[i].sellRate != '0') ? priceList[i].sellRate : ' --';
						priceList[i].sellNoteRate = (priceList[i].sellNoteRate != '0') ? priceList[i].sellNoteRate : ' --';
					} else if (getConstant.Constant.exchangeCurrency[priceList[i].curCode] == undefined) {
						priceList.splice(i, priceList.length - i);
					}

				}

			}
		})
		
		console.log("refreshOK")
    
    var that = this
    //更新数据
    that.setData({
      priceList: priceList
    })
    
    wx.stopPullDownRefresh()
    console.log("STOPOK")
  },
  // onShareAppMessage: function () {
  //   return {
  //     title: '自定义分享标题',
  //     desc: '自定义分享描述',
  //     path: '/page/user?id=123'
  //   }
  // }  

})