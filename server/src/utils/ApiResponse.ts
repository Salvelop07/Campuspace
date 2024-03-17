interface ApiResponse {
  statusCode: number;
  data: object;
  message: String;
  success: Boolean;
}

class ApiResponse {
  constructor(statusCode: number, data: object, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = this.statusCode < 400;
  }
}

export { ApiResponse };
