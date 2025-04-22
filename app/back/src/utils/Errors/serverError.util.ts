class ServerError extends Error {
    public status: number;    

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.name = "ServerError";

        Error.captureStackTrace(this, this.constructor);

        
    }
}

export default ServerError;