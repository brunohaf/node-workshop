const ErrorPayload = require('../models/error-payload');

module.exports = class BaseResponse {
 populate(promise,message = null){
   if(promise instanceof(ErrorPayload)){
    return new BaseResponse(null,promise.status,"Status (" +
     promise.status + ") does not indicate success: "+promise.message);
   }
   const status = promise? 200 : 500;
  if (status != 200) {
    return new BaseResponse(null,"Failure", message);
  }
  const content = promise;
  return new BaseResponse(content);
}

  constructor(content = null, status = "Success!",message = null) {
    this.status = status;
    this.content = content,
    this.message = message  
  }
}