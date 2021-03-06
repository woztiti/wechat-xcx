
/** 
 * 常量定义 
 * @namespace constant 
 * @name constant 
 */ 
        var Constant = { 
                        /** 
                         * P503改造--hs3693 
                         */ 
                currency_code_ : { 
                        "001" : "人民币元", 
                        "012" : "英镑", 
                        "013" : "港币",//P503 改造 原名港币元 
                        "014" : "美元", 
                        "015" : "瑞士法郎", 
                        "016" : "德国马克", 
                        "017" : "法国法郎", 
                        "018" : "新加坡元", 
                        "020" : "荷兰盾", 
                        "021" : "瑞典克朗", 
                        "022" : "丹麦克朗", 
                        "023" : "挪威克朗", 
                        "024" : "奥地利先令", 
                        "025" : "比利时法郎", 
                        "026" : "意大利里拉", 
                        "027" : "日元", 
                        "028" : "加拿大元",//P503 改造 原名加元 
                        "029" : "澳大利亚元",//P503 改造 原名澳元 
                        "032" : "林吉特",//P503 改造 原名马来西亚林吉特 
                        "034" : "美元金", 
                        "035" : "人民币金", 
                        "036" : "美元银", 
                        "038" : "欧元", 
                        "039" : "博茨瓦纳普拉", 
                        "042" : "芬兰马克", 
                        "045" : "美元铂金", 
                        "056" : "印尼卢比",//P503 改造 原名印尼盾 
                        "064" : "越南盾", 
                        "065" : "福林", 
                        "068" : "人民币银", 
                        "070" : "南非兰特", 
                        //"072" : "卢布", 
                        "080" : "赞比亚克瓦查", 
                        "081" : "澳门元", 
                        "082" : "菲律宾比索", 
                        "084" : "泰国铢", 
                        "085" : "印度卢比",//P503新增 
                        "087" : "新西兰元", 
                        "088" : "韩元",//P503 改造 原名韩元 
                        "096" : "阿联酋迪拉姆",//P503新增 
                        "101" : "哈萨克斯坦坚戈", 
                        "134" : "巴西里亚尔",//P503 改造 原名雷亚尔 
                        "131" : "文莱币", 
                        "166" : "柬埔寨瑞尔", 
                        "196" : "卢布",//P503 改造 原名俄罗斯卢布 
                        "213" : "新台币",//P503 改造 原名新台湾元 
                        "253" : "赞比亚新克瓦查", 
                        "841" : "钯金(盎司)", 
                        "844" : "钯金(克)", 
                        "845" : "铂金(克)" 
                }, 
                currency_sign_ : { 
                        "CNY" : "人民币元", 
                        "GBP" : "英镑", 
                        "HKD" : "港币", 
                        "USD" : "美元", 
                        "JPY" : "日元", 
                        "CAD" : "加拿大元", 
                        "AUD" : "澳大利亚元", 
                        "EUR" : "欧元" 
                }, 
                /* 
                 * 汇率计算器  货币码定义 
                 */ 
                currency_sign_ratecalc_: { 
                        "CNY":"人民币元", 
                        "HKD":"港币", 
                        "USD":"美元", 
                        "KRW":"韩元", 
                        "EUR":"欧元", 
                        "JPY":"日元", 
                        "AUD":"澳大利亚元", 
                        "GBP":"英镑" 
                }, 
                currency_symbol_ : { 
                        "001" : "￥",//人民币 
                        "014" : "$",//美元 
                        "027" : "￥",//日元 
                        "038" : "€",//欧元 
                        "012" : "£",//英镑 
                        "013" : "HK$",//港币 
                        "028" : "C$",//加拿大元 
                        "029" : "A$"//澳大利亚元 
                },         
                cashremit_type_ : { 
                        "00" : "现钞", 
                        "01" : "现钞", 
                        "02" : "现汇" 
                }, 
                account_type_: { 
                        "119" : "长城电子借记卡", 
                        "188" : "活期一本通", 
                        "103" : "中银信用卡", 
                        "104" : "长城信用卡", 
                        "101" : "普通活期", 
                        "107" : "单外币信用卡", 
                         "190" : "网上专属理财账户" 
                }, 
                account_type_simple: {//P603内部可用性测试优化任务 结售汇优化简写 
                        "119" : "借记卡", 
                        "188" : "活一本", 
                        "103" : "中银信用卡", 
                        "104" : "长城信用卡", 
                        "101" : "普通活期", 
                        "107" : "单外币信用卡", 
                         "190" : "网上专属理财账户" 
                }, 
                account_status_:{ 
                        "00":"有效", 
                        "01":"已销户", 
                        "02":"止付", 
                        "03":"长期不动户", 
                        "04":"开户即冲正", 
                        "05":"挂失", 
                        "06":"冻结", 
                        "07":"已转期", 
                        "08":"已结清", 
                        "09":"其他" 
                }, 
                risk_id_type_ : { 
                        "1" : "身份证", 
                        "2" : "临时居民身份证", 
                        "3" : "户口簿", 
                        "4" : "军人身份证", 
                        "5" : "武装警察身份证", 
                        "6" : "港澳居民通行证", 
                        "7" : "台湾居民通行证", 
                        "8" : "护照", 
                        "9" : "其他证件", 
                        "10" : "港澳台居民往来内地通行证", 
                        "11" : "外交人员身份证", 
                        "12" : "外国人居留许可证", 
                        "13" : "边民出入境通行证", 
                        "14" : "营业执照", 
                        "47" : "港澳居民来往内地通行证（香港）", 
                        "48" : "港澳居民来往内地通行证（澳门）", 
                        "49" : "台湾居民来往大陆通行证", 
                        "50" : "机构信用代码", 
                        "99" : "其他" 
                }, 
                risk_level_ : { 
                        "1" : "保守型投资者", 
                        "2" : "稳健型投资者", 
                        "3" : "平衡型投资者", 
                        "4" : "成长型投资者", 
                        "5" : "进取型投资者" 
                }, 
                risk_level_desc_ : { 
                        "1" : "您的风险容忍程度非常低，在任何投资中，保护本金不受损失和保持资产的流动性是您的首要目标。您对投资的态度是希望投资收益极度稳定，不愿承担高风险以换取高收益，通常不太在意资金是否有较大增值，不愿意承受投资波动对心理的煎熬，追求稳定。您比较适合投资存款、债券、保本保收益或收益波动性较小的理财产品、保障型保险产品、保本基金和货币型基金。", 
                        "2" : "您的风险承受能力较低。在任何投资中，稳定是您首要考虑的因素，一般您希望在保证本金安全的基础上能有一些增值收入，追求较低的风险，对投资回报的要求不高。您比较适合投资存款、债券、保本型理财产品、保障型保险产品、债券型基金和保本基金等，也可配置少部分混合基金。", 
                        "3" : "在任何投资中，在风险较小的情况下获得一定的收益是您主要的投资目的。您通常愿意使本金面临一定的风险，但在做投资决定时，会仔细的对将要面临的风险进行认真的分析。您对风险总是客观存在的道理有清楚的认识。总体来看，愿意承受市场的平均风险，您比较适合投资国债、保本型、浮动型理财产品、保障型保险产品、债券型基金、混合型基金、FOF型基金，也可配置少部分股票型基金。", 
                        "4" : "在任何投资中，您希望有较高的投资收益，但又不愿承受较大的风险；可以承受一定的投资波动，但是希望自己的投资风险小于市场的整体风险。您有较高的收益目标，且对风险有清醒的认识，您比较适合投资与利率、汇率、商品等挂钩的浮动型结构性理财产品、保障型保险产品、投连险、混合型基金、FOF 基金、封闭式基金、QDII 产品、股票型基金、指数型基金、金交所贵金属现货实盘合约等。", 
                        "5" : "在任何投资中，您通常专注于投资的长期增值，并愿意为此承受较大的风险。短期的投资波动并不会对您造成大的影响，追求超高的回报才是您关注的目标。您比较适合投资浮动收益型理财产品、保障型保险产品、投连险、QDII产品、股票型基金、指数型基金、股票、权证、衍生工具等另类投资产品。" 
                }, 
                risk_hasInvestExperience_type_ : { 
                        "0" : "具备", 
                        "1" : "不具备" 
                }, 
                revenue_ : { 
                        "0" : "5万元以下", 
                        "1" : "4万元以下", 
                        "2" : "3万元以下", 
                        "3" : "2万元以下" 
                }, 
                education_ : { 
                        "0" : "小学", 
                        "1" : "高中/中专", 
                        "2" : "大学",                         
                        "3" : "研究生", 
                        "4" : "研究生以上"         
                }, 
                occupation_ : { 
                        "0" : "政府部门", 
                        "1" : "金融", 
                        "2" : "房地产",                         
                        "3" : "商贸", 
                        "4" : "计算机服务/软件业", 
                        "5" : "制造业", 
                        "6" : "教科文",                         
                        "7" : "传媒/艺术/文体", 
                        "8" : "服务业", 
                        "9" : "自由职业" 
                }, 
                safetyComTltle_ : { 
                        "Smc" : "手机交易码", 
                        "Otp" : "动态口令" 
                }, 
                finanialhistoryfailstate_:{//理财交易状况交易失败情况下对应状态 
                        "1":"成功", 
                        "2":"失败", 
                        "3":"已撤销", 
                        "4":"已冲正", 
                        "5":"已赎回", 
                        "6":"已失效", 
                        "7":"已暂停", 
                        "8":"已到期（已结束）", 
                        "9":"已终止", 
                        "10":"赎回失败", 
                        "11":"购买失败", 
                        "12":"强制赎回失败", 
                        "13":"认购失败", 
                        "14":"部分撤销" 
                }, 
                finanialhistorystate_: {   //理财交易状况交易状态 
                        "0": "委托待处理", 
                         "1": "成功", 
                         "2": "失败", 
                         "3": "已撤销", 
                         "4": "已冲正", 
                         "5": "已赎回" 
                }, 
                finanialhistorytrfType_: {  //理财交易状况交易类型 
                        "00": "认购", 
                        "01": "申购", 
                        "02": "赎回", 
                        "03": "红利再投", 
                        "04": "红利发放", 
                        "05": "（经过）利息返还", 
                        "06": "本金返还", 
                        "07": "起息前赎回", 
                        "08": "利息折份额" 

                }, 
                xpadRiskLevel_:{ 
                        "0":"低风险产品", 
                        "1":"中低风险产品", 
                        "2":"中等风险产品", 
                        "3":"中高风险产品", 
                        "4":"高风险产品" 
                }, 
                redeemtranflag_:{ //赎回状态 
                        "0":"正常", 
                        "1":"挂单" 
                }, 
                finanialProductType:{ //理财产品类型 
                        "1":"现金管理类产品", 
                        "2":"净值开放类产品", 
                        "3":"固定期限产品" 
                }, 
                shareType_:{ 
                        "default": "0", 
                        "scratch": "0", 
                        "scratch_prize": "1", 
                        "xpadProductList": "0" 
                }, 
        copOuterOrg: { //外部接入系统定义 
            "TaiYangTang": "1"  //江海公司 
        }, 
        identityType: {//证件类型 
                "01":"居民身份证", 
                "02":"临时身份证", 
                "03":"护照", 
                "04":"户口簿", 
                "05":"军人身份证", 
                "06":"武装警察身份证", 
                "08":"外交人员身份证", 
                "09":"外国人居留许可证", 
                "10":"边民出入境通行证", 
                "11":"其它", 
                "47":"港澳居民来往内地通行证（香港）", 
                "48":"港澳居民来往内地通行证（澳门）", 
                "49":"台湾居民来往大陆通行证" 
        }, 
        exchangeTransType: {//P603结售汇交易类型 
                "01":"结汇", 
                "11":"购汇" 
        }, 
        exchangeFurInfo:{//P603结售汇资金属性 
                "3222":"因私旅游", 
                "3221":"自费出境学习", 
                "3223":"公务及商务出国", 
                "3225":"旅游项下其他", 
                "331":"职工报酬和赡家款", 
                "323":"金融和保险服务", 
                "324":"专有权利使用费和特许费", 
                "325":"咨询服务", 
                "326":"其他服务", 
                "310":"货物贸易", 
                "321":"运输", 
                "332":"投资收益", 
                "333":"其他经常转移", 
                "410":"资本账户", 
                "421":"投资资本金", 
                "42A":"其他直接投资", 
                "431":"对境外证券投资", 
                "44A":"其他投资", 
                "450":"国内外汇贷款", 
                "470":"经批准的资本其他", 
                "131":"职工报酬和赡家款", 
                "122":"旅游", 
                "123":"金融和保险服务", 
                "124":"专有权利使用费和特许费", 
                "125":"咨询服务", 
                "126":"其他服务", 
                "132":"投资收益", 
                "133":"其他经常转移", 
                "110":"货物贸易", 
                "121":"运输", 
                "210":"资本账户", 
                "222":"直接投资撤资", 
                "22A":"其他直接投资", 
                "231":"对境外证券投资撤回", 
                "232":"证券筹资", 
                "24A":"其他投资", 
                "250":"国内外汇贷款", 
                "270":"经批准的资本其他", 
                "221":"投资资本金", 
                "223":"房地产" 
        }, 
        exchangeChannel: {//P603结售汇交易渠道 
                "00":"柜台", 
                "01":"网上银行", 
                "02":"银企对接/网上商城", 
                "03":"短信", 
                "04":"电话银行（自助）", 
                "05":"电话银行（人工）", 
                "06":"传真", 
                "07":"自助终端", 
                "08":"其他", 
                "09":"ATM", 
                "10":"手机银行", 
                "11":"家居银行", 
                "12":"POS机", 
                "13":"柜台", 
                "14":"银行客户端", 
                "15":"柜台", 
                "16":"中银开放平台", 
                "17":"即时通讯（微信）", 
                "18":"网上银行", 
                "99":"其他" 
        }, 
        exchangeStatus: {//P603结售汇交易状态 
                "00":"成功", 
                "01":"失败", 
                "02":"未明" 
        }, 
        exchangeHandleStatus: {//P603结售汇交易状态 
                "9":"未处理", 
                "0":"手工处理成功", 
                "1":"原交易已删除" 
        }, 
        exchangeCurrency: {//P603结售汇币种翻译 
                "USD":"美元", 
                "AUD":"澳大利亚元", 
                "CAD":"加拿大元", 
                "CHF":"瑞士法郎", 
                "EUR":"欧元", 
                "GBP":"英镑", 
                "HKD":"港币", 
                "JPY":"日元", 
                "SGD":"新加坡元", 
                "DKK":"丹麦克朗", 
                "SEK":"瑞典克朗", 
                "NOK":"挪威克朗", 
                "NZD":"新西兰元", 
                "MOP":"澳门元", 
                "KRW":"韩元", 
                "RUB":"卢布", 
                "ZAR":"南非兰特", 
                "THB":"泰国铢", 
                "IDR":"印尼卢比", 
                "PHP":"菲律宾比索", 
                "BRL":"巴西里亚尔", 
                "TWD":"新台币", 
                //"MYR":"林吉特", //601以后屏蔽该币种的牌价显示 
                "INR":"印度卢比", 
                "AED":"阿联酋迪拉姆" 
        }, 
        weekDay: { 
            "1":"星期一", 
            "2":"星期二", 
            "3":"星期三", 
            "4":"星期四", 
            "5":"星期五", 
            "6":"星期六", 
            "7":"星期日" 
        }, 
                historyActyUrl:"../actives/index.html?entrance=historyActy" 
        }; 
        

// function getConstant(item){
// 	return Constant.item;
// }

module.exports = {
  Constant: Constant
}