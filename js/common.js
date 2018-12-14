function setCookie(name,value,options){
    var cookieStr = name + "=" + value;
        if(typeof options != "object"){
           return  document.cookie = cookieStr;
        }
        if(typeof options.path === "string"){
            cookieStr += ";path=" + options.path;
        }
        if(typeof options.expires === "number" || typeof options.expires === "string"){
            var d = new Date();
            d.setDate(d.getDate() + options.expires);
            cookieStr += ";expires=" + d;
        } 
        document.cookie = cookieStr;
}

function removeCookie(name,path){
    setCookie(name,"",{
        path:path ? path : "",
        expires : -1
    })
}

function getCookie(name){
    var cookieArray = document.cookie.split("; ");  
    for(var i = 0 ; i < cookieArray.length ; i ++){
        var cookieItem = cookieArray[i];
        var cookieName = cookieItem.split("=")[0];
        var cookieValue = cookieItem.split("=")[1];
        if(cookieName == name){
            return cookieValue;
        }
    }
    return "";
}
