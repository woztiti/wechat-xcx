// pages/exchangeCal/exchangeCal.js
// var common = require('../../comm/script/common.js')
// 		var getConstant = require('../../comm/script/constant.js')
// 		var method = "rate";
// 		var url = common.postRequest(method);
		
// 		wx.request({
// 			url: url,
// 			method: 'POST',
// 			// dataType: "jsonp",
// 			header: {
// 			}, // 设置请求的 header
// 			success: function (res) {
				
// 			}
// 		})

// pages/exchangeCal/exchangeCal.js
var allDataList = {
"result": [
        {
            "updateDate": "2017/01/12 15:55:24",
            "curCode": "AUD",
            "buyRate": 689.85,
            "sellRate": 692.61,
            "buyNoteRate": 684.18,
            "sellNoteRate": 692.61,
            "curCodeChinese":"英镑",
            "imageurl":"../../dist/image/flag/AUD.png"
        },
        {
            "updateDate": "2017/01/12 15:55:24",
            "curCode": "TWD",
            "buyRate": 22.0,
            "sellRate": 20.5,
            "buyNoteRate": 21.01,
            "sellNoteRate": 22.66,
            "curCodeChinese":"新台币",
            "imageurl":"../../dist/image/flag/USD.png"
        },
        {
            "updateDate": "2017/01/12 15:55:24",
            "curCode": "CHF",
            "buyRate": 682.23,
            "sellRate": 687.03,
            "buyNoteRate": 661.18,
            "sellNoteRate": 687.03,
            "curCodeChinese":"法郎",
            "imageurl":"../../dist/image/flag/USD.png"
        },
        {
            "updateDate": "2017/01/12 15:55:24",
            "curCode": "BRL",
            "buyRate": 206.42,
            "sellRate": 220.89,
            "buyNoteRate": 207.47,
            "sellNoteRate": 226.92,
            "curCodeChinese":"巴西",
            "imageurl":"../../dist/image/flag/USD.png"
        }]
}
var result = allDataList.result;
var noteSpot = {
    "noteSpotDetail":[        
        {
            notespot: "现钞",
            imageurl: '../../dist/image/cash.png'
        },
        {
            notespot: "现汇",
            imageurl: '../../dist/image/spot.png'
        }]
};
var resultNoteSpot = noteSpot.noteSpotDetail;

Page({
  data:{
      winWidth: 0, 
      winHeight: 0, 
      currentTab: 0,
      debitList:"",
      debitArray:[],
      noteSpot:"",
      noteSpotArray:[],
      indexBuy:0,
      indexSpotNote:0,
      indexSell:0,
      indexNoteSpot:0,
      calResult:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var self = this;
    var debitList = this.debitList();
    var debitArray = this.debitArray(debitList);
    var noteSpot = this.noteSpot();
    var noteSpotArray = this.noteSpotArray(noteSpot);
      self.setData({
            debitList:debitList,
            debitArray:debitArray,
            noteSpot:noteSpot,
            noteSpotArray:noteSpotArray
        });
  },
  onUnload:function(){
    var that = this;
    // 页面关闭
      wx.getSystemInfo({
        success: function(res) {
          // success
        that.setData({ 
            winWidth: res.windowWidth, 
            winHeight: res.windowHeight 
          }); 
        }
      }) 
    },
    bindChange: function( e ) { 
      var that = this; 
      that.setData( 
        { 
          currentTab: e.detail.current 
        }); 
    }, 
    swichNav:function(e){
      var that = this; 
      if( this.data.currentTab === e.target.dataset.current ) { 
        return false; 
      } else { 
        that.setData({ 
            currentTab: e.target.dataset.current 
        }) 
      } 
    },
    //扣账币种列表
    debitList:function(){
        return result;
    },
    //扣账币种格式转换
    debitArray: function(list){
        var retArray=[];
        for (var i in list){
            retArray[i] = list[i].curCodeChinese;
        }
        return retArray;
    },
    //选择扣账币种
    bindPickerBuyChange: function(e){
        var self = this;
        var i= e.detail.value;
        this.setData({
            indexBuy: i,
            buyDebitCurrency:{
                "curCode": self.data.debitList[i].curCode,
                "buyRate":self.data.debitList[i].buyRate,
                "sellRate":self.data.debitList[i].sellRate,
                "buyNoteRate":self.data.debitList[i].buyNoteRate,
                "sellNoteRate":self.data.debitList[i].sellNoteRate
            }
        });
    },
    //扣账币种列表
    noteSpot:function(){
        return resultNoteSpot;
    },
    //扣账币种格式转换
    noteSpotArray: function(noteSpot){
        var noteSpotArray =[];
        for (var i in noteSpot){
            noteSpotArray[i] = noteSpot[i].notespot;
        }
        return noteSpotArray;
    },
    bindNoteSpotChange:function(e){
        var self = this;
        var i= e.detail.value;
        this.setData({
            indexSpotNote: i,
            noteSpotCurrency:{
                "notespot": self.data.noteSpot[i].notespot
            }
        });

    },
    bindPickerSellChange: function(e){
        var self = this;
        var i= e.detail.value;
        this.setData({
            indexSell: i
        });
    },
    bindSpotNoteChange:function(e){
        var self = this;
        var i= e.detail.value;
        this.setData({
            indexSpotNote: i
        });
    },
    //监听金额输入
    monitorInput:function(e){
        var inputValue = e.detail.value;
        wx.setStorage({
            key:"input",
            data:inputValue
        });
        this.monitorValue(inputValue);
    },
    monitorValue:function(inputValue){
        var amount = inputValue;
        var self = this;
        if(self.data.noteSpotCurrency.notespot == '现钞'){
            if (amount != "" && self.data.buyDebitCurrency){
                var result = parseFloat(self.data.buyDebitCurrency.buyNoteRate * amount).toFixed(2);
                this.setData({
                    calResult:result
                });
            }
            else{
                this.setData({
                    calResult:""
                });
            }
        }else if(self.data.noteSpotCurrency.notespot == '现汇'){
            if (amount != "" && self.data.buyDebitCurrency){
                var result = parseFloat(self.data.buyDebitCurrency.buyRate/100 * amount).toFixed(2);
                this.setData({
                    calResult:result
                });
            }
            else{
                this.setData({
                    calResult:""
                });
            }
        }
    }


})