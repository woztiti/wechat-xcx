		var common = require('../../comm/script/common.js')
		var getConstant = require('../../comm/script/constant.js')
		var priceList = [];
		var imageurll = {};
		var curCodeChinal = {}
	
module.exports = {
    fetchPrice: function(url,cb) {
      var that = this    
        wx.request({
          url: url,
          method: 'POST', 
          header: {         	
          },
          success: function(res){          
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
            wx.stopPullDownRefresh()
            console.log("STOPOK")
            //执行回调函数
            typeof cb == 'function' && cb(priceList)
          },
          fail: function() {
		       wx.showToast({
	  			title: '刷新失败，请您检查网络',
	  			icon: 'fail',
	  			duration: 2000
			  })		
          }
        })
      
    }
}