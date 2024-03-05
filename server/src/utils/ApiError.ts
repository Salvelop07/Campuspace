interface ApiError {
    statusCode: number;
    message: string;
    data: null;
    success: boolean;
    errors: string[],
    stack?: string
}


class ApiError extends Error {
    constructor(statusCode: number, message = "Something went wrong!", errors: string[] = [], stack = "") {
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.success = false
        this.data = null
        this.errors = errors
        if (stack) {
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }