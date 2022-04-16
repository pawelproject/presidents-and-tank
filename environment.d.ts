declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ACCESS_TOKEN_SECRET: string;
      MONGO_URI: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
    }
  }
}

export {};
