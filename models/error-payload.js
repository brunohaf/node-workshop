module.exports = class ErrorPayload {
  constructor(status,message = null) {
    this.status = status;
    this.message = message  
  }
}