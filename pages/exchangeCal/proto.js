define(['ejs','zepto','routesUtil','model','common','checkForm', 'constant'], function(EJS,$,RoutesUtil,Model,Common,CheckForm, constant) { 
        var Ratecalc = function(){ 
                this.EJSPATH = { 
                                _MAIN: "views/calculater/ratecalc.ejs"        //汇率计算主页面 
        }; 
                this.cssFilePath = ["styles/Calcu.css"]; 
                Common.loadStyleFiles(this.cssFilePath,$.proxy(this.init,this)); 
                
                //货币代码字典定义 
                this.moneySymbol = constant.currency_sign_ratecalc_; 
                this.inputInterVal = null; 
        }; 
        
        Ratecalc.prototype = { 
                init: function(){ 
                        var _t                 = this; 
                        _t.currNum         = []; 
                        $("body").delcld(".ratecalc").append(new EJS({url:_t.EJSPATH._MAIN}).render()); 
                        $(".ratecalc").show().siblings().hide(); 
                        
                        //初始化货币对下拉框 
                        _t._initCrcyPair(); 
                        //绑定事件 
                        _t._bindEvents(); 
                }, 
                /** 
                 * 显示错误信息 
                 * @param msg 错误消息 
                 */ 
                errorMsg: function(/*string*/msg) { 
                        Common.showMessage(msg); 
                }, 
                _initCrcyPair: function(){ 
                        var _t = this; 
                        Model.interaction({ 
                                method: RoutesUtil.method.WBA.rate, 
                params: {} 
            }, "WBA"/*"data/rate.json"*/, function(data) { 
                    $("#maskbox").remove(); 
                    _t.currNum =  eval(data.list); 
                            if(!_t.currNum){ 
                                    _t.errorMsg('查询兑换币种，失败'); 
                                    return; 
                            } 
                            var crcyPair = data.currency, 
                                    option = []; 
                            
                            for( var i=0;i<crcyPair.length;i++ ){ 
                                    var vallen         = crcyPair[i].length; 
                                    var cry         = crcyPair[i].substring(vallen-3, crcyPair.length); 
                                    option[cry] = ["<option>",crcyPair[i],"</option>"].join(''); 
                            } 
                            var optHtml = "", optAfter = ""; 
                            for(var i in _t.moneySymbol){ 
                                    optHtml         += option[i]; 
                                    option[i]         = ''; 
                            } 
                            for(var i in option){ 
                                    optAfter += option[i]; 
                            } 
                            $('#startSelect').append(optHtml+optAfter); 
                            $('#endSelect').append(optHtml+optAfter); 
            }); 
                }, 
                _bindEvents: function(){ 
                        //金额输入框 keyup事件 
                        var _t = this; 
                        var amounEvtHandle = function(e){ 
                                var val = $(this).val().split('.'); 
                                _t.moneyvalidateKeyup(this); 
                                _t.getCalculateResult(); 
                        } 
                        $("#amountMoney").bind("keyup", amounEvtHandle).bind("focus", function(){ 
                                _t.inputInterVal && clearInterval(_t.inputInterVal); 
                                var $this = $(this); 
                                _t.inputInterVal = setInterval(function(){ 
                                        $this.trigger('keyup'); 
                                }, 1000); 
                         }).bind("blur", function(){ 
                                        clearInterval(_t.inputInterVal); 
                                        _t.inputInterVal = null; 
                         }); 
                        $("#amountMoney").bind("change", function(){ 
                                $(this).val() && amounEvtHandle.apply(this, arguments); 
                        }); 
                        //交换兑换方向按钮点击事件 
                        $(".ChangeBtn").bind("click", _t.changeCalculateResult); 
                        //原货币选择框change事件 
                        $('#startSelect').change(function(){ 
                                $('#StartCurrency').text($('#startSelect').val()); 
                                $('#startTitle').html($('#startSelect').val().trim().replace(/ .*/g, "")); 
                                if(_t.selectValidate()){ 
                                        _t.getCalculateResult(); 
                                } 
                        }); 
                        //目标货币选择框change事件 
                        $('#endSelect').change(function(){ 
                                $('#EndCurrency').text($('#endSelect').val()); 
                                $('#endTitle').html($('#endSelect').val().trim().replace(/ .*/g, "")); 
                                if(_t.selectValidate()){ 
                                        _t.getCalculateResult(); 
                                } 
                        }); 
                }, 
                /** 
                 * 计算结果 
                 * @param e 
                 */ 
                getCalculateResult: function(e){ 
                        var money                         = $('#amountMoney').val(),  //金额输入框值 
                                start                         = $('#StartCurrency').text().trim(),  //源货币值 
                                end                         = $('#EndCurrency').text().trim(),   //目标货币值 
                                $startTitle         = $('#startTitle'),   //计算等式中源货币容器 
                                $endTitle                 = $('#endTitle'),     //计算等式中目标货币容器 
                                $exchangeRate         = $("#ExchangeRate"),  //计算等式中，源货币兑换目标货币的汇率显示容器 
                                $resultNum                 = $('#resultNum'),     //计算结果容器 
                                errorVal                 = "",                  //错误消息 
                                key                                = "",                  //货币对键值 
                                resultNum                = 0,                   //计算结果变量 
                                num                                = 0,                   //储存结果长度 
                                _t                                 = this; 
                        //校验金额输入框 非正确输入 计算等式中显示0，并返回 
                        if(!_t.currencyValidate(start,end,money)){ 
                                $exchangeRate.html('0.00'); 
                                $resultNum.html('0.00'); 
                                $resultNum.css('font-size',32) 
                                return; 
                        } 

                        $startTitle.html(start.slice(0,-4)); 
                        $endTitle.html(end.slice(0,-4)); 
                        
                        if(start == end){ 
                                //源货币与目标货币相等，汇率以1计算 
                                 $exchangeRate.text(1); 
                                 resultNum = 1 * money; 
                                 $resultNum.html(resultNum.toFixed(2)+""); 
                        } else { 
                                key = start.slice(-3) + "," + end.slice(-3); 
                                
                                var haveFoundCryFlag = false; 
                                //寻找与选择的源货币至目标货币的汇率 
                                $.each(_t.currNum, function (index, item) { 
                                        //非对应货币对返回，继续下一个比对 
                                        if(item.key != key){ 
                                                return; 
                                        } 
                                        //找到对应货币对 
                                        haveFoundCryFlag = true; 
                                        if(_t.validate.deleteEmpty(item.value) > 0){ 
                                                //汇率校验正确，进行计算 
                                                $exchangeRate.html(item.value); 
                                                resultNum         = item.value * money; 
                                                num                 = resultNum.toFixed(2)+""; 
                                                $resultNum.html(num);         
                                                errorVal         = ""; 
                                        }else{ 
                                                //汇率校验不正确，提示不支持 
                                                $('#amountMoney').val(""); 
                                                errorVal ='暂时不支持'+start.substring(0,start.length - 4)+'兑换'+end.substring(0,end.length-4); 
                                        } 
                        }); 
                        //最终未找到对应货币对汇率 
                        if(!haveFoundCryFlag){ 
                                        $('#amountMoney').val(""); 
                                        errorVal ='暂时不支持'+start.substring(0,start.length - 4)+'兑换'+end.substring(0,end.length-4); 
                                        $exchangeRate.html('0.00'); 
                                        $resultNum.html('0.00'); 
                                        _t.errorMsg(errorVal); 
                                } 
                        } 
                        //根据计算结果长度，调整计算结果的显示文字大小 
                        switch(num.length || 0){ 
                                case 12: 
                                case 13: 
                                case 14: 
                                case 15: 
                                        $resultNum.css({'fontSize':32,'paddingTop':4}); 
                                break; 
                                case 16: 
                                case 17: 
                                case 18: 
                                case 19: 
                                        $resultNum.css({'fontSize':28,'paddingTop':8}); 
                                break; 
                                case 20: 
                                case 21: 
                                case 22: 
                                case 23: 
                                        $resultNum.css({'fontSize':24,'paddingTop':12}); 
                                break; 
                                case 24: 
                                case 25: 
                                case 26: 
                                        $resultNum.css({'fontSize':20,'paddingTop':16}); 
                                break; 
                        } 
                        //若存在错误则提示 
                        if(errorVal != ""){ 
                                _t.errorMsg(errorVal); 
                        } 
                }, 
                /** 
                 * 交换兑换方向重新计算 
                 */ 
                changeCalculateResult: function(){ 
                        var _t = window.Router; 
                        var startChange = $('#StartCurrency').text().trim(), 
                                endChange = $('#EndCurrency').text().trim(); 
                        $('#StartCurrency').text(endChange); 
                        $('#EndCurrency').text(startChange); 
                        $("#startTitle").text(endChange.slice(0,-4)); 
                        $("#endTitle").text(startChange.slice(0,-4)); 
                        $('#startSelect option').each(function(){ 
                                var objVal =_t.validate.deleteEmpty($(this).text()); 
                                if(objVal != _t.validate.deleteEmpty(endChange)){ 
                                        return; 
                                } 
                                $(this).attr('selected','selected'); 
                        }); 
                        
                        $('#endSelect option').each(function(){ 
                                var objVal = _t.validate.deleteEmpty($(this).text()); 
                                if(objVal != _t.validate.deleteEmpty(startChange)){ 
                                        return; 
                                } 
                                $(this).attr('selected','selected'); 
                        }); 
                        
                        _t.getCalculateResult(); 
                }, 
                moneyvalidateKeyup: function(id){ 
                        //重置非法输入 
                        $(id).val($(id).val().replace(/^0|[^\d.]|^\.|\.{2,}/g,"").replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")); 
                        var val = $(id).val(); 
                        var inter = val.split(".")[0], decimal = val.split(".")[1]; 
                        if(inter.length > 8){ 
                                $(id).val(val.substring(0,8)); 
                        } 
                        if(decimal && decimal.length > 2){ 
                                $(id).val(val.substring(0,inter.length+3)); 
                        } 
                        if(val.length > 11){ 
                                $(id).val(val.substring(0,11)); 
                        } 
                }, 
                selectValidate: function(){ 
                        var money         = $('#amountMoney').val(), 
                                start         = $('#StartCurrency').text(), 
                                end         = $('#EndCurrency').text(); 
                        
                        if( this.validate.deleteEmpty(start) == '请选择币种' ){ 
                                return false; 
                        } 

                        if(this.validate.deleteEmpty(end) =='请选择币种' ){ 
                                return false; 
                        } 
                        if(!this.validate.deleteEmpty(money)){ 
                                return false; 
                        } 
                        return true; 
                }, 
                currencyValidate: function(start,end,money){ 
                        var _t = this; 
                        if( _t.validate.deleteEmpty(start) == '请选择币种' ){ 
                                _t.errorMsg("请选择原始货币"); 
                                return; 
                        } 
                        if(_t.validate.deleteEmpty(end) =='请选择币种' ){ 
                                _t.errorMsg("请选择目标货币"); 
                                return; 
                        } 
                        if(!_t.validate.deleteEmpty(money)){ 
                                return; 
                        } 

                        if(_t.validate.point(money) || money.length > 12){ 
                                var moneyArray = money.split('.'); 
                                if(moneyArray[0].length > 12){ 
                                        _t.errorMsg('金额应小于12位'); 
                                        return; 
                                } 
                                if(moneyArray[1].length > 2){ 
                                        _t.errorMsg('金额小数不能大于2位'); 
                                        return; 
                                } 
                        } 
                        
                        if(!_t.validate.money(money)){ 
                                _t.errorMsg('请输入合法的金额'); 
                                return; 
                        } 
                        return true; 
                }, 
                validate : (function(){ 
                        var money = /^(([1-9]\d{0,11})|0)(\.\d{1,2})?$/, 
                                point = /\./g; 
                        return { 
                                deleteEmpty:function(v){ 
                                        return v.replace(/(^\s*)|(\s*$)/g, "");         
                                }, 
                                money:function(v){ 
                                        (v.lastIndexOf(".") + 1 == v.length) && (v = v.substring(0, v.lastIndexOf("."))); 
                                        return money.test(v); 
                                }, 
                                point:function(v){ 
                                        return point.test(v); 
                                } 
                        }; 
                })() 
        } 
        return Ratecalc; 
}); 