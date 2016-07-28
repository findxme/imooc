var EventUtil={
    addHandler: function (element,type,handler) {
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }else {
            element["on"+type]=handler;
        }
    },

    
    getEvent: function (event) {
        return event?event:window.event;
    },
    
    getTarget: function (event){
        return event.target||event.srcElement;
    },
    
    preventDefault: function (event) {
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue=false;
        }
    },

    removeHandler:  function (element,type,handler) {
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent("on"+type,handler);
        }else {
            element["on"+type]=null;
        }
    },
    
    stopPropagation: function (event) {
        if(event.stopPropagation){
            event.stopPropagation;
        }else{
            event.cancelBubble=true;
        }
    }
};

function addLoadEvent(func) {
    var oldonload=window.onload;
    if (typeof window.onload !='function') {
        window.onload=func;
    }else{
        window.onload=function () {
            oldonload();
            func();
        }
    }
}
function getXmlHttpObject() {
    var XMLHttp=null
    if (window.XMLHttpRequest){
        XMLHttp=new XMLHttpRequest()
    }else if (window.ActiveXObject){
        XMLHttp=new ActiveXObject("Microsoft.XMLHTTP")
    }
    return XMLHttp;
}


function serialize(form){
    var parts=[],field=null,i,len,j,optLen,option,optValue;
    for(i=0,len=form.elements.length;i<len;i++){
        field=form.elements[i];
        switch (field.type) {
            case "select-one":
            case "select-multiple":
            if(field.name.length){
                for(j=0,optLen=field.options.length;j<optLen;j++){
                    option=field.options[j];
                    if(option.selected){
                        optValue="";
                        if(option.hasAttribute){
                            optValue=(option.hasAttribute("value") ? option.value:option.text);
                        }else{
                            optValue=(option.attributes("value").specified ? option.value:option.text);
                        }
                        parts.push(encodeURIComponent(field.name)+"="+encodeURIComponent(optValue));
                    }
                }
            }    
                break;
            case undefined:
            case "file":
            case "submit":
            case "reset":
            case "button":
                break;
            case "radio":
            case "checkbox":
                if(!field.checked){
                    break;
                }
            default:
                if(field.name.length){
                    parts.push(encodeURIComponent(field.name)+"="+encodeURIComponent(field.value));
                }
        }
    }
    return parts.join("&");
}