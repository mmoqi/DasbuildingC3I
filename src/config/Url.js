const apiUrl="http://localhost:24016";
module.exports ={
  ApiUrl: apiUrl,
  SMsUrl: apiUrl+"/api/Sms",
  SmsSendDateUrl: apiUrl+"/api/Sms/sended",
  SmsNotSendDateUrl: apiUrl+"/api/Sms/notsend",
  LoginUrl:apiUrl+"/api/Account/login",
  getEmpCardInfoUrl:apiUrl+"/Card/getEmpCardInfo",
  AllotCardUrl:apiUrl+"/Card/AllotCard",
  CancellAllotCardUrl:apiUrl+"/Card/CancellAllotCard",
  GenerateCardUrl:apiUrl+"/Card/GenerateCard",
  GetAllCardInfoUrl:apiUrl+"/Card/GetAllCardInfo",
  UploadHrmsUrl:apiUrl+"/Hrms/UploadHrms",
}
