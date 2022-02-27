
//create a dictionary to centralize all of the app's data sources used
export const UrlMap = new Map();
export const HeaderMap = new Map();

//various URLs used across site
UrlMap.set("OpenOrders", "https://api.sosinventory.com/api/v2/workorder?status=open");
UrlMap.set("WorkOrderView", "https://live.sosinventory.com/WorkOrder/IndexView/");

//Different settings used across site
// const varToken = "";//TODO:USE ENV TO STORE THIS SECURELY
const varToken = "Bearer pUEoHx9b21zwnzrdF_U9I5peV-417vvdbf9bA-5PiMt0pwILsV3-kPSrAPTuZJBXJxozroaaLNEtpK_fhhe59Ch_qlD2oQmFwcOGDlqpcmnlvsmWcHhjDR1Wdl2Ut8NAUh23kKo6FHKSnzJ9TRedcNMc1GX93ppH3saYiozh85p-ZtWU-U2wmBtLgDDR98tDZg1eWvm1tiHUp41vA3IjjhtViygK_z6vfPcY4zyLGLT59ofRz34lpKth-t7V4jaoAHDDM8SYcKwc0hTByJs6zwssAHybFFNxMZfPL3ZjgghFKXYq";
var myHeaders = new Headers();
myHeaders.append("Authorization", varToken);
let sosRequestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

HeaderMap.set("SosApi", sosRequestOptions);