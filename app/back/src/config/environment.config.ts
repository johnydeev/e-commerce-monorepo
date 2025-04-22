import dotenv from "dotenv";

interface EnvVars {
    PORT: string;
    MONGO_DB_URL: string;
    EMAIL: string;
    EMAIL_KEY: string;
    SECRET_KEY_JWT: string;
    URL_FRONTEND?: string;
    URL_BACKEND?: string;
}

dotenv.config();

const ENVIRONMENT: EnvVars = {
    PORT: process.env.PORT!,
    MONGO_DB_URL: process.env.MONGO_DB_URL!,
    EMAIL: process.env.EMAIL!,
    EMAIL_KEY: process.env.EMAIL_KEY!,
    SECRET_KEY_JWT: process.env.SECRET_KEY_JWT!,
    URL_FRONTEND: process.env.URL_FRONTEND!,
    URL_BACKEND: process.env.URL_BACKEND!,
};

for (let key in ENVIRONMENT) {
    if (!ENVIRONMENT[key as keyof EnvVars]) {
        console.error(`OJO que la variable ${key} está indefinida`);
    }
}

export default ENVIRONMENT;
