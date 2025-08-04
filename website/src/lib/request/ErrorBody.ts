class ErrorBody extends Error {
  message: string;
  status: number;

  constructor(status: number, message: string, name: string) {
    super();
    this.message = message;
    this.status = status;
    this.name = name;
  }
}

export default ErrorBody;
