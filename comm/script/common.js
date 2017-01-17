module.exports = {
    postRequest:function(methodParam){
//  	var Sys = SysParam;
        var url = 'https://mbas.mbs.boc.cn/BMPS/_bfwajax.do?_locale=zh_CN';
        var header = {"agent":"WEIXIN","version":"1.0","device":"wxd","platform":"wxp", "plugins":"","page":"01","local":"zh_CN","uuid":"wertyuiuytr","ext":"","cipherType":"0"};
	    var method = methodParam;
        var params = {};
        var postJson = {header,method,params};
        console.log(JSON.stringify(postJson));
        url += "&json=" + JSON.stringify(postJson);

        return url;
    }
}